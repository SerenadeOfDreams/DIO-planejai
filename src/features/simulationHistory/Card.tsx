import { Goal, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { Button } from "../../components/shared/Button";
import { Divider } from "../../components/shared/Divider";
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

interface ButtonActionProps {
  onRemoveItem: () => void;
  onToSimulation: () => void;
}

export function Card({
  goalName,
  simulationDate,
  goalAmount,
  goalDeadline,
  income,
  expenses,
  debts,
  onRemoveItem,
  onToSimulation,
}: CardProps & ButtonActionProps) {
  const monthlySavings =
    ParseCurrency(income) - ParseCurrency(expenses) - ParseCurrency(debts);
  return (
    <>
      <div className="rounded-2xl flex flex-col gap-6 p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:flex-row lg:items-center gap-0 lg:justify-evenly">
        <div className="flex flex-1 min-w-0 gap-6 items-center">
          <div className="bg-muted-primary rounded-xl p-3">
            <Goal size={24} className="text-muted-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-xl font-semibold truncate">{goalName}</p>
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

        <Divider orientation="horizontal" className="lg:hidden" />

        <div className="flex">
          <Divider orientation="vertical" className="hidden lg:block" />
          <div className="flex flex-row w-full justify-center lg:w-auto lg:gap-3">
            <Button
              variant="ghost"
              icon={Trash2}
              onClick={onRemoveItem}
            ></Button>
            <Button
              variant="secondary"
              icon={SquareArrowOutUpRight}
              onClick={onToSimulation}
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
