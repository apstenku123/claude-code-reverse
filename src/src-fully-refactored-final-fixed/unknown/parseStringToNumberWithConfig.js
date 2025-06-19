/**
 * Attempts to parse a string into a number, applying various validation and configuration options.
 * Handles hexadecimal, scientific notation, leading zeros, and custom skip patterns.
 *
 * @param {string} inputString - The string to be parsed into a number.
 * @param {Object} [options={}] - Configuration options for parsing.
 * @param {RegExp} [options.skipLike] - If provided and matches the trimmed input, parsing is skipped.
 * @param {boolean} [options.hex] - If true, parses hexadecimal numbers.
 * @param {boolean} [options.leadingZeros] - If false, disallows numbers with leading zeros.
 * @param {boolean} [options.eNotation] - If true, allows scientific notation.
 * @returns {number|string} The parsed number if valid according to the options, otherwise the original string.
 */
function parseStringToNumberWithConfig(inputString, options = {}) {
  // Merge default options (from B84) with provided options
  const config = Object.assign({}, B84, options);

  // Return early if input is not a string
  if (!inputString || typeof inputString !== "string") return inputString;

  const trimmedInput = inputString.trim();

  // If skipLike regex is provided and matches, skip parsing
  if (config.skipLike !== undefined && config.skipLike.test(trimmedInput)) {
    return inputString;
  }

  // If hex parsing is enabled and input matches hex pattern, parse as hex
  if (config.hex && e54.test(trimmedInput)) {
    return Number.parseInt(trimmedInput, 16);
  }

  // Attempt to match the input against the main number regex (A84)
  const match = A84.exec(trimmedInput);
  if (match) {
    const sign = match[1]; // e.g., '-' or undefined
    const leadingZeros = match[2]; // e.g., '00' in '00123'
    const integerPart = normalizeDecimalString(match[3]); // integer part, processed by normalizeDecimalString
    const exponentOrSuffix = match[4] || match[6]; // e.g., 'e+2' or suffix

    // Disallow leading zeros if configured, with special handling for decimals
    if (!config.leadingZeros && leadingZeros.length > 0 && sign && trimmedInput[2] !== ".") {
      return inputString;
    } else if (!config.leadingZeros && leadingZeros.length > 0 && !sign && trimmedInput[1] !== ".") {
      return inputString;
    } else {
      const parsedNumber = Number(trimmedInput);
      const parsedNumberString = String(parsedNumber);

      // If scientific notation is present
      if (parsedNumberString.search(/[eE]/) !== -1) {
        if (config.eNotation) {
          return parsedNumber;
        } else {
          return inputString;
        }
      // If exponent or suffix is present
      } else if (exponentOrSuffix) {
        if (config.eNotation) {
          return parsedNumber;
        } else {
          return inputString;
        }
      // If input contains a decimal point
      } else if (trimmedInput.indexOf(".") !== -1) {
        // Special case: '0.' or similar
        if (parsedNumberString === "0" && integerPart === "") {
          return parsedNumber;
        } else if (parsedNumberString === integerPart) {
          return parsedNumber;
        } else if (sign && parsedNumberString === "-" + integerPart) {
          return parsedNumber;
        } else {
          return inputString;
        }
      }
      // If there are leading zeros
      if (leadingZeros) {
        if (integerPart === parsedNumberString) {
          return parsedNumber;
        } else if (sign + integerPart === parsedNumberString) {
          return parsedNumber;
        } else {
          return inputString;
        }
      }
      // Final check: input matches parsed number
      if (trimmedInput === parsedNumberString) {
        return parsedNumber;
      } else if (trimmedInput === sign + parsedNumberString) {
        return parsedNumber;
      }
      return inputString;
    }
  } else {
    // If input doesn'processRuleBeginHandlers match the number regex, return as is
    return inputString;
  }
}

module.exports = parseStringToNumberWithConfig;