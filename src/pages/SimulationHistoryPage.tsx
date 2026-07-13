import { PageHero } from "../components/shared/PageHero";
import { Card } from "../features/simulationHistory/Card";
import { useSimulationStorage } from "../hooks/useSimulationStorage";

export function SimulationHistoryPage() {
  const { getSimulationHistory } = useSimulationStorage();
  const data = getSimulationHistory();

  if (!data) return <p>Não há simulações</p>;

  return (
    <main className="mx-auto max-w-6xl px-14 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        caption="Acompanhe o histórico de seus planos financeiros"
      />
      <div className="flex flex-col gap-10 lg:gap-4">
        {/* <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-4"> */}
        {Object.keys(data).map((key, index) => (
          <Card
            key={index}
            goalName={data[index].goalName}
            simulationDate="10/07/2026"
            goalAmount={data[index].goalAmount}
            goalDeadline={data[index].goalDeadLine}
            income={data[index].income}
            expenses={data[index].expenses}
            debts={data[index].debts}
          />
        ))}
      </div>
    </main>
  );
}
