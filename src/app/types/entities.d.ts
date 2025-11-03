export type AuthToken = {
  accessToken: string;
  expiresOn: number;
};

export type CourseSection = {
  id: string;
  termCode: string;
  termName: string;
  collegeCode: string;
  collegeName: string;
  departmentCode: string;
  departmentName: string;
  campusCode: string;
  campusName: string;
  subjectCode: string;
  courseNumber: string;
  courseSequence: string;
  courseTitle: string;
  crn: string;
  instructorPidm: string;
  instructorId: string;
  instructorFirstName: string | null;
  instructorLastName: string | null;
  instructorEmail: string | null;
  syllabusStatus: string;
  syllabusKey: string | null;
  syllabusUrl: string | null;
  syllabusUploadedBy: string | null;
  syllabusUploadedOn: Date | null;
  cvStatus: string;
  cvKey: string | null;
  cvUrl: string | null;
  cvUploadedBy: string | null;
  cvUploadedOn: Date | null;
};

export type FilterItem = {
  value: string;
  label: string;
};
