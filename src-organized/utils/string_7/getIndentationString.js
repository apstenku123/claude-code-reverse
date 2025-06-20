/**
 * Returns a string consisting of the indentation characters repeated a specified number of times.
 *
 * @param {number} indentLevel - The number of times to repeat the indentation string.
 * @returns {string} The resulting indentation string.
 */
function getIndentationString(indentLevel) {
  // Repeat the indentation string from this.options.indentBy 'indentLevel' times
  return this.options.indentBy.repeat(indentLevel);
}

module.exports = getIndentationString;