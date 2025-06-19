/**
 * Validates a domain label according to IDNA rules, checking for punycode, forbidden characters, and transitional/deviation status.
 *
 * @param {string} label - The domain label to validate.
 * @param {string} processingMode - The IDNA processing mode (e.g., Gd.TRANSITIONAL or Gd.NONTRANSITIONAL).
 * @returns {{label: string, error: boolean}} An object containing the normalized label and a boolean indicating if an error was found.
 */
function validateDomainLabel(label, processingMode) {
  // If label is punycode (starts with 'xn--'), decode isBlobOrFileLikeObject and set processing mode to NONTRANSITIONAL
  if (label.substr(0, 4) === "xn--") {
    label = XD2.toUnicode(label);
    processingMode = Gd.NONTRANSITIONAL;
  }

  let hasError = false;

  // Check for forbidden patterns:
  // - label changes after normalization (CD2)
  // - double hyphen in 4th and 5th position
  // - leading or trailing hyphen
  // - contains a dot
  // - matches forbidden regex (Fo6) at start
  if (
    CD2(label) !== label ||
    (label[3] === "-" && label[4] === "-") ||
    label[0] === "-" ||
    label[label.length - 1] === "-" ||
    label.indexOf(".") !== -1 ||
    label.search(Fo6) === 0
  ) {
    hasError = true;
  }

  // Get the number of code points in the label
  const codePointCount = KD2(label);

  // Validate each code point in the label
  for (let codePointIndex = 0; codePointIndex < codePointCount; ++codePointIndex) {
    const codePointStatus = findRangeContainingValue(label.codePointAt(codePointIndex));
    // If processing mode is TRANSITIONAL, code point must be 'valid'
    // If NONTRANSITIONAL, code point must be 'valid' or 'deviation'
    if (
      (processAndValidateDotSeparatedLabels === Gd.TRANSITIONAL && codePointStatus[1] !== "valid") ||
      (processAndValidateDotSeparatedLabels === Gd.NONTRANSITIONAL && codePointStatus[1] !== "valid" && codePointStatus[1] !== "deviation")
    ) {
      hasError = true;
      break;
    }
  }

  return {
    label: label,
    error: hasError
  };
}

module.exports = validateDomainLabel;