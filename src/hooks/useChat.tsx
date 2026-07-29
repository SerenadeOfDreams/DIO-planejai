import { useCallback, useEffect, useRef, useState } from "react";
import { BuildAIChatPrompt } from "../data/aiChatPromt";
import type { SimulationRecord } from "../data/simulation";
import { getChatAnswer, type ChatData } from "../services/aiService";
import { useSimulationStorage } from "./useSimulationStorage";

export const useChat = (id: string) => {
  const { getFormData, updateSimulation } = useSimulationStorage();
  const [chat, setChat] = useState<ChatData | null>(() => {
    const simulation = getFormData(id);

    if (simulation?.chatData) return simulation.chatData;

    return null;
  });
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const isRequestPending = useRef(false);
  const [userText, setUserText] = useState("");
  const [isLast, setIsLast] = useState(false);

  const sendMessage = useCallback(
    async (simulationId: string, text: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setChatError("Simulação não encontrada.");
        return;
      }

      if (!text || text.trim() == "") {
        setChatError("Mensagem não digitada.");
        return;
      }
      setUserText(text);

      try {
        if (!simulation.chatData) {
          //Primeiro updateSimulation para salvar a mensagem do usuário na localstorage e exibir antes da resposta.
          updateSimulation(simulationId, {
            ...simulation,
            chatData: {
              interaction: [{ request: text, response: "" }],
            },
          } as SimulationRecord);

          //Pegando a simulação atualizada para exibição.

          const simulationWithChatData = getFormData(id);

          if (!simulationWithChatData) {
            setChatError("Erro ao recarregar as mensagens.");
            return;
          }

          const newData = simulationWithChatData.chatData!;

          setChat(newData);
        }
        //Fim do if que verifica se não há histórico de mensagens.

        //Primeiro updateSimulation para salvar a mensagem do usuário na localstorage e exibir antes da resposta.
        updateSimulation(simulationId, {
          ...simulation,
          chatData: {
            interaction: [
              ...(simulation.chatData?.interaction ?? []),
              { request: text, response: "" },
            ],
          },
        } as SimulationRecord);

        //Pegando a simulação atualizada para exibição.

        const simulationWithChatData = getFormData(id);

        if (!simulationWithChatData) {
          setChatError("Erro ao recarregar as mensagens.");
          return;
        }

        const newData = simulationWithChatData.chatData!;

        setChat(newData);
      } catch {
        setChatError("Erro ao enviar a mensagem. Tente novamente.");
      }
    },
    [getFormData, updateSimulation],
  );

  //Esse useCallBack é para passar a fetchChat como array de dependências da useEffect abaixo
  const fetchChat = useCallback(
    async (simulationId: string, text: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setChatError("Simulação não encontrada");
        return;
      }

      isRequestPending.current = true;
      setChatIsLoading(true);
      setChatError(null);

      try {
        const prompt = BuildAIChatPrompt(
          simulation,
          simulation.insight!,
          text,
          simulation.chatData,
        );
        const data = await getChatAnswer(prompt);
        setChat(data);

        //updateSimulation para salvar a resposta na respectiva interaction.
        updateSimulation(simulation.id, {
          ...simulation,
          chatData: {
            interaction: [
              ...(simulation.chatData?.interaction ?? []).map(
                (item, index, array) =>
                  index == array.length - 1
                    ? { ...item, response: data.interaction[0].response }
                    : item,
              ),
            ],
          },
        } as SimulationRecord);

        const completeSimulation = getFormData(id);

        if (!completeSimulation) {
          setChatError("Erro ao recarregar as mensagens.");
          return;
        }

        const completeData = completeSimulation.chatData!;

        setChat(completeData);
      } catch {
        setChatError("Erro ao gerar uma resposta. Tente novamente.");
      } finally {
        isRequestPending.current = false;
        setChatIsLoading(false);
      }
    },
    [getFormData, updateSimulation],
  );

  useEffect(() => {
    //Evita loop infinito de requisição para a API do Gemini
    if (chat || chatIsLoading || chatError || isRequestPending.current) return;
  }, [id, chat, chatIsLoading, chatError, sendMessage, fetchChat]);

  return { chat, chatIsLoading, chatError, sendMessage, fetchChat };
};
