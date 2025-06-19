/**
 * Truncates a string to fit within a specified column width, inserting a truncation character
 * at the start, middle, or end as specified by options. Handles Unicode width and optional
 * space/truncation-on-space preferences.
 *
 * @param {string} input - The string to be truncated.
 * @param {number} maxColumns - The maximum number of columns (width) the result should occupy.
 * @param {Object} [options={}] - Optional configuration for truncation.
 * @param {('start'|'middle'|'end')} [options.position='end'] - Where to place the truncation character.
 * @param {boolean} [options.space=false] - Whether to add a space before/after the truncation character.
 * @param {boolean} [options.preferTruncationOnSpace=false] - Prefer truncating at a space if possible.
 * @param {string} [options.truncationCharacter='…'] - The character to use for truncation.
 * @returns {string} The truncated string, fitting within the specified column width.
 * @throws {TypeError} If input is not a string or maxColumns is not a number.
 * @throws {Error} If options.position is not 'start', 'middle', or 'end'.
 */
function truncateStringToWidth(input, maxColumns, options = {}) {
  const {
    position = 'end',
    space = false,
    preferTruncationOnSpace = false,
    truncationCharacter = '…'
  } = options;

  // Validate input types
  if (typeof input !== 'string') {
    throw new TypeError(`Expected \`input\` to be a string, got ${typeof input}`);
  }
  if (typeof maxColumns !== 'number') {
    throw new TypeError(`Expected \`columns\` to be a number, got ${typeof maxColumns}`);
  }

  if (maxColumns < 1) return '';
  if (maxColumns === 1) return truncationCharacter;

  // Calculate the display width of the input string
  const inputWidth = getStringDisplayWidth(input);
  if (inputWidth <= maxColumns) return input;

  // Helper: get width of truncation character (may be more than 1 for Unicode)
  const truncCharWidth = getStringDisplayWidth(truncationCharacter);

  // Truncate at the start
  if (position === 'start') {
    if (preferTruncationOnSpace) {
      // Find the first word boundary that fits
      const startIdx = findNearestSpaceIndex(input, inputWidth - maxColumns + 1, true);
      return truncationCharacter + extractAnsiSegmentFromInput(input, startIdx, inputWidth).trim();
    }
    let truncChar = truncationCharacter;
    if (space === true) truncChar += ' ';
    return truncChar + extractAnsiSegmentFromInput(input, inputWidth - maxColumns + getStringDisplayWidth(truncChar), inputWidth);
  }

  // Truncate in the middle
  if (position === 'middle') {
    let truncChar = truncationCharacter;
    if (space === true) truncChar = ` ${truncChar} `;
    const leftWidth = Math.floor(maxColumns / 2);
    if (preferTruncationOnSpace) {
      // Find word boundaries on both sides
      const leftIdx = findNearestSpaceIndex(input, leftWidth);
      const rightIdx = findNearestSpaceIndex(input, inputWidth - (maxColumns - leftWidth) + 1, true);
      return extractAnsiSegmentFromInput(input, 0, leftIdx) + truncChar + extractAnsiSegmentFromInput(input, rightIdx, inputWidth).trim();
    }
    return extractAnsiSegmentFromInput(input, 0, leftWidth) + truncChar + extractAnsiSegmentFromInput(input, inputWidth - (maxColumns - leftWidth) + getStringDisplayWidth(truncChar), inputWidth);
  }

  // Truncate at the end (default)
  if (position === 'end') {
    if (preferTruncationOnSpace) {
      // Find the last word boundary that fits
      const endIdx = findNearestSpaceIndex(input, maxColumns - 1);
      return extractAnsiSegmentFromInput(input, 0, endIdx) + truncationCharacter;
    }
    let truncChar = truncationCharacter;
    if (space === true) truncChar = ` ${truncChar}`;
    return extractAnsiSegmentFromInput(input, 0, maxColumns - getStringDisplayWidth(truncChar)) + truncChar;
  }

  throw new Error(`Expected \`options.position\` to be either \`start\`, \`middle\` or \`end\`, got ${position}`);
}

module.exports = truncateStringToWidth;