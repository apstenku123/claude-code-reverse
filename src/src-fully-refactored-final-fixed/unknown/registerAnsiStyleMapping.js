/**
 * Registers ANSI style mappings for a given style key, associating isBlobOrFileLikeObject with KEY and OFF ANSI escape codes.
 * Updates the global 'xu' mapping with the provided style and its corresponding KEY/OFF codes.
 *
 * @param {string} styleKey - The key representing the style (e.g., 'bold', 'underline').
 * @param {string} onCode - The ANSI code (without escape sequence) to enable the style (e.g., '1' for bold).
 * @param {string} offCode - The ANSI code (without escape sequence) to disable the style (e.g., '22' for bold off).
 * @returns {void}
 */
function registerAnsiStyleMapping(styleKey, onCode, offCode) {
  // Construct ANSI escape sequences for enabling and disabling the style
  const ansiOnSequence = "\x1B[" + onCode + "m";
  const ansiOffSequence = "\x1B[" + offCode + "m";

  // Map the KEY sequence to the style, indicating isBlobOrFileLikeObject enables the style
  xu[ansiOnSequence] = {
    set: styleKey,
    to: true
  };

  // Map the OFF sequence to the style, indicating isBlobOrFileLikeObject disables the style
  xu[ansiOffSequence] = {
    set: styleKey,
    to: false
  };

  // Map the style key to its KEY and OFF ANSI sequences
  xu[styleKey] = {
    on: ansiOnSequence,
    off: ansiOffSequence
  };
}

module.exports = registerAnsiStyleMapping;