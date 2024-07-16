import { useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { useState } from "react";

const Home = () => {
  const [enabled, setEnabled] = useState(false);
  const { data, isLoading, error, status, fetchStatus, failureReason } =
    useQuery({
      enabled,
      queryKey: ["long"],
      queryFn: async ({ signal }) => {
        try {
          const response = await ky.get("/api/long", { signal });
          return response.json<{ text: string }>();
        } catch (error: any) {
          console.log("error.message", error?.message);
          if (error instanceof DOMException) {
            console.log("error.name", error.name);
          }
        }
      },
    });
  const loadingText = isLoading
    ? "loading..."
    : data?.text
    ? "loaded"
    : "no data";

  console.log("error", error);
  console.log("status", status);
  console.log("fetchStatus", fetchStatus);
  console.log("failureReason", failureReason);

  const queryClient = useQueryClient();

  const onClickFetch = () => {
    setEnabled(true);
  };

  const onClickAbort = () => {
    queryClient.cancelQueries({ queryKey: ["long"] });
  };

  return (
    <div>
      <h1>abort test</h1>
      <div>
        <p>{loadingText}</p>
        <button onClick={onClickFetch}>fetch</button>
        <button onClick={onClickAbort}>abort</button>

        <p>{data?.text}</p>
      </div>
    </div>
  );
};

export default Home;
