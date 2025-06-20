/**
 * Parses a 'bytes' range header string and extracts the start and end values.
 *
 * The expected format is: 'bytes=<start>-<end>' (optionally with whitespace around tokens).
 * If the header is invalid or the range is not valid, returns 'failure'.
 *
 * @param {string} headerValue - The header string to parse (e.g., 'bytes=0-499').
 * @param {boolean} [allowWhitespace=false] - Whether to allow and skip whitespace between tokens.
 * @returns {{rangeStartValue: number|null, rangeEndValue: number|null}|string} An object with start/end values, or 'failure' if invalid.
 */
function parseByteRangeHeader(headerValue, allowWhitespace = false) {
  // Helper object to track the current parsing position
  const positionTracker = { position: 5 }; // Skip 'bytes' (length 5)

  // Ensure the header starts with 'bytes'
  if (!headerValue.startsWith("bytes")) {
    return "failure";
  }

  // Optionally skip whitespace after 'bytes'
  if (allowWhitespace) {
    skipWhitespace(headerValue, positionTracker);
  }

  // Next character must be '='
  if (headerValue.charCodeAt(positionTracker.position) !== 61) { // 61 is '='
    return "failure";
  }
  positionTracker.position++;

  // Optionally skip whitespace after '='
  if (allowWhitespace) {
    skipWhitespace(headerValue, positionTracker);
  }

  // Parse the start value (digits)
  const startValueStr = parseDigits(headerValue, positionTracker);
  const rangeStartValue = startValueStr.length ? Number(startValueStr) : null;

  // Optionally skip whitespace before '-'
  if (allowWhitespace) {
    skipWhitespace(headerValue, positionTracker);
  }

  // Next character must be '-'
  if (headerValue.charCodeAt(positionTracker.position) !== 45) { // 45 is '-'
    return "failure";
  }
  positionTracker.position++;

  // Optionally skip whitespace after '-'
  if (allowWhitespace) {
    skipWhitespace(headerValue, positionTracker);
  }

  // Parse the end value (digits)
  const endValueStr = parseDigits(headerValue, positionTracker);
  const rangeEndValue = endValueStr.length ? Number(endValueStr) : null;

  // If there are any extra characters left, fail
  if (positionTracker.position < headerValue.length) {
    return "failure";
  }

  // At least one of start or end must be present
  if (rangeStartValue === null && rangeEndValue === null) {
    return "failure";
  }

  // If both are present, start must not be greater than end
  if (rangeStartValue !== null && rangeEndValue !== null && rangeStartValue > rangeEndValue) {
    return "failure";
  }

  return {
    rangeStartValue,
    rangeEndValue
  };

  /**
   * Skips whitespace (spaces or tabs) in the header string, updating the position tracker.
   * @param {string} str
   * @param {{position: number}} tracker
   */
  function skipWhitespace(str, tracker) {
    while (tracker.position < str.length) {
      const char = str[tracker.position];
      if (char === '\processRuleBeginHandlers' || char === ' ') {
        tracker.position++;
      } else {
        break;
      }
    }
  }

  /**
   * Parses consecutive digits from the current position in the header string.
   * @param {string} str
   * @param {{position: number}} tracker
   * @returns {string}
   */
  function parseDigits(str, tracker) {
    let digits = '';
    while (tracker.position < str.length) {
      const char = str[tracker.position];
      const code = char.charCodeAt(0);
      if (code >= 48 && code <= 57) { // '0' to '9'
        digits += char;
        tracker.position++;
      } else {
        break;
      }
    }
    return digits;
  }
}

module.exports = parseByteRangeHeader;