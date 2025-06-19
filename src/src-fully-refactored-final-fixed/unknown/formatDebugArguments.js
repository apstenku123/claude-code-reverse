/**
 * Formats the arguments array for debug logging, applying color styles if enabled.
 *
 * This function modifies the input arguments array in-place to include namespace, color styling,
 * and human-readable time differences for debug output. It is intended to be used as a method
 * within a debug logger instance, relying on `this.useColors`, `this.namespace`, `this.color`,
 * and `this.diff` properties, as well as the `_41.exports.humanize` function for formatting time.
 *
 * @param {any[]} args - The arguments array to be formatted for debug output.
 * @returns {void}
 */
function formatDebugArguments(args) {
  // Build the formatted message prefix, including namespace and time diff
  args[0] =
    (this.useColors ? "%c" : "") +
    this.namespace +
    (this.useColors ? " %c" : " ") +
    args[0] +
    (this.useColors ? "%c " : " ") +
    "+" + _41.exports.humanize(this.diff);

  // If colors are not enabled, nothing more to do
  if (!this.useColors) return;

  // Prepare the color CSS string
  const colorStyle = "color: " + this.color;

  // Insert color styles after the namespace and before the message
  args.splice(1, 0, colorStyle, "color: inherit");

  // Track the position of %c tokens in the format string
  let formatSpecifierIndex = 0;
  let lastColorSpecifierPosition = 0;

  // Find the index after the last %c in the format string
  args[0].replace(/%[a-zA%]/g, (match) => {
    if (match === "%%") return; // Skip escaped percent signs
    formatSpecifierIndex++;
    if (match === "%c") {
      lastColorSpecifierPosition = formatSpecifierIndex;
    }
  });

  // Insert the color style at the correct position for the last %c
  args.splice(lastColorSpecifierPosition, 0, colorStyle);
}

module.exports = formatDebugArguments;
