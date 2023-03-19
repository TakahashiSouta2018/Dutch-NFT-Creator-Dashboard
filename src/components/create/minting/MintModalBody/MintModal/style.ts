import styled from 'styled-components';

export const MintFeeWrapper = styled.div.attrs({
  className: 'flex flex-col gap-6',
})``;

export const MintContentWrapper = styled.div.attrs({
  className:
    'divide-y divide-white/10 py-2 border border-black/10 dark:border-white/10 rounded-lg',
})``;

// ------------- MintFee ---------------- //

export const MintRow = styled.div.attrs({
  className: 'flex justify-between py-2 px-6',
})``;

export const PriceRow = styled.div.attrs({
  className: 'flex gap-6',
})``;

export const DepositRow = styled.div.attrs({
  className: 'flex justify-between relative pl-6',
})``;

export const DepositWalletIcon = styled.div.attrs({
  className: 'absolute left-0 top-0',
})``;

export const DepositCheckIcon = styled.div.attrs({
  className: 'absolute left-2 -top-1 rounded-full bg-white rounded-full',
})``;

export const DepositTitleCol = styled.div.attrs({
  className: 'flex flex-col',
})``;

export const ButtonRow = styled.div.attrs({
  className: 'flex gap-3',
})``;

// ------------------ WalletSignature -------------------- //

export const WalletSignatureWrapper = styled.div.attrs({
  className: 'flex flex-col gap-6',
})``;

export const TransactionTextWrapper = styled.div.attrs({
  className: 'flex gap-1.5',
})``;

export const CancelButtionWrapper = styled.div.attrs({
  className: 'flex justify-end',
})``;

// ------------------- Text Types ------------------- //

export const TextNormal = styled.div.attrs({
  className: 'text-black dark:text-white/100',
})``;

export const TextBold = styled.span.attrs({
  className: 'font-bold text-sm text-black/90 dark:text-white/90',
})``;

export const TextUnderlined = styled.span.attrs({
  className: 'underline cursor-pointer',
})``;

export const TextThin = styled.span.attrs({
  className: 'text-sm text-black/70 dark:text-white',
})``;
