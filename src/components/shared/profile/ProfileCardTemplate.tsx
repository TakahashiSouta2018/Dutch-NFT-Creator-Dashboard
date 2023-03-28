import * as DutchC from './styles';

interface ProfileCardTemplateProps {
  title: string;
  children: React.ReactNode;
}

const ProfileCardTemplate: React.FC<ProfileCardTemplateProps> = ({
  title,
  children,
}) => {
  return (
    <DutchC.ProfileCardWrapper>
      <DutchC.ProfileCardTitle>{title}</DutchC.ProfileCardTitle>
      <div>{children}</div>
    </DutchC.ProfileCardWrapper>
  );
};
export default ProfileCardTemplate;
