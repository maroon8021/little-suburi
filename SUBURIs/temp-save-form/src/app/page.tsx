import { Form } from "./form";
import styles from "./page.module.css";

async function getFormData() {
  const response = await fetch("http://localhost:3000/api/form", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export default async function Home() {
  const data = await getFormData();
  return (
    <main className={styles.main}>
      <Form {...data} />
    </main>
  );
}
