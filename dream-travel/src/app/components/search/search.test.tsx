import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "./search";

describe("Search component", () => {
  it("renders the component correctly", () => {
    render(<Search onSearch={() => {}} />);

    expect(screen.getByText("The places you dream of")).toBeInTheDocument();
    expect(screen.getByText("Let’s live new adventures")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(<Search onSearch={() => {}} />);

    const input = screen.getByPlaceholderText("Search trips");
    fireEvent.change(input, { target: { value: "New York" } });

    expect(input).toHaveValue("New York");
  });

  it("calls onSearch when the search button is clicked", () => {
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText("Search trips");
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "New York" } });
    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith("New York");
  });

  it("calls onSearch when the enter key is pressed", () => {
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText("Search trips");

    fireEvent.change(input, { target: { value: "New York" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(onSearchMock).toHaveBeenCalledWith("New York");
  });
});
