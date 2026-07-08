import type { SimulationFormData } from "../data/simulation";
import { ParseCurrency } from "./currency";

export function calcMonthlySavings(data: SimulationFormData) {
  return (
    ParseCurrency(data.income) -
    ParseCurrency(data.expenses) -
    ParseCurrency(data.debts)
  );
}
