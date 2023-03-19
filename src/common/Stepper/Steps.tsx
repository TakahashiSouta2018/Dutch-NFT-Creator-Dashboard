import React from 'react';
import * as DutchC from './styles';

type StepperProps = {
  activeStep: number;
};

const steps = [
  {
    id: 1,
    title: 'Mint Fee',
  },
  {
    id: 2,
    title: 'Wallet Signature',
  },
  {
    id: 3,
    title: 'Minting',
  },
];

export const Stepper: React.FC<StepperProps> = ({ activeStep }) => {
  return (
    <DutchC.StepsWrapper>
      <DutchC.StepsStripe />

      {steps.map((step, index) => {
        const isActive = index === activeStep;

        return (
          <DutchC.StepContainer key={step.id}>
            {isActive ? (
              <DutchC.StepActive>{step.id}</DutchC.StepActive>
            ) : (
              <DutchC.StepNonActive>{step.id}</DutchC.StepNonActive>
            )}
            {isActive ? (
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
