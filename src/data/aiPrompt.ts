import { ParseCurrency } from "../utils/currency";
import { calcMonthlySavings } from "../utils/simulation";
import type { SimulationRecord } from "./simulation";

const RESPONSE_SCHEMA = `{
    "feasibility": {
        "status": "viable" | "needs_adjustment" | "unfeasible"
        "content": "<Análise objetiva sobre a meta é atingível no prazo com o valor disponível. Mencione os números relevantes.>"
    },
    "diagnosis": {
        "content": "<Diagnóstico focado no comprometimento do orçamento.: quanto % da renda está comprometida com gastos e dívidas e o que isso representa para a saúde financeira.>"
    },
    "suggestions": {
        "items": ["<Sugestão prática e concreta para reduzir gastos ou reorganizar o orçamento>"]
    },
    "extraIncome": {
        "items": ["<Ideia prática para gerar renda extra compatível com a realidade brasileira>"]
    },
    "investiment: {
        "items": ["<Sugestão de investimento acessível para o perfil apresentado, com foco em atingir a meta>"]
    },
    "motivation": {
        "content": "<Mensagem final motivacional e personalizada, citando a meta pelo nome.>"
    }
}`;

export function BuildAIPrompt(simulation: SimulationRecord) {
  const { income, expenses, debts, goalName, goalAmount, goalDeadLine } =
    simulation;

  const monthlySavings = calcMonthlySavings(simulation);
  const monthlySavingsNeeded =
    ParseCurrency(goalAmount) / parseInt(goalDeadLine);

  return `Você é um educador financeiro especializado em financas pessoais. Analise os dados abaixo e gere um diagnóstico financeiro personalizado com linguagem clara, didática e encorajadora, voltado para pessoas sem conhecimento financeiro. O diagnóstico será exibido diretamente ao usuário no app. Fale sempre em segunda pessoa ("você tem...", "sua meta...).
  
  Dados da simulação:
  - Renda mensal bruta: R$ ${income} reais
  - Custos fixos essenciais: ${expenses} reais
  - Dívidas e parcelas mensais: ${debts} reais
  - Valor disponível por mês: ${monthlySavings} reais
  - Meta: ${goalName}
  - Custo da meta: ${goalAmount} reais
  - Prazo desejado: ${goalDeadLine} mês/meses
  - Economia mensal necessária para atingir a meta no prazo: ${monthlySavingsNeeded} reais
  - Saldo após reserva para a meta: ${monthlySavings - monthlySavingsNeeded} reais
  
  Retorne APENAS um JSON válido, sem texto adicional e sem blocos de código, neste exato formato:
  
  ${RESPONSE_SCHEMA}
  
  Regras:
  - Todos os textos em português do Brasil
  - Máximo de 4 itens por lista
  - Seja específico ao citar valores calculados
  - Não repita informações entre seções
  - Nunca use Markdown dentro dos valores JSON
  - Para o campo "feasibility.status", use os seguintes critérios:
    - "viable:": saldo após reserva para a meta é maior ou igual a 0
    - "needs_adjustment": saldo negativo de até 20% do valor da economia mensal necessária
    - "unfeasible": saldo negativo superior a 20% do valor da economia mensal necessária`;
}
