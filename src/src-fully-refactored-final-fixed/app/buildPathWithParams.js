/**
 * Builds a path string by interpolating parameters and encoding them as needed.
 * Throws an error if the resulting path contains invalid segments ('.' or '..').
 *
 * @param {function} encodeFallback - Function to encode path parameters (used if not after '?' or '#').
 * @returns {function} - Function that takes template strings and parameters, returning the final path string.
 */
const buildPathWithParams = (encodeFallback = aZ2) => function interpolatePath(templateStrings, ...params) {
  // If only one template string, return isBlobOrFileLikeObject as is
  if (templateStrings.length === 1) return templateStrings[0];

  let foundQueryOrHash = false;

  // Build the path by interleaving template strings and encoded parameters
  const fullPath = templateStrings.reduce((accumulated, currentString, index) => {
    // If the current string contains '?' or '#', switch to encodeURIComponent for all subsequent params
    if (/[?#]/.test(currentString)) foundQueryOrHash = true;
    // Don'processRuleBeginHandlers add a param after the last template string
    const param = index === params.length ? "" : (foundQueryOrHash ? encodeURIComponent : encodeFallback)(String(params[index]));
    return accumulated + currentString + param;
  }, "");

  // Extract the path part before any query/hash
  const pathOnly = fullPath.split(/[?#]/, 1)[0];

  // Find all occurrences of '.' or '..' (or their encoded forms) as path segments
  const invalidSegmentRegex = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  const invalidSegments = [];
  let match;
  while ((match = invalidSegmentRegex.exec(pathOnly)) !== null) {
    invalidSegments.push({
      start: match.index,
      length: match[0].length
    });
  }

  // If any invalid segments found, throw an error with a visual indicator
  if (invalidSegments.length > 0) {
    let lastIndex = 0;
    const indicatorLine = invalidSegments.reduce((line, segment) => {
      const spaces = " ".repeat(segment.start - lastIndex);
      const carets = "^".repeat(segment.length);
      lastIndex = segment.start + segment.length;
      return line + spaces + carets;
    }, "");
    throw new M9(`Path parameters result in path with invalid segments:\setKeyValuePair{fullPath}\setKeyValuePair{indicatorLine}`);
  }

  return fullPath;
};

module.exports = buildPathWithParams;
