import { callApi } from "app/api";
import type { UploadSyllabusParams, UploadSyllabusResult } from "app/types";

export async function uploadSyllabus(params: UploadSyllabusParams): Promise<UploadSyllabusResult> {
  return callApi("POST", params, url, result, body);
}

function url(apiUrl: string, { id }: UploadSyllabusParams): string {
  return `${apiUrl}/syllabus/${id}`;
}

async function result(response: Response): Promise<UploadSyllabusResult> {
  return await response.json();
}

function body(params: UploadSyllabusParams): BodyInit | null {
  const formData = new FormData();
  formData.set("MAX_FILE_SIZE", "5000000");
  formData.set("syllabus", params.syllabus);
  return formData;
}
