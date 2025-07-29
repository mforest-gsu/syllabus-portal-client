import type { CoursesPageSetCourseSections, CoursesPageState } from "app/types";

export default function setCourseSections(state: CoursesPageState, action: CoursesPageSetCourseSections) {
  const { status, rowCount, rows, filterModel, paginationModel, rowSelectionModel, sortModel } = action.payload;
  if (status !== undefined) {
    state.courseSections.status = status;
  }
  if (rowCount !== undefined) {
    state.courseSections.rowCount = rowCount;
  }
  if (rows !== undefined) {
    state.courseSections.rows = rows;
  }
  if (filterModel !== undefined) {
    state.courseSections.filterModel = filterModel;
  }
  if (paginationModel !== undefined) {
    state.courseSections.paginationModel = paginationModel;
  }
  if (rowSelectionModel !== undefined) {
    state.courseSections.rowSelectionModel = rowSelectionModel;
  }
  if (sortModel !== undefined) {
    state.courseSections.sortModel = sortModel;
  }
}
