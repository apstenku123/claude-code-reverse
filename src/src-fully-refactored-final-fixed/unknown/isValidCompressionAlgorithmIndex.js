/**
 * Checks if the provided index corresponds to a valid compression algorithm name in cj0.CompressionAlgorithms.
 *
 * @param {number} algorithmIndex - The index to check within cj0.CompressionAlgorithms.
 * @returns {boolean} True if the index is a number and maps to a string compression algorithm name; otherwise, false.
 */
const isValidCompressionAlgorithmIndex = (algorithmIndex) => {
  // Ensure the input is a number and that the corresponding value in cj0.CompressionAlgorithms is a string
  return (
    typeof algorithmIndex === "number" &&
    typeof cj0.CompressionAlgorithms[algorithmIndex] === "string"
  );
};

module.exports = isValidCompressionAlgorithmIndex;
