import { callApi } from "app/api";
import type { GetFiltersParams, GetFiltersResult } from "app/types";

export async function getFilters(params: GetFiltersParams): Promise<GetFiltersResult> {
  return callApi("GET", params, url, result);
}

export function getFiltersPath({ termCode, collegeCode }: GetFiltersParams): string {
  let path: string = "filters";
  switch (true) {
    case termCode !== undefined && collegeCode !== undefined:
      path += `/${termCode}/${collegeCode}`;
      break;
    case termCode !== undefined:
      path += `/${termCode}`;
      break;
  }
  return path;
}

function url(apiUrl: string, params: GetFiltersParams): string {
  const path = getFiltersPath(params);
  return `${apiUrl}/${path}`;
}

async function result(response: Response): Promise<GetFiltersResult> {
  return await response.json();
}
