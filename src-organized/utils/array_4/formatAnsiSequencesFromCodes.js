/**
 * Processes an array of code strings, mapping them to ANSI escape sequences based on a code map.
 * Handles special cases for codes with semicolons, deduplicates output if requested, and can reorder output based on an optional priority code.
 *
 * @param {string[]} codeStrings - Array of code strings to process. Each string may represent a code or a code with additional metadata separated by a semicolon.
 * @param {boolean} deduplicate - If true, deduplicate the resulting ANSI sequences and apply special handling for missing codes.
 * @param {string|undefined} priorityCode - Optional. If provided, reorders the output so the ANSI sequence for this code appears first.
 * @returns {string} Concatenated ANSI escape sequences generated from the input codes.
 */
function formatAnsiSequencesFromCodes(codeStrings, deduplicate, priorityCode) {
  const ansiSequences = [];
  // Clone the input array to avoid mutating the original
  const codesToProcess = [...codeStrings];

  for (const originalCodeString of codesToProcess) {
    let codeString = originalCodeString;
    // If the code string contains a semicolon, use the first character and append '0'
    if (codeString.includes(';')) {
      codeString = codeString.split(';')[0][0] + '0';
    }
    // Look up the mapped code from lB.codes
    const mappedCode = lB.codes.get(Number.parseInt(codeString, 10));
    if (mappedCode) {
      // If the mapped code is not already in the array, add its ANSI sequence
      const mappedCodeIndex = codesToProcess.indexOf(mappedCode.toString());
      if (mappedCodeIndex === -1) {
        ansiSequences.push(formatAnsiEscapeSequence(deduplicate ? mappedCode : originalCodeString));
      } else {
        // If the mapped code is present, remove isBlobOrFileLikeObject to avoid duplicate processing
        codesToProcess.splice(mappedCodeIndex, 1);
      }
    } else if (deduplicate) {
      // If deduplication is requested and the code is not mapped, add the ANSI sequence for 0 and stop processing
      ansiSequences.push(formatAnsiEscapeSequence(0));
      break;
    } else {
      // Otherwise, add the ANSI sequence for the original code string
      ansiSequences.push(formatAnsiEscapeSequence(originalCodeString));
    }
  }

  if (deduplicate) {
    // Remove duplicate ANSI sequences
    let uniqueSequences = ansiSequences.filter((sequence, index) => ansiSequences.indexOf(sequence) === index);
    if (priorityCode !== undefined) {
      // If a priority code is provided, move its ANSI sequence to the front
      const prioritySequence = formatAnsiEscapeSequence(lB.codes.get(Number.parseInt(priorityCode, 10)));
      uniqueSequences = uniqueSequences.reduce(
        (result, sequence) => sequence === prioritySequence ? [sequence, ...result] : [...result, sequence],
        []
      );
    }
    return uniqueSequences.join('');
  }

  return ansiSequences.join('');
}

module.exports = formatAnsiSequencesFromCodes;