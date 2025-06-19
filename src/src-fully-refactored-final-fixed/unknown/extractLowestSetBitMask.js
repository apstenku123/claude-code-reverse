/**
 * Extracts and returns a mask based on the lowest set bit in the input bitmask.
 * Depending on the position of the lowest set bit, returns either a constant,
 * a masked value, or the original input. This is typically used for flag or bitmask processing.
 *
 * @param {number} bitmask - The input integer bitmask to process.
 * @returns {number} The extracted mask or processed value based on the lowest set bit.
 */
function extractLowestSetBitMask(bitmask) {
  // Isolate the lowest set bit
  const lowestSetBit = bitmask & -bitmask;

  switch (lowestSetBit) {
    // For single-bit flags 1, 2, 4, 8, 16, 32, return the flag itself
    case 1:
    case 2:
    case 4:
    case 8:
    case 16:
    case 32:
      return lowestSetBit;

    // For flags from 64 up to 2,097,152, mask with 0x3FFF00 (4194240)
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return bitmask & 0x3FFF00; // 4194240

    // For flags from 4,194,304 up to 67,108,864, mask with 0x7C00000 (130023424)
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return bitmask & 0x7C00000; // 130023424

    // For larger single-bit flags, return the flag itself
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return lowestSetBit;

    // Default: return the original bitmask
    default:
      return bitmask;
  }
}

module.exports = extractLowestSetBitMask;
