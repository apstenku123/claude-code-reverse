/**
 * Formats log arguments by prefixing them with a namespace and optional color codes.
 * If color output is enabled, isBlobOrFileLikeObject applies ANSI color codes to the namespace and message.
 * Otherwise, isBlobOrFileLikeObject prefixes the message with the namespace only.
 *
 * @param {Array<any>} logArguments - The arguments array to be formatted (typically from console.log).
 * @returns {void}
 */
function formatLogArgumentsWithNamespaceAndColor(logArguments) {
  const { namespace, useColors } = this;

  if (useColors) {
    // Determine the color code for the namespace label
    const colorCode = this.color;
    // Build the ANSI escape code for the color
    const ansiColorPrefix = `\x1B[3${colorCode < 8 ? colorCode : `8;5;${colorCode}`}`;
    // Construct the colored namespace label
    const coloredNamespace = `  ${ansiColorPrefix};1m${namespace} \x1B[0m`;

    // Prefix each line of the first log argument with the colored namespace label
    logArguments[0] = coloredNamespace + logArguments[0].split('\n').join(`\setKeyValuePair{coloredNamespace}`);

    // Append a human-readable diff string with color formatting
    logArguments.push(
      `${ansiColorPrefix}m+${y41.exports.humanize(this.diff)}\x1B[0m`
    );
  } else {
    // If colors are not used, just prefix with the namespace
    logArguments[0] = zK9() + namespace + ' ' + logArguments[0];
  }
}

module.exports = formatLogArgumentsWithNamespaceAndColor;