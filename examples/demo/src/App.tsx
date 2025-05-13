import { useState } from 'react';
import { 
  LovableBadge, 
  RedditBadge, 
  HackerNewsBadge, 
  FacebookBadge, 
  InstagramBadge,
  TwitterBadge,
  MicroLaunchBadge,
  SocialBadge 
} from '@sundaywong/launched-badges';

type SizeMode = 'width' | 'height';
type IconType = 'upvote' | 'upvote-arrow' | 'likes' | 'followers';
type DisplayMode = 'count' | 'link' | 'none';
type Platform = 'lovable' | 'reddit' | 'hackernews' | 'facebook' | 'instagram' | 'twitter' | 'microlaunch' | 'generic';

function App() {
  const [platform, setPlatform] = useState<Platform>('lovable');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [linkUrl, setLinkUrl] = useState('https://launched.lovable.dev/<project-slug>');
  const [sizeMode, setSizeMode] = useState<SizeMode>('width');
  const [svgWidth, setSvgWidth] = useState(250);
  const [svgHeight, setSvgHeight] = useState(54);
  const [featuredText, setFeaturedText] = useState('FEATURED ON');
  const [linkEnabled, setLinkEnabled] = useState(true);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('count');
  const [count, setCount] = useState<number | string>(11);
  const [formattedCount, setFormattedCount] = useState<boolean>(false);
  const [iconType, setIconType] = useState<IconType>('upvote');
  const [platformName, setPlatformName] = useState('Social');

  // Platform-specific suggested URLs
  const platformDefaultUrls: Record<Platform, string> = {
    lovable: 'https://launched.lovable.dev/<project-slug>',
    reddit: 'https://reddit.com/...',
    hackernews: 'https://news.ycombinator.com/item?id=<post-id>',
    facebook: 'https://facebook.com/...',
    instagram: 'https://instagram.com/...',
    twitter: 'https://x.com/...',
    microlaunch: 'https://microlaunch.net/p/<project-slug>',
    generic: 'https://example.com/demo-project'
  };

  // Platform-specific default icon types
  const defaultIconTypes: Record<Platform, IconType> = {
    lovable: 'upvote',
    reddit: 'upvote',
    hackernews: 'upvote',
    facebook: 'likes',
    instagram: 'likes',
    twitter: 'likes',
    microlaunch: 'upvote',
    generic: 'upvote'
  };

  // Update URL and icon type when platform changes
  const handlePlatformChange = (newPlatform: Platform) => {
    setPlatform(newPlatform);
    setLinkUrl(platformDefaultUrls[newPlatform]);
    setIconType(defaultIconTypes[newPlatform]);
  };

  // Determine which props to pass based on size mode
  const getSizeProps = () => {
    switch (sizeMode) {
      case 'width':
        return { width: svgWidth };
      case 'height':
        return { height: svgHeight };
    }
  };

  // Handle count change, toggle between formatted and numeric
  const handleCountChange = (value: string) => {
    if (formattedCount) {
      // If in formatted mode, store as string
      setCount(value.substring(0, 6)); // Limit to 6 chars max
    } else {
      // If in numeric mode, parse as number
      const numValue = parseInt(value, 10);
      setCount(isNaN(numValue) ? 0 : numValue);
    }
  };

  // Render the selected badge component
  const renderBadge = () => {
    const commonProps = {
      theme,
      count,
      featuredText,
      linkEnabled,
      linkUrl,
      displayMode,
      iconType,
      ...getSizeProps()
    };

    switch (platform) {
      case 'lovable':
        return <LovableBadge {...commonProps} />;
      case 'reddit':
        return <RedditBadge {...commonProps} />;
      case 'hackernews':
        return <HackerNewsBadge {...commonProps} />;
      case 'facebook':
        return <FacebookBadge {...commonProps} />;
      case 'instagram':
        return <InstagramBadge {...commonProps} />;
      case 'twitter':
        return <TwitterBadge {...commonProps} />;
      case 'microlaunch':
        return <MicroLaunchBadge {...commonProps} />;
      case 'generic':
        return <SocialBadge platformName={platformName} {...commonProps} />;
    }
  };

  // Generate the usage example code
  const generateUsageCode = () => {
    const componentName = platform.charAt(0).toUpperCase() + platform.slice(1) + 'Badge';
    const props = [
      `linkUrl="${linkUrl}"`,
      `theme="${theme}"`
    ];

    if (sizeMode === 'width') props.push(`width={${svgWidth}}`);
    if (sizeMode === 'height') props.push(`height={${svgHeight}}`);
    
    // Handle count based on formatted or numeric
    if (displayMode === 'count') {
      if (typeof count === 'string') {
        props.push(`count="${count}"`);
      } else if (count !== 11) {
        props.push(`count={${count}}`);
      }
    }
    
    if (featuredText !== 'FEATURED ON') props.push(`featuredText="${featuredText}"`);
    if (!linkEnabled) props.push('linkEnabled={false}');
    if (displayMode !== 'count') props.push(`displayMode="${displayMode}"`);
    
    // Only include iconType if it's not the default for the current platform
    if (displayMode === 'count' && iconType !== defaultIconTypes[platform]) {
      props.push(`iconType="${iconType}"`);
    }

    // Add platformName for generic badge
    if (platform === 'generic' && platformName !== 'Social') {
      props.push(`platformName="${platformName}"`);
    }

    return `import { ${componentName} } from '@sundaywong/launched-badges';

<${componentName} 
  ${props.join('\n  ')}
/>`;
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Social Media Badges Demo</h1>
          <p className="text-gray-600 mt-2">
            Customizable social media badges for your React projects
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Badge Preview</h2>
          
          <div className="p-8 flex flex-col items-center justify-center border rounded-lg bg-gray-50">
            {renderBadge()}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Customization</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                <button
                  type="button"
                  onClick={() => handlePlatformChange('lovable')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'lovable'
                      ? 'bg-lovable-primary text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Lovable
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange('reddit')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'reddit'
                      ? 'bg-red-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Reddit
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange('hackernews')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'hackernews'
                      ? 'bg-orange-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Hacker News
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange('facebook')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'facebook'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange('instagram')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'instagram'
                      ? 'bg-pink-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange('twitter')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'twitter'
                      ? 'bg-black text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  X (Twitter)
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange('microlaunch')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'microlaunch'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  MicroLaunch
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformChange('generic')}
                  className={`px-3 py-2 rounded-md ${
                    platform === 'generic'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Generic
                </button>
              </div>
            </div>

            {platform === 'generic' && (
              <div>
                <label htmlFor="platformName" className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  id="platformName"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="linkUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Link URL
              </label>
              <input
                type="url"
                id="linkUrl"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                The URL to link to when the badge is clicked
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Mode</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDisplayMode('count')}
                  className={`px-3 py-2 rounded-md ${
                    displayMode === 'count'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Show Count
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('link')}
                  className={`px-3 py-2 rounded-md ${
                    displayMode === 'link'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Show Link Icon
                </button>
                <button
                  type="button"
                  onClick={() => setDisplayMode('none')}
                  className={`px-3 py-2 rounded-md ${
                    displayMode === 'none'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Show Nothing
                </button>
              </div>
            </div>
            
            {displayMode === 'count' && (
              <>
                <div>
                  <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-1">
                    Count
                  </label>
                  <div className="flex space-x-4 items-center">
                    <div className="flex-1">
                      {formattedCount ? (
                        <input
                          type="text"
                          id="count"
                          value={count.toString()}
                          onChange={(e) => handleCountChange(e.target.value)}
                          maxLength={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="e.g., 10.5k, 1.2k, 10+"
                        />
                      ) : (
                        <input
                          type="number"
                          id="count"
                          value={count.toString()}
                          onChange={(e) => handleCountChange(e.target.value)}
                          min={0}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      )}
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormattedCount(!formattedCount);
                          // Convert between formats when toggling
                          if (formattedCount && typeof count === 'string') {
                            const parsed = parseInt(count, 10);
                            if (!isNaN(parsed)) setCount(parsed);
                            else setCount(0);
                          } else if (!formattedCount && typeof count === 'number') {
                            setCount(count.toString());
                          }
                        }}
                        className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        {formattedCount ? "Number" : "Formatted"}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {formattedCount ? "Enter formatted text (e.g., 10.5k, 1.2k, 10+)" : "Enter numeric value"}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIconType('upvote')}
                      className={`px-3 py-2 rounded-md ${
                        iconType === 'upvote'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                    >
                      Upvote
                    </button>
                    <button
                      type="button"
                      onClick={() => setIconType('upvote-arrow')}
                      className={`px-3 py-2 rounded-md ${
                        iconType === 'upvote-arrow'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                    >
                      Upvote Arrow
                    </button>
                    <button
                      type="button"
                      onClick={() => setIconType('likes')}
                      className={`px-3 py-2 rounded-md ${
                        iconType === 'likes'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                    >
                      Likes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIconType('followers')}
                      className={`px-3 py-2 rounded-md ${
                        iconType === 'followers'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                    >
                      Followers
                    </button>
                  </div>
                </div>
              </>
            )}
            
            <div>
              <label htmlFor="featuredText" className="block text-sm font-medium text-gray-700 mb-1">
                Featured Text (Max 15 chars)
              </label>
              <input
                type="text"
                id="featuredText"
                value={featuredText}
                onChange={(e) => setFeaturedText(e.target.value)}
                maxLength={15}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Custom text for the "featured on" line
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Enabled</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="linkEnabled"
                  checked={linkEnabled}
                  onChange={(e) => setLinkEnabled(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="linkEnabled" className="ml-2 block text-sm text-gray-700">
                  Enable link to platform page
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`px-3 py-2 rounded-md ${
                    theme === 'light'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
            
            {/* Size Mode Controls */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size Control Mode</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setSizeMode('width')}
                  className={`px-3 py-2 rounded-md ${
                    sizeMode === 'width'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Width Only
                </button>
                <button
                  type="button"
                  onClick={() => setSizeMode('height')}
                  className={`px-3 py-2 rounded-md ${
                    sizeMode === 'height'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                  }`}
                >
                  Height Only
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Controls which dimension affects the badge
              </p>
            </div>

            {/* SVG Width Control - shown for width mode */}
            {sizeMode === 'width' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SVG Width</label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={svgWidth}
                  onChange={(e) => setSvgWidth(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{svgWidth}px</span>
              </div>
            )}

            {/* SVG Height Control - shown for height mode */}
            {sizeMode === 'height' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SVG Height</label>
                <input
                  type="range"
                  min="20"
                  max="108"
                  value={svgHeight}
                  onChange={(e) => setSvgHeight(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{svgHeight}px</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
          <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto">
            {generateUsageCode()}
          </pre>
        </div>
      </div>
    </main>
  );
}

export default App; 