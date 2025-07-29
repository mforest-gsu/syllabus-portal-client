import { getGridStringOperators, getGridDateOperators } from "@mui/x-data-grid-premium";
import type { CourseSection, GridColDef, GridColumnVisibilityModel } from "app/types";

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
  instructorEmail: false,
  syllabusUploadedOnStart: false,
  syllabusUploadedOnEnd: false,
};

export const columns: GridColDef<CourseSection>[] = [
  {
    field: "course",
    headerName: "Course",
    aggregable: false,
    filterable: false,
    groupable: false,
    width: 150,
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
    field: "courseTitle",
    headerName: "Title",
    aggregable: false,
    groupable: false,
    filterOperators: stringContainsOperator,
    flex: 0.5,
  },
  {
    field: "instructor",
    headerName: "Instructor",
    flex: 0.5,
    aggregable: false,
    filterable: false,
    groupable: false,
    valueFormatter: (value, row) => {
      let label: string = "";
      if (row.instructorFirstName && row.instructorLastName) {
        label = `${row.instructorFirstName} ${row.instructorLastName}`;
        if (row.instructorEmail) {
          label += ` <${row.instructorEmail}>`;
        }
      }
      return typeof value === "string" ? value : label;
    },
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
    field: "instructorEmail",
    headerName: "Instructor Email",
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
    field: "syllabusUploadedOn",
    type: "date",
    headerName: "Uploaded On",
    aggregable: false,
    filterable: false,
    groupable: false,
    width: 140,
  },
  {
    field: "syllabusUploadedBy",
    headerName: "Updated By",
    aggregable: false,
    groupable: false,
    filterOperators: stringStartsWithOperator,
    width: 200,
  },
];
