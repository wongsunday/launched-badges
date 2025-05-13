import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MicroLaunchBadge } from '../src/microlaunch/MicroLaunchBadge';


describe('MicroLaunchBadge', () => {
  it('renders with count prop', () => {
    render(<MicroLaunchBadge count={567} />);
    
    expect(screen.getByText('567')).toBeInTheDocument();
  });
  
  it('uses light theme by default', () => {
    const { container } = render(<MicroLaunchBadge count={567} />);
    
    // In light theme, expect the badge to have MicroLaunch's light theme background
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#FFFFFF');
  });
  
  it('renders with dark theme when specified', () => {
    const { container } = render(<MicroLaunchBadge count={567} theme="dark" />);
    
    // In dark theme, expect the badge to have dark background
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#201e1e');
  });
  
  it('displays the MicroLaunch platform name', () => {
    render(<MicroLaunchBadge count={567} />);
    
    // Since MicroLaunch uses a custom platformNameComponent with tspans, we need to check differently
    const { container } = render(<MicroLaunchBadge count={567} />);
    const tspans = container.querySelectorAll('tspan');
    
    // Check if at least one of the tspans contains "Micro" and one contains "Launch"
    const textContents = Array.from(tspans).map(tspan => tspan.textContent);
    expect(textContents.some(text => text === 'Micro')).toBeTruthy();
    expect(textContents.some(text => text === 'Launch')).toBeTruthy();
  });

  it('renders with upvote icon by default', () => {
    const { container } = render(<MicroLaunchBadge count={567} />);
    
    // The default upvote icon is a polygon
    const polygon = container.querySelector('polygon');
    expect(polygon).toBeInTheDocument();
  });
  
  it('renders with likes icon when specified', () => {
    const { container } = render(<MicroLaunchBadge count={567} iconType="likes" />);
    
    // The likes icon is a path containing specific attributes
    const svg = container.querySelectorAll('svg')[2]; // The likes icon is the third SVG
    const path = svg.querySelector('path');
    expect(path).toBeInTheDocument();
  });
  
  it('applies custom width when specified', () => {
    const { container } = render(<MicroLaunchBadge count={567} width={300} />);
    
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('width: 300px');
  });
  
  it('applies custom height when specified', () => {
    const { container } = render(<MicroLaunchBadge count={567} height={100} />);
    
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('height: 100px');
  });
  
  it('displays a custom featured text when provided', () => {
    render(<MicroLaunchBadge count={567} featuredText="TRENDING ON" />);
    
    expect(screen.getByText('TRENDING ON')).toBeInTheDocument();
  });
  
  it('truncates featured text longer than 15 characters', () => {
    render(<MicroLaunchBadge count={567} featuredText="THIS IS A VERY LONG FEATURED TEXT" />);
    
    expect(screen.getByText('THIS IS A VERY')).toBeInTheDocument();
    expect(screen.queryByText('THIS IS A VERY LONG FEATURED TEXT')).not.toBeInTheDocument();
  });
  
  it('renders with different colors in light and dark themes', () => {
    // Light theme test
    const { container: lightContainer } = render(<MicroLaunchBadge count={567} theme="light" />);
    const lightSvg = lightContainer.querySelector('svg') as SVGElement;
    const lightRect = lightSvg.querySelector('rect') as SVGRectElement;
    
    // Dark theme test
    const { container: darkContainer } = render(<MicroLaunchBadge count={567} theme="dark" />);
    const darkSvg = darkContainer.querySelector('svg') as SVGElement;
    const darkRect = darkSvg.querySelector('rect') as SVGRectElement;
    
    // Verify different colors are used
    expect(lightRect.getAttribute('fill')).not.toBe(darkRect.getAttribute('fill'));
  });
}); 