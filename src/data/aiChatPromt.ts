import type { InsightData } from "../services/aiService";
import { ParseCurrency } from "../utils/currency";
import { calcMonthlySavings } from "../utils/simulation";
import type { SimulationRecord } from "./simulation";

const RESPONSE_SCHEMA = `{
    "interaction": [
        {
            "request": "<Mensagem do usuário.>"
            "response": "<Resposta ao usuário em relação à mensagem, mantendo em mente a simulação, o diagnóstico já recebido e o histórico de conversas daquela simulação caso haja.>"
        }
    ]
}`;

export function BuildAIChatPrompt(
  simulation: SimulationRecord,
  insight: InsightData,
  newMessage: string,
) {
  const { income, expenses, debts, goalName, goalAmount, goalDeadLine } =
    simulation;

  const {
    feasibility: { status, content: feasibilityContent },
    diagnosis: { content: diagnosisContent },
    suggestions: { items: suggestionsItems },
    extraIncome: { items: extraIncomeItems },
    investiment: { items: investimentItems },
    motivation: { content: motivationContent },
  } = insight;

  const monthlySavings = calcMonthlySavings(simulation);
  const monthlySavingsNeeded =
    ParseCurrency(goalAmount) / parseInt(goalDeadLine);

  return `Você é um educador financeiro especializado em financas pessoais. O usuário já fez uma simulação pelo sistema e recebeu um diagnóstico detalhado sobre a situação financeira, possibilidade de alcançar a meta, sugestões de renda extra e investimentos. Analise os dados abaixo (a simulação, o diagnóstico completo e a mensagem do usuário) e responda às mensagens ou solicitações do usuário com linguagem clara, didática e encorajadora, tendo em mente que a ferramenta é para pessoas sem conhecimento financeiro. A resposta será exibida diretamente ao usuário no app. Fale sempre em segunda pessoa ("você tem...", "sua meta...).
  
  Dados da simulação:
  - Renda mensal bruta: R$ ${income}
  - Custos fixos essenciais: R$ ${expenses}
  - Dívidas e parcelas mensais: R$ ${debts}
  - Valor disponível por mês: R$ ${monthlySavings}
  - Meta: ${goalName}
  - Custo da meta: R$ ${goalAmount}
  - Prazo desejado: ${goalDeadLine} mês/meses
  - Economia mensal necessária para atingir a meta no prazo: R$ ${monthlySavingsNeeded}
  - Saldo após reserva para a meta: R$ ${monthlySavings - monthlySavingsNeeded}

  Dados do diagnóstico:
  - Status de viabilidade da meta: ${status}
  - Texto sobre a viabilidade da meta: ${feasibilityContent}
  - Visão geral do diagnóstico: ${diagnosisContent}
  - Sugestões práticas para melhoria: ${suggestionsItems}
  - Dicas de renda extra: ${extraIncomeItems}
  - Dicas de investimentos: ${investimentItems}
  - Mensagem final (para motivação): ${motivationContent}

  Mensagem do usuário: ${newMessage}

  Retorne APENAS um JSON válido, sem texto adicional e sem blocos de código, neste exato formato:

  ${RESPONSE_SCHEMA}

  Regras:
  - Todos os textos em português do Brasil
  - Seja específico ao citar valores calculados
  - Não repita informações entre seções
  - Nunca use Markdown dentro dos valores JSON
  - Seu retorno precisa condizer com a realidade brasileira
  `;
}
