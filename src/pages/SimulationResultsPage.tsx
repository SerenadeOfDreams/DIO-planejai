import { CalendarClock, Goal, PiggyBank } from "lucide-react";
import { useParams } from "react-router-dom";
import { PageHero } from "../components/shared/PageHero";
import { Card } from "../features/simulationResults/Card";
import { FinancialSummary } from "../features/simulationResults/FinancialSummary";
import { useSimulationStorage } from "../hooks/useSimulationStorage";
import { calcMonthlySavings } from "../utils/simulation";

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>();
  const { getFormData } = useSimulationStorage();
  const data = id ? getFormData(id) : null;

  if (!data) return <p>Simulação não encontrada</p>;

  const monthlySavings = calcMonthlySavings(data);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Resultado da simulação"
        caption="Com base no seu perfil financeiro e objetivos"
      />
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          icon={Goal}
          label="Custo da meta"
          value={data.goalAmount}
          caption={data.goalName}
        />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${data.goalDeadLine} ${Number(data.goalDeadLine) == 1 ? "mês" : "meses"}`}
          caption={"Prazo para atingir a meta"}
        />
        <Card
          icon={PiggyBank}
          label="Economia mensal"
          value={`R$ ${monthlySavings.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          caption={"Economia mensal necessária"}
          variant="primary"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
          Painel de insights
        </div>
        <FinancialSummary
          income={data.income}
          expenses={data.expenses}
          debts={data.debts}
        />
      </div>
    </main>
  );
}
