import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import BasicForm from "./components/pages/BasicForm";
import userEvent from "@testing-library/user-event";
test("renders title", () => {
  render(<App />);
  const title = screen.getByTestId("mytestid");
  expect(title).toBeInTheDocument();
});
test("sum check", () => {
  render(<App />);
  const sum = screen.getByTitle("sum");
  expect(sum.textContent).toBe("11");
});
test("check age for martial status", () => {
  render(<BasicForm />);
  const ageInput = screen.getByLabelText("Age");
  fireEvent.change(ageInput, { target: { value: "25" } });
  const submitButton = screen.getByText("Submit");
  fireEvent.click(submitButton);
  const martialStatusInput = screen.getByPlaceholderText(
    "Enter Martial Status"
  );
  expect(martialStatusInput).toBeInTheDocument();
});
test("Selecting nationality sets the value of the country", () => {
  render(<BasicForm />);
  const nationalityInput = screen.getByLabelText("Nationality");
  fireEvent.change(nationalityInput, { target: { value: "Indian" } });
  const countryInput = screen.getByPlaceholderText("Enter Country");
  expect(countryInput).toBeInTheDocument();
  fireEvent.change(nationalityInput, { target: { value: "American" } });
  expect(countryInput).toBeInTheDocument();
});
test("displays 'You are too young!' message when age is 10", () => {
  render(<BasicForm />);
  const ageInput = screen.getByPlaceholderText(/Enter Age/i);
  userEvent.type(ageInput, "10");
  const ageMessage = screen.getByTestId("age-message");
  expect(ageMessage).toHaveStyle({ visibility: "visible" });
});
test("hides 'You are too young!' message when age is not 10", () => {
  render(<BasicForm />);
  const ageInput = screen.getByRole("textbox", { name: /age/i });
  userEvent.type(ageInput, "15");
  const ageMessage = screen.getByTestId("age-message");
  expect(ageMessage).toHaveStyle({ visibility: "hiddens" });
});
