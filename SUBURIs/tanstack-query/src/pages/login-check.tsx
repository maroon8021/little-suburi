import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import { ReactNode } from "react";

const Home = () => {
  return <div></div>;
};

export default Home;

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["is-login"],
    queryFn: async () => {
      const response = await ky.get("/api/is-login");
      return response.json<{ isLogin: boolean }>();
    },
  });

  return isLoading ? <Loading /> : <div>{children}</div>;
};

const Loading = () => {
  return <div>Loading...</div>;
};
