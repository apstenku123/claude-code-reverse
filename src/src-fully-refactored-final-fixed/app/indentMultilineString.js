/**
 * Indents each line of a given string by a specified number of times, using a custom indent string.
 * Optionally includes empty lines in the indentation process.
 *
 * @param {string} input - The input string to indent.
 * @param {number} [count=1] - The number of times to repeat the indent string for each line.
 * @param {Object} [options={}] - Optional settings for indentation.
 * @param {string} [options.indent=" "] - The string to use for indentation (default is a single space).
 * @param {boolean} [options.includeEmptyLines=false] - Whether to indent empty lines as well.
 * @returns {string} The indented string.
 * @throws {TypeError} If input is not a string.
 * @throws {TypeError} If count is not a number.
 * @throws {RangeError} If count is negative.
 * @throws {TypeError} If options.indent is not a string.
 */
function indentMultilineString(input, count = 1, options = {}) {
  const {
    indent = " ",
    includeEmptyLines = false
  } = options;

  // Validate input types
  if (typeof input !== "string") {
    throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof input}\``);
  }
  if (typeof count !== "number") {
    throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof count}\``);
  }
  if (count < 0) {
    throw new RangeError(`Expected \`count\` to be at least 0, got \`${count}\``);
  }
  if (typeof indent !== "string") {
    throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``);
  }

  // If no indentation is needed, return the original string
  if (count === 0) {
    return input;
  }

  // Choose the regular expression based on whether to include empty lines
  // - /^/gm matches the start of every line (including empty lines)
  // - /^(?!\s*$)/gm matches the start of every non-empty line
  const lineStartRegex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

  // Indent each line by repeating the indent string 'count' times
  return input.replace(lineStartRegex, indent.repeat(count));
}

module.exports = indentMultilineString;
