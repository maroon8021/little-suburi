import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export const View2 = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["/hello"],
    queryFn: async () => {
      const response = await ky.get("/api/hello");
      return response.json<{ name: string }>();
    },
  });

  return isLoading ? <p>Loading...</p> : <p>Hello2, {data?.name}</p>;
};
