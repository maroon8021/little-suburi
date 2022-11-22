import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:50000";

export default function Home() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/set-only-same-origin`, {
      method: "POST",
    })
      .then((result) => {
        console.log(result);
      })
      .catch((e) => console.log(e));

    fetch(`${BACKEND_URL}/set-any`, {
      method: "POST",
      credentials: "include",
    })
      .then((result) => {
        console.log(result);

        fetch(`${BACKEND_URL}/check-cookie`, {
          method: "GET",
          credentials: "include",
        })
          .then((result) => {
            console.log(result);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}
