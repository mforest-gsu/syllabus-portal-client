import type { CoursesPageSetFilterPayload, CoursesPageState } from "app/types";

export default function setFilter(state: CoursesPageState, action: CoursesPageSetFilterPayload) {
  const { name, value } = action.payload;
  switch (name) {
    case "termCode":
      if (value.defaultValue !== undefined) {
        state.filters.termCode.defaultValue = value.defaultValue;
      }
      if (value.items !== undefined) {
        state.filters.termCode.items = value.items;
      }
      state.filters.collegeCode.defaultValue = "";
      state.filters.collegeCode.items = [];
      state.filters.departmentCode.defaultValue = "";
      state.filters.departmentCode.items = [];
      break;
    case "collegeCode":
      if (value.defaultValue !== undefined) {
        state.filters.collegeCode.defaultValue = value.defaultValue;
      }
      if (value.items !== undefined) {
        state.filters.collegeCode.items = value.items;
      }
      state.filters.departmentCode.defaultValue = "";
      state.filters.departmentCode.items = [];
      break;
    case "departmentCode":
      if (value.defaultValue !== undefined) {
        state.filters.departmentCode.defaultValue = value.defaultValue;
      }
      if (value.items !== undefined) {
        state.filters.departmentCode.items = value.items;
      }
      break;
    case "syllabusStatus":
      if (value.defaultValue !== undefined) {
        state.filters.syllabusStatus.defaultValue = value.defaultValue;
      }
      if (value.items !== undefined) {
        state.filters.syllabusStatus.items = value.items;
      }
      break;
    case "cvStatus":
      if (value.defaultValue !== undefined) {
        state.filters.cvStatus.defaultValue = value.defaultValue;
      }
      if (value.items !== undefined) {
        state.filters.cvStatus.items = value.items;
      }
      break;
  }
}
