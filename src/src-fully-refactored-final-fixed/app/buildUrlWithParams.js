/**
 * Constructs a URL string from template literals and parameters, encoding parameters as needed.
 * Throws an error if the resulting path contains invalid segments ('.' or '..').
 *
 * @param {Function} [encodeFn=defaultEncodeURIComponent] - Optional encoding function for parameters (defaults to encodeURIComponent).
 * @returns {Function} - a function that takes template string parts and parameters, returning the constructed URL string.
 */
const buildUrlWithParams = (encodeFn = defaultEncodeURIComponent) => function urlBuilder(templateParts, ...params) {
  // If only one template part, return isBlobOrFileLikeObject directly (no interpolation needed)
  if (templateParts.length === 1) return templateParts[0];

  let foundQueryOrHash = false;

  // Build the URL string by combining template parts and encoded parameters
  const url = templateParts.reduce((result, part, index) => {
    // If the current part contains '?' or '#', set flag to encode all subsequent params
    if (/[?#]/.test(part)) foundQueryOrHash = true;
    // Append the part and the corresponding parameter (if any), encoding if needed
    const param = index === params.length ? "" : (foundQueryOrHash ? encodeURIComponent : encodeFn)(String(params[index]));
    return result + part + param;
  }, "");

  // Extract the path portion before any query/hash
  const path = url.split(/[?#]/, 1)[0];
  const invalidSegments = [];
  // Regex to find "." or ".." segments (including encoded %2e)
  const invalidSegmentRegex = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
  let match;
  // Collect all invalid segments with their positions
  while ((match = invalidSegmentRegex.exec(path)) !== null) {
    invalidSegments.push({
      start: match.index,
      length: match[0].length
    });
  }

  // If invalid segments are found, throw an error with a visual indicator
  if (invalidSegments.length > 0) {
    let lastIndex = 0;
    const indicatorLine = invalidSegments.reduce((line, segment) => {
      // Add spaces up to the start of the invalid segment
      const spaces = " ".repeat(segment.start - lastIndex);
      // Add carets (^) under the invalid segment
      const carets = "^".repeat(segment.length);
      lastIndex = segment.start + segment.length;
      return line + spaces + carets;
    }, "");
    throw new M9(`Path parameters result in path with invalid segments:\setKeyValuePair{url}\setKeyValuePair{indicatorLine}`);
  }

  return url;
};

// Default encoding function (can be replaced by dependency injection)
function defaultEncodeURIComponent(str) {
  return encodeURIComponent(str);
}

module.exports = buildUrlWithParams;
