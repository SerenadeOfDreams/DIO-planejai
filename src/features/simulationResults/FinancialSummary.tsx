import { CreditCardIcon, Landmark, Wallet } from "lucide-react";
import { Divider } from "../../components/shared/Divider";

interface FinancialSummaryProps {
  income: string;
  expenses: string;
  debts: string;
}

export function FinancialSummary({
  income,
  expenses,
  debts,
}: FinancialSummaryProps) {
  return (
    <div className="bg-card order-1 rounded-2xl flex flex-col gap-4 p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-2">
      <p className="text-xl text-foreground font-semibold">
        Resumo das suas finanças
      </p>

      <div className="flex flex-col gap-2">
        <div className=" flex items-center gap-2">
          <Wallet size={16} className="text-primary" />
          <span className="text-xs text-primary font-semibold tracking-widest uppercase">
            Renda mensal
          </span>
        </div>
        <p className="text-3xl text-foreground font-semibold">{income}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Renda total bruta por mês
        </p>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        <div className=" flex items-center gap-2">
          <CreditCardIcon size={16} className="text-primary" />
          <span className="text-xs text-primary font-semibold tracking-widest uppercase">
            Custos fixos de vida
          </span>
        </div>
        <p className="text-3xl text-foreground font-semibold">{expenses}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Gastos essenciais por mês
        </p>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        <div className=" flex items-center gap-2">
          <Landmark size={16} className="text-primary" />
          <span className="text-xs text-primary font-semibold tracking-widest uppercase">
            Dívidas / Parcelas
          </span>
        </div>
        <p className="text-3xl text-foreground font-semibold">{debts}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Valor comprometido em parcelas/depósito
        </p>
      </div>
    </div>
  );
}
