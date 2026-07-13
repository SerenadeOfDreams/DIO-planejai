import { Goal, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Button } from "../../components/shared/Button";
import { ParseCurrency } from "../../utils/currency";

interface CardProps {
  goalName: string;
  simulationDate: string;
  goalAmount: string;
  goalDeadline: string;
  income: string;
  expenses: string;
  debts: string;
}

export function Card({
  goalName,
  simulationDate,
  goalAmount,
  goalDeadline,
  income,
  expenses,
  debts,
}: CardProps) {
  const monthlySavings =
    ParseCurrency(income) - ParseCurrency(expenses) - ParseCurrency(debts);
  return (
    <>
      <div className="rounded-2xl flex flex-col gap-6 p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:flex-row lg:items-center gap-0 lg:justify-between">
        <div className="flex gap-6 items-center">
          <div className="bg-muted-primary rounded-xl p-3">
            <Goal size={24} className="text-muted-primary-foreground" />
          </div>

          <div className="">
            <p className="text-xl font-semibold">{goalName}</p>
            <p className="text-sm">{simulationDate}</p>
          </div>
        </div>

        <div className="">
          <p>CUSTO DA META</p>
          <p className="font-semibold">{goalAmount}</p>
        </div>
        <div className="">
          <p>PRAZO</p>
          <p className="font-semibold">
            {goalDeadline} {Number(goalDeadline) == 1 ? "mês" : "meses"}
          </p>
        </div>
        <div className="">
          <p>ECONOMIA MENSAL</p>
          <p className="font-semibold">{`R$ ${monthlySavings.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
        </div>

        {/* <Divider orientation="vertical" /> */}

        <div className="flex flex-row w-full justify-center lg:w-auto">
          <Button variant="ghost" icon={Trash2}>
            {/* <Trash2 size={24} />s */}
          </Button>
          <Button variant="secondary" icon={SquareArrowOutUpRight}>
            {/* <SquareArrowOutUpRight size={24} /> */}
            Ver detalhes
          </Button>
        </div>
      </div>
    </>
  );
}
