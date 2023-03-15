import styled from 'styled-components';

export const StepsWrapper = styled.div.attrs<{ className: string }>({
  className: 'my-7 px-6 flex justify-between',
})``;

export const StepContainer = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col gap-1 text-center items-center',
})``;

export const StepActive = styled.div.attrs<{ className: string }>({
  className:
    'text-medium text-white bg-primary-orange text-[14px] p-1 rounded-full w-8',
})``;

export const StepNonActive = styled.div.attrs<{ className: string }>({
  className:
    'text-medium text-black text-[14px] p-1 border border-black/10 bg-white/10 rounded-full w-8',
})``;
export const StepActiveTitle = styled.p.attrs<{ className: string }>({
  className: 'text-[16px] leading-6 text-black',
})``;

export const StepNonActiveTitle = styled.p.attrs<{ className: string }>({
  className: 'text-[16px] leading-6 text-black/70',
})``;
