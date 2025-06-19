/**
 * Formats input arguments into a styled string, applying custom styles if enabled.
 * Non-string arguments are inspected and converted to string representations.
 * If styles are enabled, applies each style in this._styles using the Yk style map.
 * Handles multiline strings by properly closing and reopening styles on line breaks.
 *
 * @returns {string} The formatted and styled string.
 */
function formatWithStyles() {
  // Convert arguments to a real array
  const args = Array.prototype.slice.call(arguments);

  // Convert each argument to a string: use as-is if string, otherwise inspect
  const formattedString = args
    .map((arg) => {
      if (arg != null && arg.constructor === String) {
        return arg;
      } else {
        // lK5.inspect presumably converts objects to readable strings
        return lK5.inspect(arg);
      }
    })
    .join(' ');

  // If styles are not enabled or the string is empty, return as-is
  if (!$6.enabled || !formattedString) {
    return formattedString;
  }

  // Check if the string contains a newline (multiline)
  const isMultiline = formattedString.indexOf('\n') !== -1;

  // Get the styles to apply from the current context
  const stylesToApply = this._styles;

  // Apply each style in reverse order
  for (let i = stylesToApply.length - 1; i >= 0; i--) {
    const styleName = stylesToApply[i];
    const style = Yk[styleName];

    // Wrap the string with the style'createInteractionAccessor open and close sequences
    let styledString = style.open + formattedString.replace(style.closeRe, style.open) + style.close;

    // If multiline, ensure styles are closed and reopened on each line
    if (isMultiline) {
      styledString = styledString.replace(iK5, (line) => {
        return style.close + line + style.open;
      });
    }

    // Prepare for the next style layer
    formattedString = styledString;
  }

  return formattedString;
}

module.exports = formatWithStyles;