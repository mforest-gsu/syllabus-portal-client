import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";
import { useGetFilters } from "app/api";

export default function useFilterSelect(name: "termCode" | "collegeCode" | "departmentCode") {
  const auth = useAppSelector((state) => state.auth);
  const termCode = useAppSelector((state) => state.coursesPage.filters.termCode.defaultValue);
  const collegeCode = useAppSelector((state) => state.coursesPage.filters.collegeCode.defaultValue);
  const departmentCode = useAppSelector((state) => state.coursesPage.filters.departmentCode.defaultValue);

  let defaultValue: string;
  let returnEmpty: boolean;
  switch (name) {
    case "termCode":
      defaultValue = termCode;
      returnEmpty = false;
      break;
    case "collegeCode":
      defaultValue = collegeCode;
      returnEmpty = termCode === "";
      break;
    case "departmentCode":
      defaultValue = departmentCode;
      returnEmpty = termCode === "" || collegeCode === "";
      break;
  }

  const { items, error } = useGetFilters(
    {
      auth,
      termCode: name !== "termCode" ? termCode : undefined,
      collegeCode: name === "departmentCode" ? collegeCode : undefined,
    },
    returnEmpty
  );

  const dispatch = useAppDispatch();
  const setDefaultValue = (value: string) => {
    dispatch(
      coursesPageStore.setFilter({
        name,
        value: {
          defaultValue: value,
        },
      })
    );
  };

  if (error !== null) {
    return {
      setDefaultValue,
      error,
      defaultValue,
      items: null,
    };
  } else {
    if (items.length === 0) {
      defaultValue = "";
    }
    return {
      setDefaultValue,
      error: null,
      defaultValue,
      items,
    };
  }
}
