/**
 * Generates a custom string sequence by repeating a base string and appending custom strings.
 *
 * @param {number} sequenceLength - The number of times to repeat the base string and append custom strings.
 * @returns {string} The generated string sequence.
 */
function buildCustomStringSequence(sequenceLength) {
  let resultString = "";

  // Loop to build the sequence
  for (let index = 0; index < sequenceLength; index++) {
    // Always append the base string
    resultString += k30;

    // For all but the last iteration, append a custom string
    if (index < sequenceLength - 1) {
      resultString += generateCustomAString();
    }
  }

  // If at least one iteration occurred, append the final string
  if (sequenceLength) {
    resultString += j30;
  }

  return resultString;
}

module.exports = buildCustomStringSequence;