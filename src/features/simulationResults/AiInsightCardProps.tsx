import { Send } from "lucide-react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Button } from "../../components/shared/Button";
import { Input } from "../../components/shared/Input";
import { useChat } from "../../hooks/useChat";
import { useInsight } from "../../hooks/useInsight";
import { Content } from "../insights/Content";
import { Error } from "../insights/Error";

interface AiInsightCardProps {
  simulationId: string;
}

export function AiInsightCard({ simulationId }: AiInsightCardProps) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  const [text, setText] = useState("");
  const { chat, chatIsLoading, chatError, fetchChat } = useChat(simulationId);

  console.log(insight);

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1 5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight financeiro personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10}
            className="mb-3 flex rounded-lg"
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
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
        <div className="flex flex-col gap-6">
          <Content
            insight={insight}
            chat={chat}
            chatIsLoading={chatIsLoading}
            chatError={chatError}
            text={text}
            simulationId={simulationId}
          />

          <Input
            type="text"
            placeholder="Digite sua mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            button={
              <Button
                variant="ghost"
                icon={{ iconName: Send }}
                onClick={() => fetchChat(simulationId, text)}
              />
            }
          />
        </div>
      )}
    </div>
  );
}
