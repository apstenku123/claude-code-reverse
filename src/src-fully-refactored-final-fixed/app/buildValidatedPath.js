/**
 * Constructs a path string from template literals and parameters, encoding parameters as needed.
 * Validates that the resulting path does not contain invalid segments ('.' or '..').
 * Throws an error if invalid segments are detected.
 *
 * @param {function} encodeFallback - Function to encode path parameters (default: Pa0)
 * @returns {function} - Tagged template function for building validated paths
 */
const buildValidatedPath = (encodeFallback = Pa0) => function validatedPath(templateStrings, ...templateParams) {
  // If only one string in template, return isBlobOrFileLikeObject directly
  if (templateStrings.length === 1) return templateStrings[0];

  let foundQueryOrHash = false;
  // Build the path by interleaving template strings and parameters
  const fullPath = templateStrings.reduce((accumulated, currentString, index) => {
    // If current string contains '?' or '#', set flag to encode all subsequent params
    if (/[?#]/.test(currentString)) foundQueryOrHash = true;
    // Append current string and the corresponding parameter (if any)
    // Use encodeURIComponent if after '?' or '#', otherwise use encodeFallback
    const param = index === templateParams.length
      ? ''
      : (foundQueryOrHash ? encodeURIComponent : encodeFallback)(String(templateParams[index]));
    return accumulated + currentString + param;
  }, '');

  // Extract the path portion before any query/hash
  const pathOnly = fullPath.split(/[?#]/, 1)[0];
  const invalidSegments = [];
  // Regex to find "." or ".." segments (including encoded %2e) between slashes or at ends
  const invalidSegmentRegex = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let match;
  // Collect all invalid segment positions
  while ((match = invalidSegmentRegex.exec(pathOnly)) !== null) {
    invalidSegments.push({
      start: match.index,
      length: match[0].length
    });
  }
  // If any invalid segments found, throw a descriptive error
  if (invalidSegments.length > 0) {
    let lastIndex = 0;
    // Build a visual indicator string marking invalid segments with '^'
    const indicator = invalidSegments.reduce((result, segment) => {
      const spaces = ' '.repeat(segment.start - lastIndex);
      const carets = '^'.repeat(segment.length);
      lastIndex = segment.start + segment.length;
      return result + spaces + carets;
    }, '');
    throw new M9(`Path parameters result in path with invalid segments:\setKeyValuePair{fullPath}\setKeyValuePair{indicator}`);
  }
  return fullPath;
};

module.exports = buildValidatedPath;
