import { Counter } from "./Counter";
import { PageProps } from "./index.page.server";

export { Page };

function Page(props: PageProps) {
  console.log("props:", props);
  return (
    <>
      <h1>Welcome</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
      <div>
        <p>This below comes from SSR</p>
        <ul>
          {props.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
