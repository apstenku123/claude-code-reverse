/**
 * Splits a BigInt value into its lower and higher 32-bit unsigned integer parts.
 *
 * @param {bigint} value - The BigInt value to split into 32-bit parts.
 * @returns {{ low: number, high: number }} An object containing the lower and higher 32-bit unsigned integer parts as numbers.
 */
function splitBigIntTo32BitParts(value) {
  // Extract the lower 32 bits as an unsigned integer and convert to Number
  const lower32Bits = Number(BigInt.asUintN(32, value));
  // Shift right by 32 bits, extract the next 32 bits, and convert to Number
  const higher32Bits = Number(BigInt.asUintN(32, value >> BigInt(32)));
  return {
    low: lower32Bits,
    high: higher32Bits
  };
}

module.exports = splitBigIntTo32BitParts;