import { Button, OutlineButton } from '@/common';
import * as DutchC from './styles';

const ProfileActions: React.FC = () => {
  return (
    <DutchC.ProfileActionsWrapper>
      <OutlineButton>Delete Account</OutlineButton>
      <DutchC.ProfileActionsRight>
        <OutlineButton>Discard Changes</OutlineButton>
        <Button>Save Changes</Button>
      </DutchC.ProfileActionsRight>
    </DutchC.ProfileActionsWrapper>
  );
};

export default ProfileActions;
