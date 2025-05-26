import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { HackerNewsBadge } from '../src/hackernews/HackerNewsBadge';

describe('HackerNewsBadge', () => {
  it('renders with count prop', () => {
    render(<HackerNewsBadge count={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('uses light theme by default', () => {
    const { container } = render(<HackerNewsBadge count={42} />);
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    expect(rect).toHaveAttribute('fill', '#FFFFFF');
  });

  it('renders with dark theme when specified', () => {
    const { container } = render(<HackerNewsBadge count={42} theme="dark" />);
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    expect(rect).toHaveAttribute('fill', '#201e1e');
  });

  it('displays the Hacker News platform name', () => {
    render(<HackerNewsBadge count={42} />);
    expect(screen.getByText('Hacker News')).toBeInTheDocument();
  });

  it('renders with upvote icon by default', () => {
    const { container } = render(<HackerNewsBadge count={42} />);
    const polygon = container.querySelector('polygon');
    expect(polygon).toBeInTheDocument();
  });

  it('renders with upvote-arrow icon when specified', () => {
    const { container } = render(<HackerNewsBadge count={42} iconType="upvote-arrow" />);
    const svgIcon = container.querySelectorAll('svg')[2]; // The icon SVG
    const paths = svgIcon.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0); 
  });

  it('applies custom width when specified', () => {
    const { container } = render(<HackerNewsBadge count={42} width={300} />);
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('width: 300px');
  });

  it('applies custom height when specified', () => {
    const { container } = render(<HackerNewsBadge count={42} height={100} />);
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('height: 100px');
  });

  it('displays a custom featured text when provided', () => {
    render(<HackerNewsBadge count={42} featuredText="TOP STORY" />);
    expect(screen.getByText('TOP STORY')).toBeInTheDocument();
  });

  it('truncates featured text longer than 15 characters', () => {
    render(<HackerNewsBadge count={42} featuredText="THIS IS A VERY LONG FEATURED TEXT" />);
    expect(screen.getByText('THIS IS A VERY')).toBeInTheDocument();
    expect(screen.queryByText('THIS IS A VERY LONG FEATURED TEXT')).not.toBeInTheDocument();
  });
}); 