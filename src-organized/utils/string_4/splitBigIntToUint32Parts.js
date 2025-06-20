/**
 * Splits a 64-bit BigInt into its lower and higher 32-bit unsigned integer parts.
 *
 * @param {BigInt} bigIntValue - The 64-bit BigInt to split into 32-bit parts.
 * @returns {{ low: number, high: number }} An object containing the lower and higher 32-bit unsigned integer parts as numbers.
 */
function splitBigIntToUint32Parts(bigIntValue) {
  // Extract the lower 32 bits as an unsigned integer
  const low = Number(BigInt.asUintN(32, bigIntValue));
  // Shift right by 32 bits, then extract the lower 32 bits as the high part
  const high = Number(BigInt.asUintN(32, bigIntValue >> BigInt(32)));
  return {
    low,
    high
  };
}

module.exports = splitBigIntToUint32Parts;