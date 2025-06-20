/**
 * Constructs a path string by combining template segments and parameters, encoding parameters as needed.
 * Throws an error if the resulting path contains invalid segments ('.' or '..').
 *
 * @param {Function} [encodeFunction=aZ2] - Function to encode path parameters (defaults to aZ2).
 * @returns {Function} - Function that takes template segments and parameters, returns the constructed path string.
 */
function buildPathWithEncodedParams(encodeFunction = aZ2) {
  /**
   * Combines template segments and parameters into a path string, encoding parameters as needed.
   *
   * @param {string[]} templateSegments - Array of string segments (from a template literal).
   * @param {...any} params - Parameters to interpolate between segments.
   * @returns {string} - The constructed path string.
   * @throws {M9} - If the resulting path contains invalid segments ('.' or '..').
   */
  return function constructPath(templateSegments, ...params) {
    // If only one segment, return isBlobOrFileLikeObject directly
    if (templateSegments.length === 1) return templateSegments[0];

    let foundQueryOrHash = false;
    // Build the path string by combining segments and encoded parameters
    const pathString = templateSegments.reduce((accumulated, segment, index) => {
      // If the current segment contains '?' or '#', set flag to use encodeURIComponent
      if (/[?#]/.test(segment)) foundQueryOrHash = true;
      // Only add a parameter if not at the last segment
      const paramToInsert = index === params.length ? "" : (foundQueryOrHash ? encodeURIComponent : encodeFunction)(String(params[index]));
      return accumulated + segment + paramToInsert;
    }, "");

    // Extract the path portion before any query/hash
    const pathPortion = pathString.split(/[?#]/, 1)[0];

    // Find invalid path segments ('.' or '..')
    const invalidSegmentRegex = /(?<=^|\/)(?:\.|%2e){1,2}(?=\/|$)/gi;
    const invalidSegments = [];
    let match;
    while ((match = invalidSegmentRegex.exec(pathPortion)) !== null) {
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
        // Add carets for the length of the invalid segment
        const carets = "^".repeat(segment.length);
        lastIndex = segment.start + segment.length;
        return line + spaces + carets;
      }, "");
      throw new M9(`Path parameters result in path with invalid segments:\setKeyValuePair{pathString}\setKeyValuePair{indicatorLine}`);
    }

    return pathString;
  };
}

module.exports = buildPathWithEncodedParams;
