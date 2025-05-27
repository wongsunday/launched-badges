import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { GitHubBadge } from '../src/github/GitHubBadge';

describe('GitHubBadge', () => {
  it('renders with count prop', () => {
    render(<GitHubBadge count={42} />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
  });
  
  it('uses light theme by default', () => {
    const { container } = render(<GitHubBadge count={42} />);
    
    // In light theme, expect the badge to have white background
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#FFFFFF');
  });
  
  it('renders with dark theme when specified', () => {
    const { container } = render(<GitHubBadge count={42} theme="dark" />);
    
    // In dark theme, expect the badge to have GitHub's dark background
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#201e1e');
  });
  
  it('displays the GitHub platform name', () => {
    render(<GitHubBadge count={42} />);
    
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders with star icon by default', () => {
    const { container } = render(<GitHubBadge count={42} />);
    
    // The default star icon is an SVG with a path
    const svgs = container.querySelectorAll('svg');
    const starIcon = svgs[2]; // The star icon is the third SVG
    const path = starIcon.querySelector('path');
    expect(path).toBeInTheDocument();

  });
  
  it('renders with likes icon when specified', () => {
    const { container } = render(<GitHubBadge count={42} iconType="likes" />);
    
    // The likes icon is a path containing specific attributes
    const svg = container.querySelectorAll('svg')[2]; // The likes icon is the third SVG
    const path = svg.querySelector('path');
    expect(path).toBeInTheDocument();
  });
  
  it('applies custom width when specified', () => {
    const { container } = render(<GitHubBadge count={42} width={300} />);
    
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('width: 300px');
  });
  
  it('applies custom height when specified', () => {
    const { container } = render(<GitHubBadge count={42} height={100} />);
    
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('height: 100px');
  });
  
  it('displays a custom featured text when provided', () => {
    render(<GitHubBadge count={42} featuredText="TRENDING ON" />);
    
    expect(screen.getByText('TRENDING ON')).toBeInTheDocument();
  });
  
  it('truncates featured text longer than 15 characters', () => {
    render(<GitHubBadge count={42} featuredText="THIS IS A VERY LONG FEATURED TEXT" />);
    
    expect(screen.getByText('THIS IS A VERY')).toBeInTheDocument();
    expect(screen.queryByText('THIS IS A VERY LONG FEATURED TEXT')).not.toBeInTheDocument();
  });
}); 