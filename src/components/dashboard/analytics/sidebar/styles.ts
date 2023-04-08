import styled from 'styled-components';

export const SideBarWrapper = styled.div.attrs({
  className: 'relative flex flex-col gap-4 min-w-[265px]',
})``;

export const SideBarBg = styled.div.attrs({
  className: 'w-full bg-transparent h-full',
})``;

export const SideBarMain = styled.div.attrs({
  className: 'fixed left-6 w-[265px] max-h-[800px] overflow-y-auto',
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

export const AccordionContent = styled.div.attrs({
  className: 'flex gap-1 text-sm text-black/70',
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
