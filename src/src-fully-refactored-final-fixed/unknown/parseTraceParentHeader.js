/**
 * Parses a W3C traceparent header string and extracts trace information.
 *
 * @param {string} traceParentHeader - The traceparent header string to parse (e.g., '00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01').
 * @returns {Object|undefined} An object containing traceId, parentSpanId, and parentSampled (boolean or undefined), or undefined if input is invalid or does not match the expected format.
 */
function parseTraceParentHeader(traceParentHeader) {
  if (!traceParentHeader) return;

  // c5A is assumed to be a RegExp matching the W3C traceparent header format
  // Example: /^([\da-f]{32})-([\da-f]{16})-([01])$/i
  const match = traceParentHeader.match(c5A);
  if (!match) return;

  let parentSampled;
  // The third capture group indicates if the parent was sampled: '1' = true, '0' = false
  if (match[3] === "1") {
    parentSampled = true;
  } else if (match[3] === "0") {
    parentSampled = false;
  }

  return {
    traceId: match[1],
    parentSampled: parentSampled,
    parentSpanId: match[2]
  };
}

module.exports = parseTraceParentHeader;