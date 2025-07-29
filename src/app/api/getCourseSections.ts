import { callApi } from "app/api";
import type { GetCourseSectionsParams, GetCourseSectionsResult } from "app/types";

export async function getCourseSections(params: GetCourseSectionsParams): Promise<GetCourseSectionsResult> {
  return await callApi("GET", params, url, result);
}

function url(apiUrl: string, params: GetCourseSectionsParams): string {
  const url = new URL(`${apiUrl}/courses`);
  Object.entries(params).forEach(([key, value]) => {
    if (key !== "auth" && value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url.toString();
}

async function result(response: Response): Promise<GetCourseSectionsResult> {
  return await response.json();
}
