import "jest-dom/extend-expect";
import React from "react";
import { SelectTwo } from "./SelectTwoFunctionalComponent";
import { render, cleanup, fireEvent } from "react-testing-library";

afterEach(cleanup);

const mockItems = [
  {
    description: "first item",
    selected: false
  },
  {
    description: "second item",
    selected: false
  },
  {
    description: "third item",
    selected: false
  }
];

describe("SelectTwo", () => {
  it("should check one item and not display an error", () => {
    const { getByText, getByLabelText } = render(
      <SelectTwo items={mockItems} />
    );

    fireEvent.click(getByText("first item"));

    expect(getByLabelText("first item").checked).toBe(true);
    expect(getByLabelText("second item").checked).toBe(false);
    expect(getByLabelText("third item").checked).toBe(false);
    expect(getByText("Warning: you can only select 2 items")).not.toBeVisible();
  });

  it("should check two items and not display an error", () => {
    const { getByText, getByLabelText } = render(
      <SelectTwo items={mockItems} />
    );

    fireEvent.click(getByText("first item"));
    fireEvent.click(getByText("second item"));

    expect(getByLabelText("first item").checked).toBe(true);
    expect(getByLabelText("second item").checked).toBe(true);
    expect(getByLabelText("third item").checked).toBe(false);
    expect(getByText("Warning: you can only select 2 items")).not.toBeVisible();
  });

  it("should select the last two selected items when trying to select more than 2 items", () => {
    const { getByText, getByLabelText } = render(
      <SelectTwo items={mockItems} />
    );

    fireEvent.click(getByText("first item"));
    fireEvent.click(getByText("second item"));
    fireEvent.click(getByText("third item"));

    expect(getByLabelText("first item").checked).toBe(false);
    expect(getByLabelText("second item").checked).toBe(true);
    expect(getByLabelText("third item").checked).toBe(true);
    expect(getByText("Warning: you can only select 2 items")).toBeVisible();
  });

  it("should display a warning when trying to select more than 2 items", () => {
    const { getByText } = render(
      <SelectTwo items={mockItems} />
    );

    fireEvent.click(getByText("first item"));
    fireEvent.click(getByText("second item"));
    fireEvent.click(getByText("third item"));

    expect(getByText("Warning: you can only select 2 items")).toBeVisible();
  });
});
