import { Time } from "@/components/Time";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { useState } from "react";

const CURRENT_TIME = "CURRENT_TIME";

const Page = () => {
  const [enabled, setEnabled] = useState(true);
  const queryClient = useQueryClient();
  const { data, refetch, fetchStatus, status } = useQuery({
    queryKey: [CURRENT_TIME],
    queryFn: async () => {
      const response = await ky.get("/api/current-time");
      return response.json<{ time: string }>();
    },
    enabled,
  });
  const handleForceRefetch = () => {
    queryClient.invalidateQueries({ queryKey: [CURRENT_TIME] });
  };
  return (
    <div>
      <h2>Page comopnent</h2>
      <button onClick={() => refetch()}>Refetch</button>
      <button onClick={handleForceRefetch}>Force Refetch</button>
      <button onClick={() => setEnabled((prev) => !prev)}>
        Change enabled / current: {enabled.toString()}
      </button>
      <p>{data?.time}</p>
      <p>---</p>
      <p>fetchStatus: {fetchStatus}</p>
      <p>status: {status}</p>
      <hr />
      <h2>Other component</h2>
      <Time />
    </div>
  );
};

export default Page;
