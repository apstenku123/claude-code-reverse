/**
 * Resolves a pattern path relative to a root path, returning a normalized pattern string or null if the pattern is outside the root.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.patternRoot - The root directory of the pattern.
 * @param {string} params.pattern - The pattern path to resolve.
 * @param {string} params.rootPath - The root path to resolve against.
 * @returns {string|null} The normalized pattern string relative to the root, or null if the pattern is outside the root.
 */
function getPatternRelativePath({
  patternRoot,
  pattern,
  rootPath
}) {
  // Join the pattern root and pattern to get the absolute pattern path
  const absolutePatternPath = Wv.join(patternRoot, pattern);

  // If the pattern root is the same as the root path, just normalize the pattern
  if (patternRoot === rootPath) {
    return pO1(pattern);
  }

  // If the absolute pattern path starts with the root path (plus separator), normalize the relative part
  if (absolutePatternPath.startsWith(`${rootPath}${jU}`)) {
    const relativePattern = absolutePatternPath.slice(rootPath.length);
    return pO1(relativePattern);
  }

  // Otherwise, get the relative path from rootPath to patternRoot
  const relativeRootToPattern = Wv.relative(rootPath, patternRoot);

  // If the relative path is empty, outside the root, or is just '..', return null
  if (!relativeRootToPattern || relativeRootToPattern.startsWith(`..${jU}`) || relativeRootToPattern === "..") {
    return null;
  }

  // Otherwise, join the relative path with the pattern and normalize
  const joinedPattern = Wv.join(relativeRootToPattern, pattern);
  return pO1(joinedPattern);
}

module.exports = getPatternRelativePath;