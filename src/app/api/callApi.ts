import type { ApiParams, ApiResult, ApiError } from "app/types";

export async function callApi<P extends ApiParams, R>(
  method: "DELETE" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT",
  params: P,
  url: (apiUrl: string, params: P) => string,
  result: (response: Response) => Promise<ApiResult<R>>,
  body?: (params: P) => BodyInit | null
): Promise<ApiResult<R>> {
  try {
    const request = buildRequest(method, params, url, body);

    const response = await fetch(request);
    if (!response.ok) {
      throw response.status;
    }

    const responseResult = await result(response);
    if (responseResult.error !== undefined) {
      throw responseResult.error;
    }

    return { result: responseResult.result };
  } catch (e) {
    return {
      error: buildError(e),
    };
  }
}

function buildRequest<P extends ApiParams>(
  method: "DELETE" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT",
  params: P,
  url: (apiUrl: string, params: P) => string,
  body?: (params: P) => BodyInit | null
): Request {
  const {
    apiUrl,
    authToken: { accessToken },
  } = params.auth;

  return new Request(url(apiUrl, params), {
    method,
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
    body: body ? body(params) : undefined,
  });
}

function buildError(e: unknown): ApiError {
  const error: ApiError = {
    code: 0,
    message: "error",
    thrown: undefined,
  };

  switch (true) {
    case isError(e):
      return e;
    case e instanceof Error:
      error.thrown = e;
      break;
    case typeof e === "string" || e instanceof String:
      error.thrown = new Error(e.toString());
      break;
    case typeof e === "number":
      error.code = e;
      error.message = error.code === 401 || error.code === 403 ? "notLoggedIn" : "error";
      break;
  }

  return error;
}

function isError(e: unknown): e is ApiError {
  return (
    e !== null &&
    typeof e === "object" &&
    (e as ApiError).code !== undefined &&
    (e as ApiError).message !== undefined &&
    ((e as ApiError).thrown === undefined || (e as ApiError).thrown instanceof Error)
  );
}
