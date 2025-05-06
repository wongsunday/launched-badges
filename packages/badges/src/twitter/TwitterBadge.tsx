import React from 'react';
import { SocialBadge, SocialBadgeProps } from '../generic/SocialBadge';

export interface TwitterBadgeProps extends Omit<SocialBadgeProps, 'platformName' | 'colors' | 'logoComponent'> {
  // No need to redefine iconType, it's inherited from SocialBadgeProps
}

/**
 * Twitter (X)-specific badge component
 */
export const TwitterBadge: React.FC<TwitterBadgeProps> = ({
  iconType = 'likes',
  theme = 'light',
  ...props
}) => {
  // Twitter-specific colors for light and dark themes
  const twitterColors = {
    light: {
      border: '#00000020',
      text: '#000000',
      background: '#FFFFFF',
    },
    dark: {
      border: '#363636',
      text: '#FFFFFF',
      background: '#201e1e',
    },
  };

  // Get the appropriate colors based on the theme
  const colors = theme === 'dark' ? twitterColors.dark : twitterColors.light;

  // Twitter X logo
  const twitterLogo = (
    <svg width="29" height="29" viewBox="0 0 24 24" aria-hidden="true">
      <g>
        <path 
          fill={theme === 'dark' ? '#FFFFFF' : '#000000'} 
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        ></path>
      </g>
    </svg>
  );

  // Custom platform name component that shows "X (Twitter)" with smaller Twitter text
  const customPlatformName = (
    <g>
      <text fontFamily="Helvetica-Bold, Helvetica" fontSize="21" fontWeight="bold" fill={colors.text}>
        <tspan x="62" y="40">X</tspan>
      </text>
      <text fontFamily="Helvetica-Bold, Helvetica" fontSize="11" fill={colors.text} opacity="0.6">
        <tspan x="84" y="38">(</tspan>
      </text>
      <text fontFamily="Helvetica-Bold, Helvetica" fontSize="14" fill={colors.text} opacity={theme === 'dark' ? '0.85' : '0.6'}>
        <tspan x="89" y="40">Twitter</tspan>
      </text>
      <text fontFamily="Helvetica-Bold, Helvetica" fontSize="11" fill={colors.text} opacity="0.6">
        <tspan x="135" y="38">)</tspan>
      </text>
    </g>
  );

  return (
    <SocialBadge
      {...props}
      platformNameComponent={customPlatformName}
      colors={colors}
      logoComponent={twitterLogo}
      iconType={iconType}
      theme={theme}
    />
  );
}; 