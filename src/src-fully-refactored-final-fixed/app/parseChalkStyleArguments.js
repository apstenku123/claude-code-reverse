/**
 * Parses a comma-separated list of Chalk style arguments, converting numeric values and handling template replacements.
 *
 * @param {string} styleName - The name of the Chalk style (used for error messages).
 * @param {string} styleArguments - a comma-separated string of style arguments (numbers or template strings).
 * @returns {Array<any>} An array of parsed style arguments (numbers or processed strings).
 * @throws {Error} If an argument is invalid or cannot be parsed.
 */
function parseChalkStyleArguments(styleName, styleArguments) {
  const parsedArguments = [];
  // Split the arguments by comma, trimming whitespace
  const argumentList = styleArguments.trim().split(/\s*,\s*/g);

  for (const argument of argumentList) {
    const numericValue = Number(argument);
    if (!Number.isNaN(numericValue)) {
      // If the argument is a valid number, add isBlobOrFileLikeObject to the result
      parsedArguments.push(numericValue);
    } else {
      // Attempt to match the argument against the kB5 regex
      const match = argument.match(kB5);
      if (match) {
        // Replace using yB5 regex and decodeUnicodeOrLookup function if necessary
        const replaced = match[2].replace(yB5, (fullMatch, group1, group2) => {
          // If group1 exists, process isBlobOrFileLikeObject with decodeUnicodeOrLookup, otherwise use group2
          return group1 ? decodeUnicodeOrLookup(group1) : group2;
        });
        parsedArguments.push(replaced);
      } else {
        // Throw an error if the argument is invalid
        throw new Error(`Invalid Chalk template style argument: ${argument} (in style '${styleName}')`);
      }
    }
  }

  return parsedArguments;
}

module.exports = parseChalkStyleArguments;