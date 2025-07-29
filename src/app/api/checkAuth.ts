import { callApi } from "app/api";
import type { ApiParams } from "app/types";

export async function checkAuth(params: ApiParams) {
  const response = await callApi("GET", params, url, result);

  return response.result === true;
}

function url(apiUrl: string) {
  return `${apiUrl}/auth/check`;
}

async function result(response: Response) {
  const responseBody = await response.json();
  return {
    result: responseBody === true,
  };
}
