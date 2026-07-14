import { useNavigate } from "react-router-dom";
import { PageHero } from "../components/shared/PageHero";
import type { SimulationRecord } from "../data/simulation";
import { Card } from "../features/simulationHistory/Card";
import { useSimulationStorage } from "../hooks/useSimulationStorage";

export function SimulationHistoryPage() {
  const { getSimulationHistory } = useSimulationStorage();
  const data = getSimulationHistory();
  const navigate = useNavigate();
  const LOCAL_STORAGE_KEY = "simulation-data";

  const removeItem = (index: number) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedData = storage
      ? (JSON.parse(storage) as SimulationRecord[])
      : [];

    savedData.splice(index, 1);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));

    void navigate("/historico");
    return;
  };

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
            simulationDate={`Criada em: ${data[index].date}`}
            goalAmount={data[index].goalAmount}
            goalDeadline={data[index].goalDeadLine}
            income={data[index].income}
            expenses={data[index].expenses}
            debts={data[index].debts}
            onRemoveItem={() => void removeItem(index)}
            onToSimulation={() => void navigate(`/resultado/${data[index].id}`)}
          />
        ))}
      </div>
    </main>
  );
}
