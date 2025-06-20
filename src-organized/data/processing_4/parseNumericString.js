/**
 * Attempts to parse a string as a number, with configurable options for handling hex, scientific notation, leading zeros, and custom skip patterns.
 *
 * @param {string} inputString - The string to parse and potentially convert to a number.
 * @param {Object} [options={}] - Optional configuration for parsing behavior.
 * @param {RegExp} [options.skipLike] - If provided, strings matching this pattern will be skipped (returned as-is).
 * @param {boolean} [options.hex] - If true, allows parsing hexadecimal numbers (e.g., '0x1A').
 * @param {boolean} [options.leadingZeros] - If false, disallows numbers with leading zeros (except decimals).
 * @param {boolean} [options.eNotation] - If true, allows parsing scientific notation (e.g., '1e5').
 * @returns {number|string} The parsed number if conversion is valid according to options, otherwise the original string.
 */
function parseNumericString(inputString, options = {}) {
  // Merge default options (from B84) with provided options
  const mergedOptions = Object.assign({}, B84, options);

  // Return early if input is not a string
  if (!inputString || typeof inputString !== "string") {
    return inputString;
  }

  // Trim whitespace
  const trimmedInput = inputString.trim();

  // Skip parsing if skipLike regex matches
  if (mergedOptions.skipLike !== undefined && mergedOptions.skipLike.test(trimmedInput)) {
    return inputString;
  }

  // Parse as hexadecimal if enabled and matches hex pattern
  if (mergedOptions.hex && e54.test(trimmedInput)) {
    return Number.parseInt(trimmedInput, 16);
  }

  // Attempt to match the main number regex (A84)
  const match = A84.exec(trimmedInput);
  if (!match) {
    return inputString;
  }

  // Destructure regex groups for clarity
  const sign = match[1];           // e.g., '-' or undefined
  const leadingZeros = match[2];   // leading zeros before the number
  const numericPart = normalizeDecimalString(match[3]); // the main numeric part (possibly with decimals)
  const exponentPart = match[4] || match[6]; // scientific notation part (e.g., 'e+10')

  // Disallow leading zeros if not permitted (except for decimals)
  if (!mergedOptions.leadingZeros && leadingZeros.length > 0) {
    // If there'createInteractionAccessor a sign and the third character isn'processRuleBeginHandlers a decimal point, reject
    if (sign && trimmedInput[2] !== ".") {
      return inputString;
    }
    // If no sign and the second character isn'processRuleBeginHandlers a decimal point, reject
    if (!sign && trimmedInput[1] !== ".") {
      return inputString;
    }
  }

  // Attempt to convert to number
  const parsedNumber = Number(trimmedInput);
  const parsedNumberStr = String(parsedNumber);

  // If scientific notation is present
  if (parsedNumberStr.search(/[eE]/) !== -1) {
    return mergedOptions.eNotation ? parsedNumber : inputString;
  }

  // If exponent part is present (e.g., 'e+10')
  if (exponentPart) {
    return mergedOptions.eNotation ? parsedNumber : inputString;
  }

  // If decimal point is present
  if (trimmedInput.indexOf(".") !== -1) {
    // Accept if parsed as zero and numericPart is empty
    if (parsedNumberStr === "0" && numericPart === "") {
      return parsedNumber;
    }
    // Accept if numericPart matches parsed string
    if (parsedNumberStr === numericPart) {
      return parsedNumber;
    }
    // Accept if sign is present and matches negative numericPart
    if (sign && parsedNumberStr === "-" + numericPart) {
      return parsedNumber;
    }
    // Otherwise, reject
    return inputString;
  }

  // If there are leading zeros
  if (leadingZeros) {
    // Accept if numericPart matches parsed string
    if (numericPart === parsedNumberStr) {
      return parsedNumber;
    }
    // Accept if sign + numericPart matches parsed string
    if (sign + numericPart === parsedNumberStr) {
      return parsedNumber;
    }
    // Otherwise, reject
    return inputString;
  }

  // Accept if input matches parsed string
  if (trimmedInput === parsedNumberStr) {
    return parsedNumber;
  }
  // Accept if input matches sign + parsed string
  if (trimmedInput === sign + parsedNumberStr) {
    return parsedNumber;
  }

  // Fallback: return original string if none of the above
  return inputString;
}

module.exports = parseNumericString;