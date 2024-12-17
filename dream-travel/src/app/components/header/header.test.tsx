import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./header";

describe("Header component", () => {
  it("renders the header with logo and button", () => {
    const mockSetIsDialogCreateItemOpen = jest.fn();
    render(
      <Header setIsDialogCreateItemOpen={mockSetIsDialogCreateItemOpen} />
    );
    const logo = screen.getByAltText("Logo");
    const button = screen.getByText("Create new trip");

    expect(logo).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("has setIsDialogCreateItemOpen called once with true when button is clicked", () => {
    const mockSetIsDialogCreateItemOpen = jest.fn();
    render(
      <Header setIsDialogCreateItemOpen={mockSetIsDialogCreateItemOpen} />
    );
    const button = screen.getByText("Create new trip");

    fireEvent.click(button);

    expect(mockSetIsDialogCreateItemOpen).toHaveBeenCalledTimes(1);
    expect(mockSetIsDialogCreateItemOpen).toHaveBeenCalledWith(true);
  });
});
