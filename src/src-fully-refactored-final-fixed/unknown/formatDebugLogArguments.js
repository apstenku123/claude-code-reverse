/**
 * Formats the arguments array for debug logging, applying color styles if enabled.
 *
 * This function mutates the provided arguments array to include namespace, color styling,
 * and a humanized time difference. It is designed to be used as a method, relying on the context (`this`)
 * for configuration such as color usage, namespace, and color value.
 *
 * @param {any[]} logArguments - The arguments array to be formatted for debug logging. The first element is expected to be the log message.
 * @returns {void}
 */
function formatDebugLogArguments(logArguments) {
  // Build the formatted message prefix based on color usage
  logArguments[0] =
    (this.useColors ? "%c" : "") +
    this.namespace +
    (this.useColors ? " %c" : " ") +
    logArguments[0] +
    (this.useColors ? "%c " : " ") +
    "+" + _41.exports.humanize(this.diff);

  // If colors are not used, exit early
  if (!this.useColors) return;

  const colorStyle = "color: " + this.color;
  // Insert color styles for namespace and reset to inherit for message
  logArguments.splice(1, 0, colorStyle, "color: inherit");

  let formatSpecifierIndex = 0;
  let lastColorSpecifierPosition = 0;

  // Find the position of the last '%c' format specifier in the message
  logArguments[0].replace(/%[a-zA%]/g, (specifier) => {
    if (specifier === "%%") return; // Skip escaped percent signs
    formatSpecifierIndex++;
    if (specifier === "%c") {
      lastColorSpecifierPosition = formatSpecifierIndex;
    }
  });

  // Insert the color style at the position after the last '%c' specifier
  logArguments.splice(lastColorSpecifierPosition, 0, colorStyle);
}

module.exports = formatDebugLogArguments;