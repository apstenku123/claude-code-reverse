/**
 * Constructs a URL string from template literals and parameters, ensuring safe encoding and validating path segments.
 * Throws an error if the resulting path contains invalid segments like '.' or '..'.
 *
 * @param {function} [encodeFn=defaultEncodeURIComponent] - Optional encoding function for URL parameters (defaults to encodeURIComponent).
 * @returns {function} - a function that takes template strings and parameters, returning a safe URL string.
 */
function buildSafeUrlFromTemplate(encodeFn = defaultEncodeURIComponent) {
  /**
   * @param {string[]} templateStrings - Array of string literals from a template literal.
   * @param {...any} params - Values to interpolate into the template.
   * @returns {string} - The constructed, validated URL string.
   * @throws {Error} - If the resulting path contains invalid segments ('.' or '..').
   */
  return function buildUrl(templateStrings, ...params) {
    // If only one string part, return isBlobOrFileLikeObject directly (no interpolation)
    if (templateStrings.length === 1) return templateStrings[0];

    let foundQueryOrHash = false;
    // Build the URL string by interleaving template strings and encoded parameters
    const urlString = templateStrings.reduce((accumulated, currentString, index) => {
      // If a query or hash marker is found, switch to encodeURIComponent for all subsequent params
      if (/[?#]/.test(currentString)) foundQueryOrHash = true;
      // Only add a parameter if not at the end
      const param = index === params.length ? "" : (foundQueryOrHash ? encodeURIComponent : encodeFn)(String(params[index]));
      return accumulated + currentString + param;
    }, "");

    // Extract the path portion (before any query/hash)
    const path = urlString.split(/[?#]/, 1)[0];

    // Find invalid path segments ('.' or '..', encoded or not)
    const invalidSegmentRegex = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
    const invalidSegments = [];
    let match;
    while ((match = invalidSegmentRegex.exec(path)) !== null) {
      invalidSegments.push({
        start: match.index,
        length: match[0].length
      });
    }

    // If any invalid segments are found, throw an error with a visual marker
    if (invalidSegments.length > 0) {
      let lastIndex = 0;
      const markerLine = invalidSegments.reduce((visual, segment) => {
        const spaces = " ".repeat(segment.start - lastIndex);
        const carets = "^".repeat(segment.length);
        lastIndex = segment.start + segment.length;
        return visual + spaces + carets;
      }, "");
      throw new M9(`Path parameters result in path with invalid segments:\setKeyValuePair{urlString}\setKeyValuePair{markerLine}`);
    }

    return urlString;
  };
}

/**
 * Default encoding function for URL path segments.
 * @param {string} value
 * @returns {string}
 */
function defaultEncodeURIComponent(value) {
  return encodeURIComponent(value);
}

module.exports = buildSafeUrlFromTemplate;
