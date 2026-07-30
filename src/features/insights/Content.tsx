import { useEffect, useRef, type PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";
import type { ChatData, InsightData } from "../../services/aiService";
import { AiMessage } from "../simulationResults/AiMessage";
import { UserMessage } from "../simulationResults/UserMessage";

interface ContentProps {
  insight: InsightData;
  chat?: ChatData | null;
  chatIsLoading?: boolean;
  chatError?: string | null;
  simulationId: string;
}

function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
  );
}

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h3 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
      {children}
    </h3>
  );
}

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="text-muted-foreground ml-6 list-decimal text-sm leading-relaxed">
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  );
}

const statusStyles = {
  viable: {
    label: "Meta viável no prazo",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  needs_adjustment: {
    label: "Ajuste necessário",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  unfeasible: {
    label: "Meta inviável no prazo",
    className: "bg-red-100 text-red-700 dark: bg-red-900/30 dark: text-red-400",
  },
};

export function Content({
  insight,
  chat,
  chatError,
  chatIsLoading,
  simulationId,
}: ContentProps) {
  const status = statusStyles[insight.feasibility.status] ?? null;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat?.interaction.length, chatIsLoading]);
  return (
    <div
      ref={messagesEndRef}
      className="overflow-y-auto lg:scrollbar-thin lg:max-h-93 lg:pr-2 lg:[scrollbar-color:var-(--border)_transparent]"
    >
      <section className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          <span className="text-foreground text-sm font-semibold">
            🎯 Viabilidade da meta
          </span>
          {status && (
            <span
              className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semoibold ${status.className}`}
            >
              {status.label}
            </span>
          )}
        </div>
        <Paragraph>{insight.feasibility.content}</Paragraph>
      </section>

      <section>
        <SectionTitle>💰 Diagnóstico financeiro</SectionTitle>
        <Paragraph>{insight.diagnosis.content}</Paragraph>
      </section>

      {insight.suggestions.items && (
        <section>
          <SectionTitle>📋 Sugestões práticas</SectionTitle>
          <OrderedList items={insight.suggestions.items} />
        </section>
      )}

      {insight.extraIncome.items && (
        <section>
          <SectionTitle>💡 Como aumentar sua renda</SectionTitle>
          <OrderedList items={insight.extraIncome.items} />
        </section>
      )}

      {insight.investiment.items && (
        <section>
          <SectionTitle>🏦 Sugestões de investimento</SectionTitle>
          <OrderedList items={insight.investiment.items} />
        </section>
      )}

      <section>
        <SectionTitle>🚀 Mensagem final</SectionTitle>
        <Paragraph>{insight.motivation.content}</Paragraph>
      </section>

      <section className="flex flex-col gap-6 mt-6">
        <SectionTitle>Converse com a I.A</SectionTitle>

        {chat?.interaction && !chatError && (
          <>
            {chat.interaction.map((keys, index) => (
              <div key={index} className="flex flex-col gap-6">
                <UserMessage message={keys.request} />
                {chatIsLoading && !keys.response ? (
                  <div className="flex">
                    <Skeleton
                      count={3}
                      className="mb-3 flex rounded-lg"
                      baseColor="var(--color-skeleton-base)"
                      highlightColor="var(--color-skeleton-highlight)"
                      containerClassName="flex-1"
                      inline
                    />
                  </div>
                ) : (
                  <AiMessage message={keys.response} />
                )}
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
}
