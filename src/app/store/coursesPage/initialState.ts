import type { CoursesPageState } from "app/types";

const coursesPageState: CoursesPageState = {
  filters: {
    termCode: {
      items: [],
      defaultValue: "",
    },
    collegeCode: {
      items: [],
      defaultValue: "",
    },
    departmentCode: {
      items: [],
      defaultValue: "",
    },
    syllabusIsRequired: {
      items: [
        {
          value: "true",
          label: "Yes",
        },
        {
          value: "false",
          label: "No",
        },
      ],
      defaultValue: "",
    },
    syllabusStatus: {
      items: [
        {
          value: "Pending",
          label: "Pending",
        },
        {
          value: "Complete",
          label: "Complete",
        },
      ],
      defaultValue: "",
    },
    cvStatus: {
      items: [
        {
          value: "Pending",
          label: "Pending",
        },
        {
          value: "Complete",
          label: "Complete",
        },
      ],
      defaultValue: "",
    },
  },
  modals: {
    uploadSyllabusModal: {
      open: false,
    },
    uploadCvModal: {
      open: false,
    },
  },
  courseSections: {
    status: "complete",
    rowCount: 0,
    rows: [],
    filterModel: { items: [] },
    paginationModel: {
      pageSize: 10,
      page: 0,
    },
    rowSelectionModel: [],
    sortModel: [],
  },
};

export default function initialState(): CoursesPageState {
  return coursesPageState;
}
