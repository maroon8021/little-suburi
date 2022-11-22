import { useEffect, useRef, useState } from "react";

const BACKEND_URL = "http://localhost:50000";

export default function Home() {
  const [time, setTime] = useState("");

  const timer = useRef<ReturnType<typeof setInterval>>();
  const timeRequest = () => {
    fetch(`${BACKEND_URL}/time`, {
      method: "GET",
      credentials: "include",
    }).then((result) => {
      console.log(result);
    });
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      timeRequest();
    }, 1000);

    window.addEventListener("focus", () => {
      if (!timer.current) {
        timer.current = setInterval(() => {
          timeRequest();
        }, 1000);
      }
    });

    window.addEventListener("blur", () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = undefined;
      }
    });
  }, []);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
}
