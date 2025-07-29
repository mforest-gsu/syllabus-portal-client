import { useQuery } from "@tanstack/react-query";
import type { FilterItem, GetFiltersParams } from "app/types";
import { getFilters, getFiltersPath } from "./getFilters";

export function useGetFilters(params: GetFiltersParams, returnEmpty?: boolean) {
  const { accessToken } = params.auth.authToken;
  const path = getFiltersPath(params);

  const {
    data: items,
    error,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: [`${path}?token=${accessToken}`],
    queryFn: async () => {
      if (returnEmpty === true) {
        return [] as FilterItem[];
      }

      const { result, error } = await getFilters(params);

      if (error?.message === "notLoggedIn") {
        throw new Error("notLoggedIn");
      } else if (error !== undefined) {
        throw new Error("error");
      }

      return result.map(
        ({ value, label }) =>
          ({
            value,
            label: `${label} (${value})`,
          }) as FilterItem
      );
    },
    staleTime: 2 * 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
  });

  if (isFetching || isPending) {
    return {
      error: null,
      items: [],
    };
  } else if (error !== null || items === undefined) {
    return {
      error: error?.message ?? "Empty response",
      items: null,
    };
  } else {
    return {
      error: null,
      items,
    };
  }
}
