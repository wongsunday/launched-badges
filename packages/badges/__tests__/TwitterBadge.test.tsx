import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { TwitterBadge } from '../src/twitter/TwitterBadge';

describe('TwitterBadge', () => {
  it('renders with count prop', () => {
    render(<TwitterBadge count={1500} />);
    expect(screen.getByText('1500')).toBeInTheDocument();
  });

  it('uses light theme by default', () => {
    const { container } = render(<TwitterBadge count={1500} />);
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    expect(rect).toHaveAttribute('fill', '#FFFFFF');
  });

  it('renders with dark theme when specified', () => {
    const { container } = render(<TwitterBadge count={1500} theme="dark" />);
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    expect(rect).toHaveAttribute('fill', '#201e1e');
  });

  it('displays the Twitter platform name', () => {
    render(<TwitterBadge count={1500} />);
    expect(screen.getByText('Twitter')).toBeInTheDocument();
  });

  it('renders with likes icon by default', () => {
    const { container } = render(<TwitterBadge count={1500} />);
    const svgIcon = container.querySelectorAll('svg')[2]; // The icon SVG
    const paths = svgIcon.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0); 
  });

  it('renders with followers icon when specified', () => {
    const { container } = render(<TwitterBadge count={1500} iconType="followers" />);
    const svgIcon = container.querySelectorAll('svg')[2]; // The icon SVG
    const paths = svgIcon.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0); 
  });

  it('applies custom width when specified', () => {
    const { container } = render(<TwitterBadge count={1500} width={300} />);
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('width: 300px');
  });

  it('applies custom height when specified', () => {
    const { container } = render(<TwitterBadge count={1500} height={100} />);
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('height: 100px');
  });

  it('displays a custom featured text when provided', () => {
    render(<TwitterBadge count={1500} featuredText="FOLLOW US ON" />);
    expect(screen.getByText('FOLLOW US ON')).toBeInTheDocument();
  });

  it('truncates featured text longer than 15 characters', () => {
    render(<TwitterBadge count={1500} featuredText="THIS IS A VERY LONG FEATURED TEXT" />);
    expect(screen.getByText('THIS IS A VERY')).toBeInTheDocument();
    expect(screen.queryByText('THIS IS A VERY LONG FEATURED TEXT')).not.toBeInTheDocument();
  });
}); 