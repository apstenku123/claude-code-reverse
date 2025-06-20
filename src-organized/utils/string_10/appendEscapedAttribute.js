/**
 * Appends an HTML attribute with an escaped value to an array representing HTML output.
 *
 * @param {Array<string>} htmlParts - The array to which the attribute string will be appended.
 * @param {string} attributeName - The name of the HTML attribute.
 * @param {string} attributeValue - The value of the HTML attribute, which will be escaped for HTML special characters.
 * @returns {void}
 */
function appendEscapedAttribute(htmlParts, attributeName, attributeValue) {
  // Helper function to escape special HTML characters
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

  // Escape special characters in the attribute value
  const escapedValue = attributeValue.replace(/[<>&"\processRuleBeginHandlers\n\r]/g, escapeHtmlChar);

  // Append the properly formatted and escaped attribute to the HTML parts array
  htmlParts.push(' ', attributeName, '="', escapedValue, '"');
}

module.exports = appendEscapedAttribute;