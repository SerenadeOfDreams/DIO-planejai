import { useInsight } from "../../hooks/useInsight";
import { Content } from "../insights/Content";
import { Error } from "../insights/Error";

interface AiInsightCardProps {
  simulationId: string;
}

export function AiInsightCard({ simulationId }: AiInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  console.log(insight);

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1 5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight financeiro personalizado
        </span>
      </div>

      {isLoading && <p>Carregando...</p>}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId);
          }}
        />
      )}
      {!isLoading && insight && !error && (
        <Content
          diagnosis={insight.diagnosis.content}
          feasibility={{
            content: insight.feasibility.content,
            status: insight.feasibility.status,
          }}
          suggestions={insight.suggestions.items}
          extraIncome={insight.extraIncome.items}
          investiment={insight.investiment.items}
          motivation={insight.motivation.content}
        />
      )}
    </div>
  );
}
