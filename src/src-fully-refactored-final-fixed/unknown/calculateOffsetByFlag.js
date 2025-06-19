/**
 * Calculates an offset or returns an error code based on the provided flag value.
 *
 * This function takes a numeric flag and a base value, then determines the appropriate offset
 * or error code to return based on the flag'createInteractionAccessor value. Certain flag values result in a fixed offset
 * added to the base value, while others return an error code (-1).
 *
 * @param {number} flag - The flag value used to determine the offset or error code.
 * @param {number} baseValue - The base value to which an offset may be added.
 * @returns {number} The calculated offset (baseValue + offset) or -1 if the flag is not recognized.
 */
function calculateOffsetByFlag(flag, baseValue) {
  // Flags that result in a +250 offset
  const smallOffsetFlags = [1, 2, 4];

  // Flags that result in a +5000 offset
  const largeOffsetFlags = [
    8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
    65536, 131072, 262144, 524288, 1048576, 2097152
  ];

  // Flags that result in an error code (-1)
  const errorFlags = [
    4194304, 8388608, 16777216, 33554432, 67108864,
    134217728, 268435456, 536870912, 1073741824
  ];

  if (smallOffsetFlags.includes(flag)) {
    // For small flags, add 250 to the base value
    return baseValue + 250;
  }

  if (largeOffsetFlags.includes(flag)) {
    // For large flags, add 5000 to the base value
    return baseValue + 5000;
  }

  if (errorFlags.includes(flag)) {
    // For error flags, return -1
    return -1;
  }

  // For any other flag, return -1 as an error code
  return -1;
}

module.exports = calculateOffsetByFlag;
