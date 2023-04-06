import styled from 'styled-components';

export const SideBarWrapper = styled.div.attrs({
  className: 'flex flex-col gap-4 w-[265px]',
})``;

export const SideBarHeader = styled.div.attrs({
  className: 'flex gap-4',
})``;

export const SideBarHeaderText = styled.div.attrs({
  className: 'text-2xl font-bold',
})``;

export const SideBarHeaderDropdown = styled.div.attrs({
  className: 'border rounded-lg border-black/10 w-full',
})``;

export const SideBarBody = styled.div.attrs({
  className: 'border rounded-lg border-black/10 w-full divide-y pb-2',
})``;

export const CurrencySelect = styled.div.attrs({
  className: 'py-2',
})``;

export const TrackWrapper = styled.div.attrs({
  className: 'py-2 px-4 flex flex-col gap-2',
})``;

export const TrackSwitchWrapper = styled.div.attrs({
  className: 'flex gap-1',
})``;

export const TrackListWrapper = styled.div.attrs({
  className: 'pb-2 flex flex-col gap-2',
})``;

export const DownloadFullReport = styled.div.attrs({
  className: 'py-2 px-4 flex flex-col',
})``;
