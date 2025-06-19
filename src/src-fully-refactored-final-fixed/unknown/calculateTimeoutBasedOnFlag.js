/**
 * Calculates a timeout value or error code based on a provided flag and base timeout.
 *
 * @param {number} flag - a bitmask or flag value that determines the timeout calculation.
 * @param {number} baseTimeout - The base timeout value to be used in calculations.
 * @returns {number} The calculated timeout value, or -1 if the flag is unsupported.
 */
function calculateTimeoutBasedOnFlag(flag, baseTimeout) {
  // Flags that result in a short timeout
  const shortTimeoutFlags = [1, 2, 4];
  // Flags that result in a long timeout
  const longTimeoutFlags = [
    8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768,
    65536, 131072, 262144, 524288, 1048576, 2097152
  ];
  // Flags that are unsupported and return -1
  const unsupportedFlags = [
    4194304, 8388608, 16777216, 33554432, 67108864,
    134217728, 268435456, 536870912, 1073741824
  ];

  if (shortTimeoutFlags.includes(flag)) {
    // For short timeout flags, add 250 to the base timeout
    return baseTimeout + 250;
  }

  if (longTimeoutFlags.includes(flag)) {
    // For long timeout flags, add 5000 to the base timeout
    return baseTimeout + 5000;
  }

  if (unsupportedFlags.includes(flag)) {
    // For unsupported flags, return -1
    return -1;
  }

  // Default case: return -1 for any other flag
  return -1;
}

module.exports = calculateTimeoutBasedOnFlag;