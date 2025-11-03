import { useEffect, useMemo } from "react";
import * as api from "app/api";
import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";
import type { CourseSection, CoursesPageSetCourseSections, GridRowSelectionModel, GridSortModel } from "app/types";

export default function useCourseSections() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const { termCode, collegeCode, departmentCode, syllabusStatus, cvStatus } = useAppSelector(
    (state) => state.coursesPage.filters
  );
  const { status, rowCount, rows, filterModel, paginationModel, rowSelectionModel, sortModel } = useAppSelector(
    (state) => state.coursesPage.courseSections
  );

  const selectionModel = useMemo(
    (): GridRowSelectionModel => ({
      type: "include",
      ids: new Set(rowSelectionModel),
    }),
    [rowSelectionModel]
  );

  useEffect(() => {
    if (termCode.defaultValue !== "" && collegeCode.defaultValue !== "" && departmentCode.defaultValue !== "") {
      (async () => {
        dispatch(
          coursesPageStore.setCourseSections({
            status: "loading",
          })
        );

        const payload: CoursesPageSetCourseSections["payload"] = {
          status: "complete",
          rowCount: 0,
          rows: [],
        };

        const response = await api.getCourseSections({
          auth,
          termCode: termCode.defaultValue,
          collegeCode: collegeCode.defaultValue,
          departmentCode: departmentCode.defaultValue,
          ...(() => {
            const f: { [key: string]: string } = {};
            filterModel.items.forEach((v) => {
              if (typeof v.value === "string") {
                f[v.field] = v.value;
              }
            });
            return f;
          })(),
          syllabusStatus: syllabusStatus.defaultValue !== "" ? syllabusStatus.defaultValue : undefined,
          cvStatus: cvStatus.defaultValue !== "" ? cvStatus.defaultValue : undefined,
          offset: paginationModel.page * paginationModel.pageSize,
          limit: paginationModel.pageSize,
          orderBy: buildOrderByString(sortModel) ?? undefined,
        });

        if (response.error) {
          if (response.error.code === 401 || response.error.code === 403) {
            payload.status = "notLoggedIn";
          } else {
            payload.status = "error";
          }
        } else if (response.result) {
          payload.rowCount = response.result.count;
          payload.rows = response.result.data;
        }

        dispatch(coursesPageStore.setCourseSections(payload));
      })();
    } else {
      dispatch(
        coursesPageStore.setCourseSections({
          status: "complete",
          rowCount: 0,
          rows: [],
        })
      );
    }
  }, [
    auth,
    termCode,
    collegeCode,
    departmentCode,
    syllabusStatus,
    cvStatus,
    filterModel,
    paginationModel,
    sortModel,
    dispatch,
  ]);

  return {
    status,
    rowCount,
    rows: rows.map(
      (value): CourseSection => ({
        ...value,
        syllabusUploadedOn: value.syllabusUploadedOn ? new Date(value.syllabusUploadedOn.toString()) : null,
        cvUploadedOn: value.cvUploadedOn ? new Date(value.cvUploadedOn.toString()) : null,
      })
    ),
    filterModel,
    paginationModel,
    rowSelectionModel: selectionModel,
    sortModel,
    dispatch,
  };
}

function buildOrderByString(sort: GridSortModel): string | null {
  return sort.length > 0
    ? sort
        .map((value) => {
          switch (value.field) {
            case "course":
              return [`subjectCode ${value.sort}`, `courseNumber ${value.sort}`, `courseSequence ${value.sort}`].join(
                ","
              );
            case "instructorName":
              return [
                `instructorLastName ${value.sort}`,
                `instructorFirstName ${value.sort}`,
                `instructorEmail ${value.sort}`,
              ].join(",");
            default:
              return `${value.field} ${value.sort}`;
          }
        })
        .join(",")
    : null;
}
