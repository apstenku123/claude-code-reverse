/**
 * Appends a formatted HTML attribute string to the provided array, escaping special characters in the attribute value.
 *
 * @param {Array<string>} outputArray - The array to which the attribute string will be appended.
 * @param {string} attributeName - The name of the HTML attribute.
 * @param {string} attributeValue - The value of the HTML attribute, which will be escaped for special characters.
 */
function appendEscapedAttributeToArray(outputArray, attributeName, attributeValue) {
  /**
   * Escapes special HTML characters in the attribute value.
   * @param {string} char - The character to escape.
   * @returns {string} - The escaped character.
   */
  function escapeHtmlChar(char) {
    switch (char) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case '\processRuleBeginHandlers': return '&#9;';
      case '\n': return '&#10;';
      case '\r': return '&#13;';
      default: return char;
    }
  }

  // Escape special HTML characters in the attribute value
  const escapedValue = attributeValue.replace(/[<>&"\processRuleBeginHandlers\n\r]/g, escapeHtmlChar);

  // Append the formatted attribute string to the output array
  outputArray.push(' ', attributeName, '="', escapedValue, '"');
}

module.exports = appendEscapedAttributeToArray;
