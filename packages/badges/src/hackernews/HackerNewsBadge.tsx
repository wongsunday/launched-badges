import React from 'react';
import { SocialBadge, SocialBadgeProps } from '../generic/SocialBadge';

export interface HackerNewsBadgeProps extends Omit<SocialBadgeProps, 'platformName' | 'colors' | 'logoComponent'> {
  // No need to redefine iconType, it's inherited from SocialBadgeProps
}

/**
 * HackerNews-specific badge component
 */
export const HackerNewsBadge: React.FC<HackerNewsBadgeProps> = ({
  iconType = 'upvote',
  theme = 'light',
  ...props
}) => {
  // HackerNews-specific colors for light and dark themes
  const hnColors = {
    light: {
      border: '#FF660020',
      text: '#FF6600',
      background: '#FFFFFF',
    },
    dark: {
      border: '#363636',
      text: '#FFFFFF',
      background: '#201e1e',
    },
  };

  // Get the appropriate colors based on the theme
  const colors = theme === 'dark' ? hnColors.dark : hnColors.light;

  // HackerNews logo
  const hnLogo = (
    <svg width="29" height="29" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="15%" fill="#f60"/>
      <path fill="#ffffff" d="M124 91h51l81 162 81-164h51L276 293v136h-40V293z"/>
    </svg>
  );

  return (
    <SocialBadge
      {...props}
      platformName="Hacker News"
      colors={colors}
      logoComponent={hnLogo}
      iconType={iconType}
      viewBoxWidth={250}
      countGroupX={202}
      theme={theme}
    />
  );
}; 