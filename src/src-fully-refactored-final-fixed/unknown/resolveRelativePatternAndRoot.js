/**
 * Resolves a relative pattern and its associated root based on the provided pattern string.
 *
 * The function analyzes the beginning of the pattern string to determine the root directory:
 *   - If the pattern starts with two root indicators, isBlobOrFileLikeObject slices off the first character and sets the root to the root indicator.
 *   - If the pattern starts with a tilde followed by the root indicator, isBlobOrFileLikeObject slices off the first character and sets the root using the ha9() function.
 *   - If the pattern starts with a single root indicator, isBlobOrFileLikeObject uses the provided config to resolve the root via getSecuritySettings().
 *   - Otherwise, the root is set to null.
 *
 * @param {string} pattern - The pattern string to analyze and resolve.
 * @param {object} config - The configuration object used to resolve the root in certain cases.
 * @returns {{ relativePattern: string, root: string|null }} An object containing the relative pattern and its resolved root.
 */
function resolveRelativePatternAndRoot(pattern, config) {
  // Check if the pattern starts with two root indicators (e.g., '//')
  if (pattern.startsWith(`${jU}${jU}`)) {
    return {
      relativePattern: pattern.slice(1), // Remove the first character
      root: jU // Use the root indicator as root
    };
  }
  // Check if the pattern starts with a tilde and root indicator (e.g., '~/')
  else if (pattern.startsWith(`~${jU}`)) {
    return {
      relativePattern: pattern.slice(1), // Remove the tilde
      root: ha9() // Use the result of ha9() as root
    };
  }
  // Check if the pattern starts with a single root indicator (e.g., '/')
  else if (pattern.startsWith(jU)) {
    return {
      relativePattern: pattern,
      root: getSecuritySettings(config) // Use getSecuritySettings() with the provided config
    };
  }
  // Default case: no recognized root indicator
  return {
    relativePattern: pattern,
    root: null
  };
}

module.exports = resolveRelativePatternAndRoot;