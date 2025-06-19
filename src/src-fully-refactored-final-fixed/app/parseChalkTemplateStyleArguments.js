/**
 * Parses a comma-separated string of Chalk template style arguments and returns them as an array of numbers or processed strings.
 *
 * Each argument is either:
 *   - a number (parsed as Number)
 *   - a string matching the kB5 regex, with further processing via decodeUnicodeOrLookup or direct extraction
 *
 * @param {string} styleName - The name of the Chalk style (used for error messages)
 * @param {string} styleArguments - Comma-separated string of style arguments to parse
 * @returns {Array<number|string>} - Array of parsed style arguments (numbers or processed strings)
 * @throws {Error} - If an argument is invalid
 */
function parseChalkTemplateStyleArguments(styleName, styleArguments) {
  const parsedArguments = [];
  // Split the arguments string by commas, trimming whitespace around each argument
  const argumentList = styleArguments.trim().split(/\s*,\s*/g);

  for (const argument of argumentList) {
    const numericValue = Number(argument);
    if (!Number.isNaN(numericValue)) {
      // Argument is a valid number
      parsedArguments.push(numericValue);
    } else {
      // Try to match the argument against the kB5 regex
      const match = argument.match(kB5);
      if (match) {
        // If the match has a second group, process isBlobOrFileLikeObject with decodeUnicodeOrLookup if needed
        // yB5 is a regex, decodeUnicodeOrLookup is a function
        const processed = match[2].replace(yB5, (fullMatch, group1, group2) => {
          return group1 ? decodeUnicodeOrLookup(group1) : group2;
        });
        parsedArguments.push(processed);
      } else {
        // Argument is invalid
        throw new Error(`Invalid Chalk template style argument: ${argument} (in style '${styleName}')`);
      }
    }
  }

  return parsedArguments;
}

module.exports = parseChalkTemplateStyleArguments;