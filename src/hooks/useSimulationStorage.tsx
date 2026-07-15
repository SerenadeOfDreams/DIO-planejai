import type { SimulationFormData, SimulationRecord } from "../data/simulation";

const LOCAL_STORAGE_KEY = "simulation-data";

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID();
    const date = new Date().toLocaleDateString();
    const record: SimulationRecord = { ...formData, id, date };

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedData = storage
      ? (JSON.parse(storage) as SimulationRecord[])
      : [];

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    );

    return id;
  };

  const getFormData = (id: string): SimulationRecord | null => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storage) return null;

    const savedData = JSON.parse(storage) as SimulationRecord[];
    return savedData.find((record) => record.id == id) || null;
  };

  const getSimulationHistory = () => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storage) return null;

    const savedData = JSON.parse(storage) as SimulationRecord[];

    if (savedData.length == 0) return null;
    if (saveFormData.length == 1 && savedData[0] == null) return null;
    return savedData;
  };

  const updateSimulation = (id: string, data: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedData = storage
      ? (JSON.parse(storage) as SimulationRecord[])
      : [];

    const updated = savedData.map((record) =>
      record.id == id ? { ...data } : record,
    );

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return { saveFormData, getFormData, getSimulationHistory, updateSimulation };
};
