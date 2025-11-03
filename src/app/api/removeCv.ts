import { callApi } from "app/api";
import type { RemoveCvParams, RemoveCvResult } from "app/types";

export async function removeCv(params: RemoveCvParams): Promise<RemoveCvResult> {
  return callApi("DELETE", params, url, result);
}

function url(apiUrl: string, { id }: RemoveCvParams): string {
  return `${apiUrl}/cv/${id}`;
}

async function result(response: Response): Promise<RemoveCvResult> {
  return await response.json();
}
