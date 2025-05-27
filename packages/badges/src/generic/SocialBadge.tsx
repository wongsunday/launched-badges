import React from 'react';

export interface SocialBadgeProps {
  /**
   * The count to display (likes, upvotes, etc)
   * Can be a number or formatted string like "10.5k", "1.2k", "10+"
   * Maximum 6 characters
   */
  count?: number | string;
  /**
   * The theme of the badge
   * @default "light"
   */
  theme?: 'light' | 'dark' | string;
  /**
   * The width of the SVG
   */
  width?: number;
  /**
   * The height of the SVG
   */
  height?: number;
  /**
   * Custom text for the "featured on" line (max 15 characters)
   * @default "FEATURED ON"
   */
  featuredText?: string;
  /**
   * The platform name to display
   * @default "Social"
   */
  platformName?: string;
  /**
   * Custom SVG component to render the platform name (overrides platformName)
   */
  platformNameComponent?: React.ReactNode;
  /**
   * Whether to wrap the badge in a link to the platform
   * @default true
   */
  linkEnabled?: boolean;
  /**
   * The URL to link to when clicked
   */
  linkUrl?: string;
  /**
   * What to display in the badge (count, link icon, or nothing)
   * @default "count"
   */
  displayMode?: 'count' | 'link' | 'none';
  /**
   * The icon type to display with the count
   * @default "upvote"
   */
  iconType?: 'upvote' | 'upvote-arrow' | 'likes' | 'followers' | 'star';
  /**
   * Colors for the badge elements
   */
  colors?: {
    border?: string;
    text?: string;
    background?: string;
  };
  /**
   * Custom component to use as the logo
   */
  logoComponent?: React.ReactNode;
  /**
   * Override default SVG viewBox width
   */
  viewBoxWidth?: number;
  /**
   * X position for the count/icon group
   */
  countGroupX?: number;
}

/**
 * A generic SVG badge component that can be extended for different social platforms
 */
export const SocialBadge: React.FC<SocialBadgeProps> = ({
  count = 0,
  theme = 'light',
  width,
  height,
  featuredText = 'FEATURED ON',
  platformName = 'Social',
  platformNameComponent,
  linkEnabled = true,
  linkUrl,
  displayMode = 'count',
  iconType = 'upvote',
  colors,
  logoComponent,
  viewBoxWidth = 220,
  countGroupX = 172,
}) => {
  // Limit featuredText to 15 characters
  const limitedFeaturedText = featuredText.substring(0, 15);

  // Format and limit count to max 6 characters
  const formattedCount = typeof count === 'string' 
    ? count.substring(0, 6) 
    : count.toString();

  if (displayMode === 'count' && (count === '')) {
    console.error('SocialBadge requires a count prop when displayMode is "count"');
    return null;
  }

  // Theme-dependent styling
  const defaultColors = {
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

  const themeColors = typeof theme === 'string' && (theme in defaultColors) 
    ? defaultColors[theme as keyof typeof defaultColors]
    : defaultColors.light;

  const borderColor = colors?.border || themeColors.border;
  const textColor = colors?.text || themeColors.text;
  const bgColor = colors?.background || themeColors.background;
  const borderRadius = 16; // Equivalent to rounded-2xl
  
  // Adjust viewBox width if nothing is displayed
  const adjustedViewBoxWidth = displayMode === 'none' ? viewBoxWidth - 30 : viewBoxWidth;
  const defaultWidth = adjustedViewBoxWidth;
  
  // Calculate x position based on string length
  const getCountXPosition = (countText: string): number => {
    const length = countText.length;
    return 16.5 - (3.3 * (length - 1));
  };

  // Container style based on props
  const containerStyle: React.CSSProperties = {};
  
  // Logic for width/height
  // If both width/height not specified: width 220
  if (!width && !height) {
    containerStyle.width = `${defaultWidth}px`;
  }
  // If width specified: take width
  else if (width) {
    containerStyle.width = `${width}px`;
  }
  // If only height specified: take height
  else if (height && !width) {
    containerStyle.height = `${height}px`;
  }
  
  // Add height if both are specified
  if (width && height) {
    containerStyle.height = `${height}px`;
  }

  // Default render for upvote icon
  const renderDefaultIcon = () => {
    switch (iconType) {
      case 'upvote-arrow':
        return (
          <svg x="13.5" y="-2" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="3" stroke={textColor} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 7-7 7 7"/>
            <path d="M12 19V5"/>
          </svg>
        );
      case 'likes':
        return (
          <svg x="14.5" y="-1" width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke={textColor} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v12"/>
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>
          </svg>
        );
      case 'followers':
        return (
          <svg x="14.5" y="-1" width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke={textColor} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      case 'star':
        return (
          <svg x="14.5" y="-1" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
          </svg>
        );
      case 'upvote':
      default:
        return (
          <polygon points="26.0024997 10 15 10 20.5012498 0" fill={textColor} />
        );
    }
  };

  // Render link icon
  const renderLinkIcon = () => {
    return (
      <svg x="12" y="6" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>
        <path d="m21 3-9 9"/>
        <path d="M15 3h6v6"/>
      </svg>
    );
  };

  // Default placeholder logo
  const renderDefaultLogo = () => (
    <svg x="0" y="0" width="29" height="29" viewBox="0 0 29 29" fill={textColor}>
      <circle cx="14.5" cy="14.5" r="12.5" stroke={textColor} strokeWidth="2" fill="none" />
      <text x="10" y="20" fontFamily="Helvetica" fontSize="14" fontWeight="bold">{platformName.substring(0, 1)}</text>
    </svg>
  );

  const badgeContent = (
    <div style={containerStyle}>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${adjustedViewBoxWidth} 54`} version="1.1">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-130.000000, -73.000000)">
            <g transform="translate(130.000000, 73.000000)">
              <rect stroke={borderColor} strokeWidth="1" fill={bgColor} x="0.5" y="0.5" width={adjustedViewBoxWidth - 1} height="53" rx={borderRadius} />
              <text fontFamily="Helvetica-Bold, Helvetica" fontSize="9" fontWeight="bold" fill={textColor}>
                <tspan x="63" y="20">{limitedFeaturedText}</tspan>
              </text>
              {platformNameComponent ? platformNameComponent : (
                <text fontFamily="Helvetica-Bold, Helvetica" fontSize="21" fontWeight="bold" fill={textColor}>
                  <tspan x="62" y="40">{platformName}</tspan>
                </text>
              )}
              {displayMode === 'count' && (
                <g transform={`translate(${countGroupX}, 13)`} fill={textColor}>
                  <g>
                    {renderDefaultIcon()}
                    <text fontFamily="Helvetica-Bold, Helvetica" fontSize="13" fontWeight="bold" style={{ lineHeight: "20px" }}>
                      <tspan x={getCountXPosition(formattedCount)} y="27">{formattedCount}</tspan>
                    </text>
                  </g>
                </g>
              )}
              {displayMode === 'link' && (
                <g transform={`translate(${countGroupX}, 13)`} fill={textColor}>
                  <g>
                    {renderLinkIcon()}
                  </g>
                </g>
              )}

              <g transform="translate(18.000000, 12.000000)">
                {logoComponent || renderDefaultLogo()}
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );

  // Return the badge wrapped in a link if linkEnabled and linkUrl is provided
  if (linkEnabled && linkUrl) {
    return (
      <a 
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'inline-block' }}
      >
        {badgeContent}
      </a>
    );
  }

  // Otherwise, return just the badge
  return badgeContent;
}; 