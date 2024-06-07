import { Time } from "@/components/Time";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

const CURRENT_TIME = "CURRENT_TIME";

const Page = () => {
  const queryClient = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: [CURRENT_TIME],
    queryFn: async () => {
      const response = await ky.get("/api/current-time");
      return response.json<{ time: string }>();
    },
  });
  const handleForceRefetch = () => {
    queryClient.invalidateQueries({ queryKey: [CURRENT_TIME] });
  };
  return (
    <div>
      <h2>Page comopnent</h2>
      <button onClick={() => refetch()}>Refetch</button>
      <button onClick={handleForceRefetch}>Force Refetch</button>
      <p>{data?.time}</p>
      <hr />
      <h2>Other component</h2>
      <Time />
    </div>
  );
};

export default Page;
