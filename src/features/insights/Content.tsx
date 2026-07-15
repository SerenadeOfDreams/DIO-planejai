interface ContentProps {
  diagnosis: string;
  feasibility: {
    content: string;
    status: string;
  };
  suggestions: string[];
  extraIncome: string[];
  investiment: string[];
  motivation: string;
}

export function Content({
  diagnosis,
  feasibility: { content, status },
  suggestions,
  extraIncome,
  investiment,
  motivation,
}: ContentProps) {
  return (
    <div className="flex h-full flex-col gap-10 px-6">
      <p>{diagnosis}</p>

      <div className="flex flex-col gap-1.5">
        <p className="text-2xl text-foreground font-semibold">
          Viabilidade da meta:
        </p>
        {status == "viable" && <p>Viável</p>}
        {status == "needs_adjustment" && <p>Precisa de ajustes</p>}
        {status == "unfeasible" && <p>Inviável</p>}
        <p>{content}</p>
      </div>

      <div className="flex flex-col gap-1 5">
        <p className="text-2xl font-semibold">Sugestões:</p>
        {suggestions.map((s, index) => (
          <p>
            <b>.{index + 1} -</b> {s}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1 5">
        <p className="text-2xl font-semibold">Renda extra:</p>
        {extraIncome.map((ei, index) => (
          <p>
            <b>.{index + 1} -</b> {ei}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1 5">
        <p className="text-2xl font-semibold">Investimentos:</p>
        {investiment.map((i, index) => (
          <p>
            <b>.{index + 1} -</b> {i}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-1 5">
        {status == "unfeasible" && (
          <p className="text-2xl font-semibold">Não desanime</p>
        )}
        <p>{motivation}</p>
      </div>
    </div>
  );
}
