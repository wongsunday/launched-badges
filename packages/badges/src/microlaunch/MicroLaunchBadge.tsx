import React from 'react';
import { SocialBadge, SocialBadgeProps } from '../generic/SocialBadge';

export interface MicroLaunchBadgeProps extends Omit<SocialBadgeProps, 'platformName' | 'colors' | 'logoComponent'> {
    // No special props needed
}

/**
 * MicroLaunch-specific badge component
 */
export const MicroLaunchBadge: React.FC<MicroLaunchBadgeProps> = ({
    iconType = 'upvote',
    theme = 'light',
    ...props
}) => {
    // MicroLaunch-specific colors for light and dark themes
    const microLaunchColors = {
        light: {
            border: '#885EF220',
            text: '#885EF2',
            background: '#FFFFFF',
        },
        dark: {
            border: '#363636',
            text: '#FFFFFF',
            background: '#201e1e',
        },
    };

    // Get the appropriate colors based on the theme
    const colors = theme === 'dark' ? microLaunchColors.dark : microLaunchColors.light;

    // MicroLaunch logo
    const microLaunchLogo = (
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 117 115" fill="none">
            <rect width="117" height="114.911" rx="57.4554" fill="url(#paint0_linear_10_66)" />
            <path d="M63.6719 34.1406H83.2188V70H63.6719V34.1406ZM38.4297 34.1406H57.8711V87.9297H38.4297V34.1406Z" fill="white" />
            <defs>
                <linearGradient id="paint0_linear_10_66" x1="91.5" y1="10.5" x2="30.5" y2="105.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0094FF" />
                    <stop offset="0.51" stopColor="#B741FF" />
                    <stop offset="1" stopColor="#8000FF" />
                </linearGradient>
            </defs>
        </svg>
    );

    // Custom platform name rendering with different colors for Micro and Launch
    const platformNameComponent = (
        <text fontFamily="Helvetica-Bold, Helvetica" fontSize="21" fontWeight="bold">
            <tspan x="62" y="40" fill={theme === 'light' ? '#885EF2' : '#FFFFFF'}>Micro</tspan>
            <tspan fill={theme === 'light' ? '#885EF2' : '#A889F4'}>Launch</tspan>
        </text>
    );

    return (
        <SocialBadge
            {...props}
            platformName="MicroLaunch"
            colors={colors}
            logoComponent={microLaunchLogo}
            iconType={iconType}
            viewBoxWidth={250}
            countGroupX={202}
            theme={theme}
            platformNameComponent={platformNameComponent}
        />
    );
}; 