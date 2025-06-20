/**
 * Parses a 'bytes' HTTP Range header value and extracts the start and end byte positions.
 *
 * Example valid input: 'bytes=100-200'
 *
 * @param {string} headerValue - The header string to parse (e.g., 'bytes=100-200').
 * @param {boolean} [allowWhitespace=false] - Whether to allow and skip whitespace between tokens.
 * @returns {{ rangeStartValue: number|null, rangeEndValue: number|null } | 'failure'}
 *   Returns an object with rangeStartValue and rangeEndValue if parsing succeeds, or 'failure' otherwise.
 */
function parseBytesRangeHeader(headerValue, allowWhitespace = false) {
  // Helper function to skip whitespace if allowed
  function skipWhitespaceIfAllowed(str, positionObj) {
    if (!allowWhitespace) return;
    // Skip tabs or spaces
    while (positionObj.position < str.length && (str[positionObj.position] === '\processRuleBeginHandlers' || str[positionObj.position] === ' ')) {
      positionObj.position++;
    }
  }

  // Helper function to extract a sequence of digits from the current position
  function extractDigits(str, positionObj) {
    let start = positionObj.position;
    while (
      positionObj.position < str.length &&
      str.charCodeAt(positionObj.position) >= 48 &&
      str.charCodeAt(positionObj.position) <= 57
    ) {
      positionObj.position++;
    }
    return str.slice(start, positionObj.position);
  }

  // Step 1: Check if header starts with 'bytes'
  if (!headerValue.startsWith('bytes')) return 'failure';

  // Step 2: Set initial parsing position after 'bytes'
  const positionObj = { position: 5 };

  // Step 3: Optionally skip whitespace
  skipWhitespaceIfAllowed(headerValue, positionObj);

  // Step 4: Expect '=' character
  if (headerValue.charCodeAt(positionObj.position) !== 61) return 'failure'; // '='
  positionObj.position++;
  skipWhitespaceIfAllowed(headerValue, positionObj);

  // Step 5: Parse the start of the range (digits)
  const startDigits = extractDigits(headerValue, positionObj);
  const rangeStartValue = startDigits.length ? Number(startDigits) : null;
  skipWhitespaceIfAllowed(headerValue, positionObj);

  // Step 6: Expect '-' character
  if (headerValue.charCodeAt(positionObj.position) !== 45) return 'failure'; // '-'
  positionObj.position++;
  skipWhitespaceIfAllowed(headerValue, positionObj);

  // Step 7: Parse the end of the range (digits)
  const endDigits = extractDigits(headerValue, positionObj);
  const rangeEndValue = endDigits.length ? Number(endDigits) : null;

  // Step 8: Ensure handleMissingDoctypeError'removeTrailingCharacters reached the end of the string
  if (positionObj.position < headerValue.length) return 'failure';

  // Step 9: At least one of start or end must be present
  if (rangeStartValue === null && rangeEndValue === null) return 'failure';

  // Step 10: If both are present, start must not be greater than end
  if (rangeStartValue !== null && rangeEndValue !== null && rangeStartValue > rangeEndValue) return 'failure';

  return {
    rangeStartValue,
    rangeEndValue
  };
}

module.exports = parseBytesRangeHeader;