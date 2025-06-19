/**
 * Processes a Unicode string by mapping, filtering, or flagging code points according to Unicode normalization rules.
 * Handles various mapping types (disallowed, ignored, mapped, deviation, valid, disallowed_STD3_mapped, disallowed_STD3_valid)
 * and returns the processed string along with an error flag if any disallowed code points were found.
 *
 * @param {string} inputString - The Unicode string to process.
 * @param {boolean} useStd3AsciiRules - Whether to apply STD3 ASCII rules for stricter validation.
 * @param {string} mappingType - The mapping type to use (e.g., Gd.TRANSITIONAL).
 * @returns {{ string: string, error: boolean }} - The processed string and an error flag.
 */
function processUnicodeStringWithMapping(inputString, useStd3AsciiRules, mappingType) {
  let hasError = false;
  let resultString = "";
  // Get the length of the string after replacing a specific pattern (Yo6) with underscores
  const processedLength = getStringLengthWithPatternReplaced(inputString);

  for (let index = 0; index < processedLength; ++index) {
    const codePoint = inputString.codePointAt(index);
    // findRangeContainingValue returns an array where the second element is the mapping type, and the third (if present) is the mapped code points
    const mappingInfo = findRangeContainingValue(codePoint);
    const mappingCategory = mappingInfo[1];
    const mappedCodePoints = mappingInfo[2];

    switch (mappingCategory) {
      case "disallowed":
        hasError = true;
        resultString += String.fromCodePoint(codePoint);
        break;
      case "ignored":
        // normalizeToError nothing, skip this code point
        break;
      case "mapped":
        // Map to the provided code points
        resultString += String.fromCodePoint.apply(String, mappedCodePoints);
        break;
      case "deviation":
        // Transitional mapping if specified, otherwise keep original
        if (mappingType === Gd.TRANSITIONAL) {
          resultString += String.fromCodePoint.apply(String, mappedCodePoints);
        } else {
          resultString += String.fromCodePoint(codePoint);
        }
        break;
      case "valid":
        // Keep the code point as is
        resultString += String.fromCodePoint(codePoint);
        break;
      case "disallowed_STD3_mapped":
        if (useStd3AsciiRules) {
          hasError = true;
          resultString += String.fromCodePoint(codePoint);
        } else {
          resultString += String.fromCodePoint.apply(String, mappedCodePoints);
        }
        break;
      case "disallowed_STD3_valid":
        if (useStd3AsciiRules) {
          hasError = true;
        }
        resultString += String.fromCodePoint(codePoint);
        break;
      // No default
    }
  }

  return {
    string: resultString,
    error: hasError
  };
}

module.exports = processUnicodeStringWithMapping;