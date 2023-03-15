import React from 'react';
import * as DutchC from './styles';

type StepProps = {
  id: number;
  title: string;
  active: boolean;
};
type StepsProps = {
  steps: StepProps[];
};

export const Stepper: React.FC<StepsProps> = ({ steps }) => {
  return (
    <DutchC.StepsWrapper>
      {steps.map((step) => {
        return (
          <DutchC.StepContainer key={step.id}>
            {step.active ? (
              <DutchC.StepActive>{step.id}</DutchC.StepActive>
            ) : (
              <DutchC.StepNonActive>{step.id}</DutchC.StepNonActive>
            )}
            {step.active ? (
              <DutchC.StepActiveTitle>{step.title}</DutchC.StepActiveTitle>
            ) : (
              <DutchC.StepNonActiveTitle>
                {step.title}
              </DutchC.StepNonActiveTitle>
            )}
          </DutchC.StepContainer>
        );
      })}
    </DutchC.StepsWrapper>
  );
};
