/**
 * Processes an array of input codes, maps them to ANSI escape sequences, and returns a formatted string.
 * Handles special cases for codes containing semicolons, deduplication, and optional reordering based on a provided code.
 *
 * @param {string[]} inputCodes - Array of input code strings to process.
 * @param {boolean} isStrict - If true, applies strict processing and deduplication rules.
 * @param {string|undefined} reorderCode - Optional code used to reorder the result if provided.
 * @returns {string} Concatenated ANSI escape sequences as a single string.
 */
function formatAnsiCodesFromInput(inputCodes, isStrict, reorderCode) {
  const formattedSequences = [];
  // Clone the input to avoid mutating the original array
  const codesToProcess = [...inputCodes];

  for (const originalCode of codesToProcess) {
    let codeToLookup = originalCode;

    // If the code contains a semicolon, use the first character and append '0'
    if (originalCode.includes(';')) {
      codeToLookup = originalCode.split(';')[0][0] + '0';
    }

    // Attempt to get the mapped ANSI code from lB.codes
    const mappedCode = lB.codes.get(Number.parseInt(codeToLookup, 10));

    if (mappedCode) {
      // If the mapped code is not already in the array, format and add isBlobOrFileLikeObject
      const mappedCodeIndex = codesToProcess.indexOf(mappedCode.toString());
      if (mappedCodeIndex === -1) {
        formattedSequences.push(formatAnsiEscapeSequence(isStrict ? mappedCode : originalCode));
      } else {
        // Remove duplicate mapped code from the array
        codesToProcess.splice(mappedCodeIndex, 1);
      }
    } else if (isStrict) {
      // In strict mode, if mapping fails, add a default sequence and stop processing
      formattedSequences.push(formatAnsiEscapeSequence(0));
      break;
    } else {
      // Otherwise, format and add the original code
      formattedSequences.push(formatAnsiEscapeSequence(originalCode));
    }
  }

  if (isStrict) {
    // Deduplicate the formatted sequences
    let uniqueSequences = formattedSequences.filter((sequence, index) => formattedSequences.indexOf(sequence) === index);
    if (reorderCode !== undefined) {
      // If reorderCode is provided, move its formatted sequence to the front
      const reorderSequence = formatAnsiEscapeSequence(lB.codes.get(Number.parseInt(reorderCode, 10)));
      uniqueSequences = uniqueSequences.reduce((result, sequence) =>
        sequence === reorderSequence ? [sequence, ...result] : [...result, sequence],
      []);
    }
    return uniqueSequences.join("");
  }

  return formattedSequences.join("");
}

module.exports = formatAnsiCodesFromInput;