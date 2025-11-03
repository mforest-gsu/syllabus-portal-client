import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthToken, FilterItem, GridFilterModel, GridPaginationModel, GridRowId, GridSortModel } from "app/types";

export type AuthState = {
  apiUrl: string;
  authToken: AuthToken;
};

export type AuthSetAuthTokenPayload = PayloadAction<AuthToken>;

export type SelectFormControlState = {
  items: FilterItem[];
  defaultValue: string;
};

export type ModalState = {
  open: boolean;
};

export type DataGridState = {
  status: "loading" | "complete" | "error" | "notLoggedIn";
  rowCount: number;
  rows: CourseSection[];
  filterModel: GridFilterModel;
  paginationModel: GridPaginationModel;
  rowSelectionModel: GridRowId[]; // not a GridRowSelectionModel
  sortModel: Writeable<GridSortModel>;
};

export type CoursesPageFilters =
  | "termCode"
  | "collegeCode"
  | "departmentCode"
  | "syllabusIsRequired"
  | "syllabusStatus"
  | "cvStatus";

export type CoursesPageSetFilterPayload = PayloadAction<{
  name: CoursesPageFilters;
  value: Partial<SelectFormControlState>;
}>;

export type CoursesPageModals = "uploadSyllabusModal" | "uploadCvModal";

export type CoursesPageOpenModalPayload = PayloadAction<{
  name: CoursesPageModals;
  value: Partial<ModalState>;
}>;

export type CoursesPageSetCourseSections = PayloadAction<Partial<DataGridState>>;

export type CoursesPageState = {
  filters: {
    [Property in CoursesPageFilters]: SelectFormControlState;
  };
  modals: {
    [Property in CoursesPageModals]: ModalState;
  };
  courseSections: DataGridState;
};
