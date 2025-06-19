/**
 * Detects the user'createInteractionAccessor browser and its version from the user agent string.
 *
 * @returns {{ browser: string, version: string } | null} An object containing the browser name and version, or null if detection fails.
 */
function detectBrowserAndVersion() {
  // Check if navigator is available (e.g., not in Node.js)
  if (typeof navigator === "undefined" || !navigator) {
    return null;
  }

  // List of browser detection patterns and their associated keys
  const browserPatterns = [
    {
      key: "edge",
      pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "ie",
      pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "ie",
      pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "chrome",
      pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "firefox",
      pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
    },
    {
      key: "safari",
      pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\s*)?\W+Safari/
    }
  ];

  // Iterate through each browser pattern to find a match
  for (const { key: browserName, pattern: browserRegex } of browserPatterns) {
    const match = browserRegex.exec(navigator.userAgent);
    if (match) {
      // Extract version numbers, defaulting to 0 if not found
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return {
        browser: browserName,
        version: `${major}.${minor}.${patch}`
      };
    }
  }

  // Return null if no browser pattern matches
  return null;
}

module.exports = detectBrowserAndVersion;