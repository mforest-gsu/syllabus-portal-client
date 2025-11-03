import { getGridStringOperators, getGridDateOperators } from "@mui/x-data-grid-premium";
import type { CourseSection, GridColDef, GridColumnGroupingModel, GridColumnVisibilityModel } from "app/types";

const stringEqualsOperator = getGridStringOperators().filter((o) => o.value === "equals");
const stringContainsOperator = getGridStringOperators().filter((o) => o.value === "contains");
const stringStartsWithOperator = getGridStringOperators().filter((o) => o.value === "startsWith");

export const columnVisibilityModel: GridColumnVisibilityModel = {
  id: false,
  termCode: false,
  collegeCode: false,
  departmentCode: false,
  subjectCode: false,
  courseNumber: false,
  courseSequence: false,
  instructorId: false,
  instructorFirstName: false,
  instructorLastName: false,
  syllabusUploadedBy: false,
  syllabusUploadedOnStart: false,
  syllabusUploadedOnEnd: false,
  cvUploadedBy: false,
  cvUploadedOnStart: false,
  cvUploadedOnEnd: false,
};

export const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "courseFields",
    headerName: "Course",
    headerAlign: "center",
    children: [{ field: "course" }, { field: "crn" }, { field: "courseTitle" }],
  },
  {
    groupId: "instructorFields",
    headerName: "Instructor",
    headerAlign: "center",
    children: [{ field: "instructorName" }, { field: "instructorEmail" }],
  },
  {
    groupId: "cvFields",
    headerName: "CV",
    headerAlign: "center",
    children: [{ field: "cvStatus" }, { field: "cvUploadedOn" }, { field: "cvUploadedBy" }],
  },
  {
    groupId: "syllabusFields",
    headerName: "Syllabus",
    headerAlign: "center",
    children: [{ field: "syllabusStatus" }, { field: "syllabusUploadedOn" }, { field: "syllabusUploadedBy" }],
  },
];

export const columns: GridColDef<CourseSection>[] = [
  {
    field: "course",
    headerName: "Course",
    aggregable: false,
    filterable: false,
    groupable: false,
    width: 115,
    valueFormatter: (value, row) => {
      return typeof value === "string" ? value : `${row.subjectCode} ${row.courseNumber} ${row.courseSequence}`;
    },
  },
  {
    field: "crn",
    headerName: "CRN",
    aggregable: false,
    groupable: false,
    width: 80,
    filterOperators: stringEqualsOperator,
  },
  {
    field: "courseTitle",
    headerName: "Title",
    minWidth: 200,
    flex: 1,
    aggregable: false,
    groupable: false,
    filterOperators: stringContainsOperator,
  },
  {
    field: "subjectCode",
    headerName: "Subject Code",
    aggregable: false,
    groupable: false,
    filterOperators: stringStartsWithOperator,
  },
  {
    field: "courseNumber",
    headerName: "Course Number",
    aggregable: false,
    groupable: false,
    filterOperators: stringStartsWithOperator,
  },
  {
    field: "courseSequence",
    headerName: "Course Sequence",
    aggregable: false,
    groupable: false,
    filterOperators: stringStartsWithOperator,
  },
  {
    field: "instructorName",
    headerName: "Name",
    minWidth: 125,
    flex: 0.5,
    aggregable: false,
    filterable: false,
    groupable: false,
    valueFormatter: (value, row) => {
      let label: string = "";
      if (row.instructorFirstName && row.instructorLastName) {
        label = `${row.instructorFirstName} ${row.instructorLastName}`;
      }
      return typeof value === "string" ? value : label;
    },
  },
  {
    field: "instructorEmail",
    headerName: "Email",
    minWidth: 150,
    flex: 1,
    aggregable: false,
    groupable: false,
    filterOperators: stringContainsOperator,
  },
  {
    field: "instructorFirstName",
    headerName: "Instructor First Name",
    aggregable: false,
    groupable: false,
    filterOperators: stringContainsOperator,
  },
  {
    field: "instructorLastName",
    headerName: "Instructor Last Name",
    aggregable: false,
    groupable: false,
    filterOperators: stringContainsOperator,
  },
  {
    field: "syllabusStatus",
    headerName: "Status",
    width: 90,
    aggregable: false,
    filterable: false,
    groupable: false,
  },
  {
    field: "syllabusUploadedOn",
    type: "date",
    headerName: "Uploaded On",
    aggregable: false,
    filterable: false,
    groupable: false,
    width: 131,
  },
  {
    field: "syllabusUploadedBy",
    headerName: "Updated By",
    aggregable: false,
    groupable: false,
    filterOperators: stringStartsWithOperator,
    width: 200,
  },
  {
    field: "syllabusUploadedOnStart",
    type: "date",
    headerName: "Uploaded On Start",
    filterOperators: getGridDateOperators().filter((o) => o.value === "onOrAfter"),
  },
  {
    field: "syllabusUploadedOnEnd",
    type: "date",
    headerName: "Uploaded On End",
    filterOperators: getGridDateOperators().filter((o) => o.value === "onOrBefore"),
  },
  {
    field: "cvStatus",
    headerName: "Status",
    width: 90,
    aggregable: false,
    filterable: false,
    groupable: false,
  },
  {
    field: "cvUploadedOn",
    type: "date",
    headerName: "Uploaded On",
    aggregable: false,
    filterable: false,
    groupable: false,
    width: 131,
  },
  {
    field: "cvUploadedBy",
    headerName: "Updated By",
    aggregable: false,
    groupable: false,
    filterOperators: stringStartsWithOperator,
    width: 200,
  },
  {
    field: "cvUploadedOnStart",
    type: "date",
    headerName: "CV Uploaded On Start",
    filterOperators: getGridDateOperators().filter((o) => o.value === "onOrAfter"),
  },
  {
    field: "cvUploadedOnEnd",
    type: "date",
    headerName: "CV Uploaded On End",
    filterOperators: getGridDateOperators().filter((o) => o.value === "onOrBefore"),
  },
];
