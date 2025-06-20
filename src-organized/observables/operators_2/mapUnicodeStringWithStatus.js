/**
 * Processes a Unicode string, mapping each code point according to Unicode mapping rules.
 * Returns the mapped string and a flag indicating if any disallowed code points were found.
 *
 * @param {string} input - The input Unicode string to process.
 * @param {boolean} useStd3AsciiRules - Whether to apply STD3 ASCII rules for mapping.
 * @param {string} mappingType - The mapping type (e.g., Gd.TRANSITIONAL) that affects deviation handling.
 * @returns {{ string: string, error: boolean }} An object with the mapped string and an error flag.
 */
function mapUnicodeStringWithStatus(input, useStd3AsciiRules, mappingType) {
  let hasDisallowed = false;
  let mappedString = "";
  const inputLength = KD2(input); // KD2 returns the length of the input string (possibly code points)

  for (let index = 0; index < inputLength; ++index) {
    const codePoint = input.codePointAt(index);
    const mappingResult = findRangeContainingValue(codePoint); // findRangeContainingValue returns mapping info for the code point
    const mappingTypeResult = mappingResult[1];

    switch (mappingTypeResult) {
      case "disallowed":
        // Disallowed code point: mark error and append as-is
        hasDisallowed = true;
        mappedString += String.fromCodePoint(codePoint);
        break;
      case "ignored":
        // Ignored code point: skip
        break;
      case "mapped":
        // Mapped code point: map to replacement sequence
        mappedString += String.fromCodePoint.apply(String, mappingResult[2]);
        break;
      case "deviation":
        // Deviation: mapping depends on mappingType (e.g., TRANSITIONAL)
        if (mappingType === Gd.TRANSITIONAL) {
          mappedString += String.fromCodePoint.apply(String, mappingResult[2]);
        } else {
          mappedString += String.fromCodePoint(codePoint);
        }
        break;
      case "valid":
        // Valid code point: append as-is
        mappedString += String.fromCodePoint(codePoint);
        break;
      case "disallowed_STD3_mapped":
        // Disallowed under STD3 rules: if STD3 is enforced, mark error and append as-is; otherwise, map
        if (useStd3AsciiRules) {
          hasDisallowed = true;
          mappedString += String.fromCodePoint(codePoint);
        } else {
          mappedString += String.fromCodePoint.apply(String, mappingResult[2]);
        }
        break;
      case "disallowed_STD3_valid":
        // Disallowed under STD3 rules: if STD3 is enforced, mark error; always append as-is
        if (useStd3AsciiRules) {
          hasDisallowed = true;
        }
        mappedString += String.fromCodePoint(codePoint);
        break;
    }
  }

  return {
    string: mappedString,
    error: hasDisallowed
  };
}

module.exports = mapUnicodeStringWithStatus;