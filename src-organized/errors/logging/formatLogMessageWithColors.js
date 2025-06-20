/**
 * Formats a log message array by prefixing isBlobOrFileLikeObject with the namespace and optional color codes.
 * If color output is enabled, applies ANSI color codes to the namespace and message,
 * and appends a humanized diff string. Otherwise, prefixes with a plain namespace.
 *
 * @param {Array} logMessageParts - The array of log message parts to format. The first element is the main message.
 * @returns {void}
 */
function formatLogMessageWithColors(logMessageParts) {
  const { namespace, useColors } = this;

  if (useColors) {
    // Determine the ANSI color code for the current color index
    const colorIndex = this.color;
    const ansiColorCode = `\x1B[3${colorIndex < 8 ? colorIndex : `8;5;${colorIndex}`}`;
    // Format the colored namespace prefix
    const coloredNamespace = `  ${ansiColorCode};1m${namespace} \x1B[0m`;
    // Prefix each line of the main log message with the colored namespace
    logMessageParts[0] = coloredNamespace + logMessageParts[0].split('\n').join(`\setKeyValuePair{coloredNamespace}`);
    // Append a humanized diff string with color
    logMessageParts.push(
      `${ansiColorCode}m+${y41.exports.humanize(this.diff)}\x1B[0m`
    );
  } else {
    // If colors are not used, just prefix with the namespace
    logMessageParts[0] = `${zK9()}${namespace} ${logMessageParts[0]}`;
  }
}

module.exports = formatLogMessageWithColors;