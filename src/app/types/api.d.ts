import type { AuthState, CourseSection, FilterItem } from "app/types";

// Base
export interface ApiParams {
  auth: AuthState;
}
export interface ApiError {
  code: number;
  message: string;
  thrown?: Error;
}
export interface ApiResultError {
  result?: undefined;
  error: ApiError;
}
export interface ApiResultSuccess<R extends string | number | object> {
  result: R;
  error?: undefined;
}
export type ApiResult<R> = ApiResultSuccess<R> | ApiResultError;

// Filter
export interface GetFiltersParams extends ApiParams {
  termCode?: string;
  collegeCode?: string;
}
export type GetFiltersSuccessResult = FilterItem[];
export type GetFiltersResult = ApiResult<GetFiltersSuccessResult>;

// Course Section
export interface GetCourseSectionsParams extends ApiParams {
  termCode: string;
  collegeCode: string;
  departmentCode: string;
  campusCode?: string;
  subjectCode?: string;
  courseNumber?: string;
  courseSequence?: string;
  courseTitle?: string;
  crn?: string;
  instructorId?: string;
  instructorFirstName?: string;
  instructorLastName?: string;
  instructorEmail?: string;
  syllabusIsRequired?: boolean;
  syllabusStatus?: string;
  syllabusUploadedBy?: string;
  syllabusUploadedOnStart?: string;
  syllabusUploadedOnEnd?: string;
  cvStatus?: string;
  cvUploadedBy?: string;
  cvUploadedOnStart?: string;
  cvUploadedOnEnd?: string;
  offset?: number;
  limit?: number;
  orderBy?: string;
}
export type GetCourseSectionsSuccessResult = {
  count: number;
  data: CourseSection[];
};
export type GetCourseSectionsResult = ApiResult<GetCourseSectionsSuccessResult>;

// Remove Syllabus
export interface RemoveSyllabusParams extends ApiParams {
  id: string;
}
export type RemoveSyllabusResult = ApiResult<CourseSection>;

// Add Syllabus
export interface UploadSyllabusParams extends ApiParams {
  id: string;
  syllabus: File;
}
export type UploadSyllabusResult = ApiResult<CourseSection>;

export interface RemoveCvParams extends ApiParams {
  id: string;
}
export type RemoveCvResult = ApiResult<CourseSection>;

export interface UploadCvParams extends ApiParams {
  id: string;
  cv: File;
}
export type UploadCvResult = ApiResult<CourseSection>;
