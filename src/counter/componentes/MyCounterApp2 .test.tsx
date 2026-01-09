//esta test fue crreeado para evaluar la funcionalidad del hookCustom
//render(<MyCounterApp/>) <-- esto evaluar y renderiza ese componente
//  y no el useCounter, por eso se crea este segundo test y se hace
//un moook completo del useCounter

import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
import { fireEvent, render, screen } from "@testing-library/react";
// import { useCounter } from "../hooks/useCounter";

const handleAddMock = vi.fn();
const handleSubtractMock = vi.fn();
const handleResetMock = vi.fn();

vi.mock("../hooks/useCounter", () => ({
  useCounter: () => ({
    counter: 40,
    handleAdd: handleAddMock,
    handleReset: handleResetMock,
    handleSubtract: handleSubtractMock,
  }),
}));

describe("MyCounterApp", () => {
  test("should render the component", () => {
    render(<MyCounterApp />);

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      `counter: 40`
    );

    expect(screen.getByRole("button", { name: "+1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "-1" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Reset" })).toBeDefined();
  });

  //lo nuevo, por esto uso el mock y llevo arriba las variables
  test("should call handleAdd if button is clicked", () => {
    render(<MyCounterApp />);

    const button = screen.getByRole("button", { name: "+1" });

    fireEvent.click(button);
    expect(handleAddMock).toHaveBeenCalled();
    expect(handleSubtractMock).not.toHaveBeenCalled();
    expect(handleResetMock).not.toHaveBeenCalled();
  });
});
