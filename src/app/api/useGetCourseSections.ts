import { useQuery } from "@tanstack/react-query";

export function useGetCourseSections() {
  return useQuery({
    queryKey: [``],
    queryFn: async () => {},
  });
}
