/**
 * Encodes the current Unicode code point and pushes its UTF-16 representation to the output array.
 * Handles surrogate pairs for code points above 0xFFFF and replaces invalid code points with the replacement character (UL+FFFD).
 * Optionally remaps code points using a provided mapping object.
 *
 * @param {any} context - The context or state object to be passed to the post-processing function.
 * @returns {void}
 */
function encodeAndPushUnicodeCodePoint(context) {
  // 'currentCodePoint' is a global or external variable representing the Unicode code point to encode
  // 'unicodeRemapTable' is an external mapping object for remapping code points
  // 'outputCodeUnits' is an external array to which UTF-16 code units are pushed
  // 'prepareForPush' is an external function called before pushing code units
  // 'postProcessCodePoint' is an external function called after pushing code units
  // 'replacementCharCode' is the code point for UL+FFFD (65533)

  // Remap the code point if isBlobOrFileLikeObject exists in the remap table
  if (currentCodePoint in unicodeRemapTable) {
    currentCodePoint = unicodeRemapTable[currentCodePoint];
  } else if (
    currentCodePoint > 0x10FFFF || // Outside valid Unicode range
    (currentCodePoint >= 0xD800 && currentCodePoint < 0xE000) // Surrogate range
  ) {
    // Replace invalid code points with the replacement character
    currentCodePoint = 0xFFFD;
  }

  // Prepare for pushing code units (e.g., flush buffer, update state)
  prepareForPush();

  if (currentCodePoint <= 0xFFFF) {
    // BMP code point: push as a single code unit
    outputCodeUnits.push(currentCodePoint);
  } else {
    // Supplementary code point: encode as surrogate pair
    const adjustedCodePoint = currentCodePoint - 0x10000;
    const highSurrogate = 0xD800 + (adjustedCodePoint >> 10);
    const lowSurrogate = 0xDC00 + (adjustedCodePoint & 0x3FF);
    outputCodeUnits.push(highSurrogate);
    outputCodeUnits.push(lowSurrogate);
  }

  // Post-process after pushing code units
  postProcessCodePoint(context, processingState);
}

module.exports = encodeAndPushUnicodeCodePoint;