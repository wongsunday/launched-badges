import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkedInBadge } from '../src/linkedin/LinkedInBadge';

describe('LinkedInBadge', () => {
  it('renders with count prop', () => {
    render(<LinkedInBadge count={42} />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
  });
  
  it('uses light theme by default', () => {
    const { container } = render(<LinkedInBadge count={42} />);
    
    // In light theme, expect the badge to have LinkedIn's light blue color
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#FFFFFF');
  });
  
  it('renders with dark theme when specified', () => {
    const { container } = render(<LinkedInBadge count={42} theme="dark" />);
    
    // In dark theme, expect the badge to have dark background
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#1E2226');
  });
  
  it('displays the LinkedIn platform name', () => {
    render(<LinkedInBadge count={42} />);
    
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('renders with likes icon by default', () => {
    const { container } = render(<LinkedInBadge count={42} />);
    
    // The default likes icon is a polygon
    const svgIcon = container.querySelectorAll('svg')[2]; // The icon SVG
    const paths = svgIcon.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0); 
  });
  
  it('renders with likes icon when specified', () => {
    const { container } = render(<LinkedInBadge count={42} iconType="likes" />);
    
    // The likes icon is a path containing specific attributes
    const svg = container.querySelectorAll('svg')[2]; // The likes icon is the third SVG
    const path = svg.querySelector('path');
    expect(path).toBeInTheDocument();
  });
  
  it('applies custom width when specified', () => {
    const { container } = render(<LinkedInBadge count={42} width={300} />);
    
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('width: 300px');
  });
  
  it('applies custom height when specified', () => {
    const { container } = render(<LinkedInBadge count={42} height={100} />);
    
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('height: 100px');
  });
  
  it('displays a custom featured text when provided', () => {
    render(<LinkedInBadge count={42} featuredText="TRENDING ON" />);
    
    expect(screen.getByText('TRENDING ON')).toBeInTheDocument();
  });
  
  it('truncates featured text longer than 15 characters', () => {
    render(<LinkedInBadge count={42} featuredText="THIS IS A VERY LONG FEATURED TEXT" />);
    
    expect(screen.getByText('THIS IS A VERY')).toBeInTheDocument();
    expect(screen.queryByText('THIS IS A VERY LONG FEATURED TEXT')).not.toBeInTheDocument();
  });
}); 