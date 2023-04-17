import styled from 'styled-components';

export const WalletTrackingWrapper = styled.div.attrs({
  className: 'flex flex-col gap-6',
})``;

export const WalletTrackingContainer = styled.div.attrs<{ className: string }>({
  className: 'flex flex-col gap-4',
})``;

export const WalletTrackingHoldings = styled.div.attrs({
  className: 'flex gap-6 w-full justify-between',
})``;

export const WalletTrackingUnitWrapper = styled.div.attrs<{
  className: string;
}>({
  className: 'flex flex-col gap-2',
})``;

export const DaySwitchWrapper = styled.div.attrs({
  className:
    'flex divide-x divide-black/10 dark:divide-white/10 border border-black/10 dark:border-white/10 rounded-lg',
})``;

export const ContentOverviewCards = styled.div.attrs({
  className: 'flex',
})``;

export const GasFeeChartWrapper = styled.div.attrs({
  className: 'border border-black/10 dark:border-white/10 rounded-lg p-3',
})``;
