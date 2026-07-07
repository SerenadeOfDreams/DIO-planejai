import { useState } from "react";
import {
  type SimulationFormData,
  simulationFormSteps,
} from "../../data/simulation";
import { FormStep } from "./FormStep";
import { StepProgress } from "./Progress";

export const SimulationForm = () => {
  const [currenStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = simulationFormSteps.length;
  const currentStep = simulationFormSteps[currenStepIndex];
  const [formData, setFormData] = useState<SimulationFormData>(
    {} as SimulationFormData,
  );

  const handleNextStep = (value: string) => {
    const updatedFormData = { ...formData, [currentStep.id]: value };
    setFormData(updatedFormData);

    // console.log({ updatedFormData });

    if (currenStepIndex + 1 > totalSteps - 1) {
      return;
    }

    setCurrentStepIndex((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currenStepIndex === 0) {
      return;
    }

    setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <>
      <StepProgress currentStep={currenStepIndex + 1} totalSteps={totalSteps} />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currenStepIndex == 0}
      />
    </>
  );
};
