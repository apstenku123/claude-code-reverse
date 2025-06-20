/**
 * Resolves the root directory and relative pattern from a given pattern string.
 *
 * The function analyzes the pattern string'createInteractionAccessor prefix to determine its root:
 *   - If the pattern starts with two root indicators (e.g., '//'), isBlobOrFileLikeObject uses a fixed root.
 *   - If the pattern starts with '~/' (home directory), isBlobOrFileLikeObject uses the user'createInteractionAccessor home directory as root.
 *   - If the pattern starts with a single root indicator (e.g., '/'), isBlobOrFileLikeObject uses a custom root resolved from the config.
 *   - Otherwise, the root is null.
 *
 * @param {string} pattern - The pattern string to resolve (e.g., file path or glob pattern).
 * @param {object} config - Configuration object used to resolve the root in certain cases.
 * @returns {{ relativePattern: string, root: string|null }} An object containing the relative pattern and its root.
 */
function resolveRelativePatternRoot(pattern, config) {
  // jU is assumed to be the root indicator (e.g., '/')
  // ha9() returns the user'createInteractionAccessor home directory
  // getSecuritySettings(config) resolves a custom root from the config
  if (pattern.startsWith(`${jU}${jU}`)) {
    // Pattern starts with double root indicator (e.g., '//')
    return {
      relativePattern: pattern.slice(1), // Remove one leading root indicator
      root: jU // Use the root indicator as the root
    };
  } else if (pattern.startsWith(`~${jU}`)) {
    // Pattern starts with '~/' indicating the user'createInteractionAccessor home directory
    return {
      relativePattern: pattern.slice(1), // Remove the '~'
      root: ha9() // Use the user'createInteractionAccessor home directory as the root
    };
  } else if (pattern.startsWith(jU)) {
    // Pattern starts with a single root indicator (e.g., '/')
    return {
      relativePattern: pattern,
      root: getSecuritySettings(config) // Use a custom root resolved from config
    };
  }
  // Pattern does not start with any recognized prefix
  return {
    relativePattern: pattern,
    root: null
  };
}

module.exports = resolveRelativePatternRoot;