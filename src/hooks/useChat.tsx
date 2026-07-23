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

  //Esse useCallBack é para passar a fetchChat como array de dependências da useEffect abaixo
  const fetchChat = useCallback(
    async (simulationId: string, text: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setChatError("Simulação não encontrada");
        return;
      }

      if (!text || text.trim() == "") {
        setChatError("Mensagem não digitada.");
        return;
      }
      setUserText(text);

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

        if (!simulation.chatData) {
          updateSimulation(simulationId, {
            ...simulation,
            chatData: data,
          } as SimulationRecord);
        }

        updateSimulation(simulationId, {
          ...simulation,
          chatData: {
            interaction: [
              ...(simulation.chatData?.interaction ?? []),
              { request: text, response: data.interaction[0].response },
            ],
          },
        } as SimulationRecord);
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

    // fetchChat(id, userText);
  }, [id, chat, chatIsLoading, chatError, fetchChat]);

  return { chat, chatIsLoading, chatError, fetchChat };
};
