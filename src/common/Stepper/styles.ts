import styled from 'styled-components';

export const StepsWrapper = styled.div.attrs<{ className: string }>({
  className: 'flex mx-6 justify-between relative',
})``;

export const StepsStripe = styled.div.attrs({
  className: 'absolute w-[90%] z-0 border h-0 border-black/10 top-3.5 mx-4',
})``;

export const StepContainer = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col gap-1 text-center items-center z-10',
})``;

export const StepActive = styled.div.attrs<{ className: string }>({
  className:
    'text-medium text-white bg-primary-orange text-sm p-1.5 rounded-full w-8',
})``;

export const StepNonActive = styled.div.attrs<{ className: string }>({
  className:
    'text-medium text-black text-sm p-1 border border-black/10 bg-white rounded-full w-8',
})``;
export const StepActiveTitle = styled.p.attrs<{ className: string }>({
  className: ' text-black',
})``;

export const StepNonActiveTitle = styled.p.attrs<{ className: string }>({
  className: ' text-black/70',
})``;
