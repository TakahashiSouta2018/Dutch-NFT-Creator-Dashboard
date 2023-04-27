import React from 'react';
import { useTheme } from 'next-themes';
import DiscordIcon from '../../assets/social/discord_solid.svg';
import TwitterIcon from '../../assets/social/twitter_solid.svg';
import InstagramIcon from '../../assets/social/instagram_solid.svg';
import LinkedinIcon from '../../assets/social/linkedin_solid.svg';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <div className="absolute bottom-0 w-full flex justify-between mt-4 px-6 py-3 border border-black/10 dark:border-white/10">
      <div className="text-sm">© Rarible, Inc.</div>
      <div className="flex gap-6 items-center">
        <DiscordIcon currentColor={theme === 'dark' ? 'white' : 'black'} />
        <InstagramIcon currentColor={theme === 'dark' ? 'white' : 'black'} />
        <TwitterIcon currentColor={theme === 'dark' ? 'white' : 'black'} />
        <LinkedinIcon currentColor={theme === 'dark' ? 'white' : 'black'} />
      </div>
      <div className="flex gap-8">
        <p>Terms</p>
        <p>Privacy policy</p>
      </div>
    </div>
  );
};

export default Footer;
