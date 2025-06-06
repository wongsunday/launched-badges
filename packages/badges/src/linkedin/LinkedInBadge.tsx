import React from 'react';
import { SocialBadge, SocialBadgeProps } from '../generic/SocialBadge';

export interface LinkedInBadgeProps extends Omit<SocialBadgeProps, 'platformName' | 'colors' | 'logoComponent'> {
  // No need to redefine iconType, it's inherited from SocialBadgeProps
}

/**
 * LinkedIn-specific badge component
 */
export const LinkedInBadge: React.FC<LinkedInBadgeProps> = ({
  iconType = 'likes',
  theme = 'light',
  ...props
}) => {
  // LinkedIn-specific colors for light and dark themes
  const linkedInColors = {
    light: {
      border: '#0077B520',
      text: '#0077B5',
      background: '#FFFFFF',
    },
    dark: {
      border: '#363636',
      text: '#FFFFFF',
      background: '#201e1e',
    },
  };

  // Get the appropriate colors based on the theme
  const colors = theme === 'dark' ? linkedInColors.dark : linkedInColors.light;

    // LinkedIn logo with theme-specific fills
  const logoFills = theme === 'light' 
    ? { rect: '#FFF', path: '#0077B5' }
    : { rect: 'none', path: 'rgba(255,255,255,90)' };

  const linkedInLogo = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="30" height="30" focusable="false">
      <g transform="scale(.7083)" fill="none" fillRule="evenodd">
        <rect fill={logoFills.rect} x="1" y="1" width="46" height="46" rx="4"></rect>
        <path d="M0 4.01A4.01 4.01 0 014.01 0h39.98A4.01 4.01 0 0148 4.01v39.98A4.01 4.01 0 0143.99 48H4.01A4.01 4.01 0 010 43.99V4.01zM19 18.3h6.5v3.266C26.437 19.688 28.838 18 32.445 18 39.359 18 41 21.738 41 28.597V41.3h-7V30.159c0-3.906-.937-6.109-3.32-6.109-3.305 0-4.68 2.375-4.68 6.109V41.3h-7v-23zM7 41h7V18H7v23zm8-30.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" fill={logoFills.path}></path>
      </g>
    </svg>
  );

  return (
    <SocialBadge
      {...props}
      platformName="LinkedIn"
      colors={colors}
      logoComponent={linkedInLogo}
      iconType={iconType}
      viewBoxWidth={250}
      countGroupX={202}
      theme={theme}
    />
  );
}; 