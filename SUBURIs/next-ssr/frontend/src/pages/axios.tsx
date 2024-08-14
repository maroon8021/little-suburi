import { useEffect } from "react";
import axios from "axios"; // Import the axios library

const Hage = () => {
  useEffect(() => {
    axios.get("/api/error").catch((e) => {
      console.error(e);
      axios.isAxiosError(e) && console.error(e.response?.data);
    });
  }, []);
  return <div>hage</div>;
};
export default Hage;
