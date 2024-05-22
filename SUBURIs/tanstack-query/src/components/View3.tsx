import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export const View3 = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["/view3"],
    queryFn: async () => {
      const response = await ky.get("/api/hello");
      return response.json<{ name: string }>();
    },
  });

  return isLoading ? <p>Loading...</p> : <p>Hello3, {data?.name}</p>;
};
