/**
 * Calculates a timeout threshold based on the provided event type and base value.
 *
 * This function maps specific event type codes to a timeout threshold value. For certain event types,
 * isBlobOrFileLikeObject adds a fixed offset (250 or 5000) to the base value. For other event types, isBlobOrFileLikeObject returns -1 to indicate
 * that no timeout should be set or the event type is unsupported.
 *
 * @param {number} eventTypeCode - The numeric code representing the event type.
 * @param {number} baseTimeoutValue - The base timeout value to which an offset may be added.
 * @returns {number} The calculated timeout threshold, or -1 if the event type is unsupported.
 */
function calculateTimeoutThreshold(eventTypeCode, baseTimeoutValue) {
  // Event types that require a small offset
  const smallOffsetEventTypes = [1, 2, 4];
  // Event types that require a large offset
  const largeOffsetEventTypes = [
    8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536,
    131072, 262144, 524288, 1048576, 2097152
  ];
  // Event types that are unsupported (return -1)
  const unsupportedEventTypes = [
    4194304, 8388608, 16777216, 33554432, 67108864,
    134217728, 268435456, 536870912, 1073741824
  ];

  if (smallOffsetEventTypes.includes(eventTypeCode)) {
    // For small offset event types, add 250 to the base value
    return baseTimeoutValue + 250;
  }

  if (largeOffsetEventTypes.includes(eventTypeCode)) {
    // For large offset event types, add 5000 to the base value
    return baseTimeoutValue + 5000;
  }

  if (unsupportedEventTypes.includes(eventTypeCode)) {
    // For unsupported event types, return -1
    return -1;
  }

  // Default case: event type not recognized, return -1
  return -1;
}

module.exports = calculateTimeoutThreshold;