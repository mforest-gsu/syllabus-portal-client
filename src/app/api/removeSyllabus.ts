import { callApi } from "app/api";
import type { RemoveSyllabusParams, RemoveSyllabusResult } from "app/types";

export async function removeSyllabus(params: RemoveSyllabusParams): Promise<RemoveSyllabusResult> {
  return callApi("DELETE", params, url, result);
}

function url(apiUrl: string, { id }: RemoveSyllabusParams): string {
  return `${apiUrl}/syllabus/${id}`;
}

async function result(response: Response): Promise<RemoveSyllabusResult> {
  return await response.json();
}
