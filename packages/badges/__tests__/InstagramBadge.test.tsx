import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InstagramBadge } from '../src/instagram/InstagramBadge';
import * as mockHooks from '../src/mockHooks';

// Mock the useMockInstagramCount hook
vi.mock('../src/mockHooks', () => ({
  useMockInstagramCount: vi.fn().mockReturnValue(9876),
}));

describe('InstagramBadge', () => {
  it('renders with count prop', () => {
    render(<InstagramBadge count={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('uses light theme by default', () => {
    const { container } = render(<InstagramBadge count={42} />);
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    expect(rect).toHaveAttribute('fill', '#FFFFFF');
  });

  it('renders with dark theme when specified', () => {
    const { container } = render(<InstagramBadge count={42} theme="dark" />);
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    expect(rect).toHaveAttribute('fill', '#201e1e');
  });

  it('displays the Instagram platform name', () => {
    render(<InstagramBadge count={42} />);
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });

  it('renders with likes icon by default', () => {
    const { container } = render(<InstagramBadge count={42} />);
    const svgIcon = container.querySelectorAll('svg')[2]; // The icon SVG
    const paths = svgIcon.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0); 
  });

  it('renders with followers icon when specified', () => {
    const { container } = render(<InstagramBadge count={42} iconType="followers" />);
    const svgIcon = container.querySelectorAll('svg')[2]; // The icon SVG
    const paths = svgIcon.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0); 
  });

  it('applies custom width when specified', () => {
    const { container } = render(<InstagramBadge count={42} width={300} />);
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('width: 300px');
  });

  it('applies custom height when specified', () => {
    const { container } = render(<InstagramBadge count={42} height={100} />);
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('height: 100px');
  });

  it('displays a custom featured text when provided', () => {
    render(<InstagramBadge count={42} featuredText="CHECK US OUT ON" />);
    expect(screen.getByText('CHECK US OUT ON')).toBeInTheDocument();
  });

  it('truncates featured text longer than 15 characters', () => {
    render(<InstagramBadge count={42} featuredText="THIS IS A VERY LONG FEATURED TEXT" />);
    expect(screen.getByText('THIS IS A VERY')).toBeInTheDocument();
    expect(screen.queryByText('THIS IS A VERY LONG FEATURED TEXT')).not.toBeInTheDocument();
  });
}); 