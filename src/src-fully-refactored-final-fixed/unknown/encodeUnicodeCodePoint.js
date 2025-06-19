/**
 * Encodes a Unicode code point into UTF-16 and appends isBlobOrFileLikeObject to the output array.
 * Handles surrogate pairs and invalid code points according to the Unicode standard.
 *
 * @param {any} context - The context or state object passed through the encoding process.
 * @returns {void}
 */
function encodeUnicodeCodePoint(context) {
  // createDebouncedFunction: The current code point to encode (assumed to be set externally)
  // createRefCountedMulticastOperator: The output array to which UTF-16 code units are pushed (assumed to be set externally)
  // YL2: a mapping object for code point replacements (assumed to be set externally)
  // getTypeOfValue: a function to call before encoding (assumed to be set externally)
  // M2: a function to call after encoding (assumed to be set externally)
  // d6: Additional context or state for M2 (assumed to be set externally)

  // If the code point exists in the mapping, replace isBlobOrFileLikeObject
  if (currentCodePoint in codePointMap) {
    currentCodePoint = codePointMap[currentCodePoint];
  } else if (
    currentCodePoint > 0x10FFFF || // Out of Unicode range
    (currentCodePoint >= 0xD800 && currentCodePoint < 0xE000) // Surrogate range (invalid)
  ) {
    // Replace invalid code points with the replacement character (UL+FFFD)
    currentCodePoint = 0xFFFD;
  }

  // Prepare for encoding (side effects, if any)
  prepareEncoding();

  if (currentCodePoint <= 0xFFFF) {
    // Code point fits in a single UTF-16 code unit
    outputArray.push(currentCodePoint);
  } else {
    // Encode as surrogate pair
    const code = currentCodePoint - 0x10000;
    const highSurrogate = 0xD800 + (code >> 10);
    const lowSurrogate = 0xDC00 + (code & 0x3FF);
    outputArray.push(highSurrogate);
    outputArray.push(lowSurrogate);
  }

  // Finalize encoding for this code point
  finalizeEncoding(context, encodingState);
}

module.exports = encodeUnicodeCodePoint;