import { useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

const CURRENT_TIME = "CURRENT_TIME";

export const Time: React.FC = () => {
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
    <>
      <button onClick={handleForceRefetch}>Force Refetch</button>
      <p>{data?.time}</p>
    </>
  );
};
