import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialBadge } from '../src/generic/SocialBadge';

describe('SocialBadge', () => {
  it('renders with count prop', () => {
    render(<SocialBadge count={42} />);
    
    expect(screen.getByText('42')).toBeInTheDocument();
  });
  
  it('renders with platformName prop', () => {
    render(<SocialBadge count={42} platformName="MyPlatform" />);
    
    expect(screen.getByText('MyPlatform')).toBeInTheDocument();
  });
  
  it('renders with light theme by default', () => {
    const { container } = render(<SocialBadge count={42} />);
    
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#FFFFFF');
  });
  
  it('renders with dark theme when specified', () => {
    const { container } = render(<SocialBadge count={42} theme="dark" />);
    
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#201e1e');
  });
  
  it('renders with custom colors when provided', () => {
    const customColors = {
      border: '#123456',
      text: '#abcdef',
      background: '#fedcba'
    };
    
    const { container } = render(
      <SocialBadge count={42} colors={customColors} />
    );
    
    const svg = container.querySelector('svg') as SVGElement;
    const rect = svg.querySelector('rect') as SVGRectElement;
    
    expect(rect).toHaveAttribute('fill', '#fedcba');
    expect(rect).toHaveAttribute('stroke', '#123456');
  });
  
  it('renders with custom width and height', () => {
    const { container } = render(
      <SocialBadge count={42} width={300} height={100} />
    );
    
    const badgeContainer = container.firstChild as HTMLElement;
    expect(badgeContainer).toHaveStyle('width: 300px');
    expect(badgeContainer).toHaveStyle('height: 100px');
  });
  
  it('renders with custom featuredText', () => {
    render(<SocialBadge count={42} featuredText="TRENDING ON" />);
    
    expect(screen.getByText('TRENDING ON')).toBeInTheDocument();
  });
  
  it('truncates featuredText longer than 15 characters', () => {
    render(<SocialBadge count={42} featuredText="THIS IS A VERY LONG FEATURED TEXT" />);
    
    expect(screen.getByText('THIS IS A VERY')).toBeInTheDocument();
    expect(screen.queryByText('THIS IS A VERY LONG FEATURED TEXT')).not.toBeInTheDocument();
  });
  
  it('renders in link mode when displayMode is set to link', () => {
    const { container } = render(
      <SocialBadge count={42} displayMode="link" />
    );
    
    // When in link mode, we should see a visual element for the link icon
    // Let's check for any SVG elements in the link location
    const svg = container.querySelector('svg') as SVGElement;
    
    // Verify link mode is active by checking for a different render structure
    // than the default count display (which would contain count text)
    expect(screen.queryByText('42')).not.toBeInTheDocument();
    
    // The SVG should still exist though
    expect(svg).toBeInTheDocument();
  });
  
  it('does not render count area when displayMode is set to none', () => {
    const { container } = render(
      <SocialBadge count={42} displayMode="none" />
    );
    
    // When displayMode is none, we don't render the count/icon area at all
    const svg = container.querySelector('svg') as SVGElement;
    
    // The viewBox should be adjusted (smaller) when displayMode is none
    expect(svg).toHaveAttribute('viewBox', '0 0 190 54');
  });
  
  it('does not render if count is empty string and displayMode is count', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<SocialBadge count="" displayMode="count" />);
    
    expect(container.firstChild).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith('SocialBadge requires a count prop when displayMode is "count"');
    
    consoleErrorSpy.mockRestore();
  });

  it('renders without a link when linkEnabled is false', () => {
    render(<SocialBadge count={42} linkEnabled={false} />);

    // The badge should render, but not be wrapped in an anchor tag
    const badgeText = screen.getByText('42');
    expect(badgeText).toBeInTheDocument();
    expect(badgeText.closest('a')).toBeNull();
  });

  it('renders the default logo if logoComponent is not provided', () => {
    const { container } = render(<SocialBadge count={42} />);

    // Look for the default logo structure (circle + text)
    const svg = container.querySelector('svg') as SVGElement;
    const circle = svg.querySelector('circle');
    const text = svg.querySelector('text'); // Look for any text element within the main SVG

    // The default logo uses a circle and a text element for the initial
    expect(circle).toBeInTheDocument();
    // Check if *any* text element exists, as the default logo text is rendered inside <text>
    expect(text).toBeInTheDocument(); 
  });

  it('renders as a link when linkUrl is provided and linkEnabled is true', () => {
    const testUrl = 'https://example.com/social';
    render(<SocialBadge count={42} linkUrl={testUrl} linkEnabled={true} />);

    // Find an element within the badge
    const badgeText = screen.getByText('42');
    expect(badgeText).toBeInTheDocument();

    // Check if it's wrapped in an anchor tag with the correct href
    const linkElement = badgeText.closest('a');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', testUrl);
    expect(linkElement).toHaveAttribute('target', '_blank'); // Assuming default target is _blank
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer'); // Assuming default rel
  });
}); 