/**
 * Resolves a pattern path relative to a root path, handling edge cases where the pattern root matches or is nested under the root path.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.patternRoot - The root directory of the pattern.
 * @param {string} params.pattern - The pattern path to resolve.
 * @param {string} params.rootPath - The root path to resolve against.
 * @returns {string|null} The resolved pattern path relative to the root, or null if the pattern is outside the root.
 */
function getPatternRelativeToRoot({
  patternRoot,
  pattern,
  rootPath
}) {
  // Join the patternRoot and pattern to get the absolute pattern path
  const absolutePatternPath = Wv.join(patternRoot, pattern);

  // If the patternRoot is exactly the rootPath, return the pattern as is (processed by pO1)
  if (patternRoot === rootPath) {
    return pO1(pattern);
  }

  // If the absolute pattern path starts with the rootPath (plus separator), slice off the rootPath
  if (absolutePatternPath.startsWith(`${rootPath}${jU}`)) {
    const relativePattern = absolutePatternPath.slice(rootPath.length);
    return pO1(relativePattern);
  }

  // Otherwise, get the relative path from rootPath to patternRoot
  const relativeRootToPatternRoot = Wv.relative(rootPath, patternRoot);

  // If the relative path is empty, outside the root, or is '..', return null
  if (!relativeRootToPatternRoot ||
      relativeRootToPatternRoot.startsWith(`..${jU}`) ||
      relativeRootToPatternRoot === "..") {
    return null;
  }

  // Otherwise, join the relative path with the pattern and process
  const resolvedPattern = Wv.join(relativeRootToPatternRoot, pattern);
  return pO1(resolvedPattern);
}

module.exports = getPatternRelativeToRoot;