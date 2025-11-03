import { callApi } from "app/api";
import type { UploadCvParams, UploadCvResult } from "app/types";

export async function uploadCv(params: UploadCvParams): Promise<UploadCvResult> {
  return callApi("POST", params, url, result, body);
}

function url(apiUrl: string, { id }: UploadCvParams): string {
  return `${apiUrl}/cv/${id}`;
}

async function result(response: Response): Promise<UploadCvResult> {
  return await response.json();
}

function body(params: UploadCvParams): BodyInit | null {
  const formData = new FormData();
  formData.set("MAX_FILE_SIZE", "5000000");
  formData.set("cv", params.cv);
  return formData;
}
