// Write your tests here

import React from "react";
import { render, screen } from "@testing-library/react";
import AppFunctional from "../components/AppFunctional";

test("hatasız render ediliyor mu", () => {
  render(<AppFunctional />);
});
test("başlangıç adım sayısı 0 mı", () => {
  expect(screen.getByRole("heading", { id: "steps" }).textContent).toBe(
    "0 kere ilerlediniz"
  );
});

test("başlangıç kordinatları doğru mu", () => {
  expect(screen.getByTestId("coordinates").textContent).toBe(
    "Koordinatlar (2, 2)"
  );
});
//npm test components/App.test.js
