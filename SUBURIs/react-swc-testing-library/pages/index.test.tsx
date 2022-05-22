import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /This is Heading/i,
    });
    const h2 = screen.getByRole("heading", {
      level: 2,
    });
    const p = screen.getByTestId("test-sample-text");

    expect(heading).toBeInTheDocument();
    expect(h2).toHaveTextContent("This is H2");
    expect(p).toHaveTextContent("Sample Text");
  });
});
