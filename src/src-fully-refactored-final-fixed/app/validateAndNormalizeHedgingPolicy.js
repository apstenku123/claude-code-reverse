/**
 * Validates and normalizes a gRPC method configuration hedging policy object.
 *
 * Ensures that the provided policy object has valid properties for maxAttempts, hedgingDelay, and nonFatalStatusCodes.
 * Throws descriptive errors if validation fails. Returns a normalized policy object containing only the valid fields.
 *
 * @param {Object} hedgingPolicy - The hedging policy configuration to validate and normalize.
 * @param {number} hedgingPolicy.maxAttempts - The maximum number of attempts for the hedging policy (must be integer >= 2).
 * @param {string} [hedgingPolicy.hedgingDelay] - Optional delay string (e.g., '2s'), must match WZ1 regex.
 * @param {Array<number|string>} [hedgingPolicy.nonFatalStatusCodes] - Optional array of status codes (numbers or names).
 * @returns {Object} Normalized hedging policy object with only valid fields.
 * @throws {Error} If any validation fails.
 */
function validateAndNormalizeHedgingPolicy(hedgingPolicy) {
  // Validate maxAttempts: must exist, be an integer, and at least 2
  if (
    !('maxAttempts' in hedgingPolicy) ||
    !Number.isInteger(hedgingPolicy.maxAttempts) ||
    hedgingPolicy.maxAttempts < 2
  ) {
    throw new Error(
      'Invalid method config hedging policy: maxAttempts must be an integer at least 2'
    );
  }

  // Validate hedgingDelay: if present, must be a string matching WZ1 regex
  if (
    'hedgingDelay' in hedgingPolicy &&
    (typeof hedgingPolicy.hedgingDelay !== 'string' || !WZ1.test(hedgingPolicy.hedgingDelay))
  ) {
    throw new Error(
      'Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by createInteractionAccessor'
    );
  }

  // Validate nonFatalStatusCodes: if present, must be an array of valid status codes
  if (
    'nonFatalStatusCodes' in hedgingPolicy &&
    Array.isArray(hedgingPolicy.nonFatalStatusCodes)
  ) {
    for (const statusCode of hedgingPolicy.nonFatalStatusCodes) {
      if (typeof statusCode === 'number') {
        // Status code must be a valid number in YZ1.Status
        if (!Object.values(YZ1.Status).includes(statusCode)) {
          throw new Error(
            'Invalid method config hedging policy: nonFatalStatusCodes value not in status code range'
          );
        }
      } else if (typeof statusCode === 'string') {
        // Status code must be a valid string name in YZ1.Status (case-insensitive)
        if (!Object.values(YZ1.Status).includes(statusCode.toUpperCase())) {
          throw new Error(
            'Invalid method config hedging policy: nonFatalStatusCodes value not a status code name'
          );
        }
      } else {
        throw new Error(
          'Invalid method config hedging policy: nonFatalStatusCodes value must be a string or number'
        );
      }
    }
  }

  // Build normalized policy object with only valid fields
  const normalizedPolicy = {
    maxAttempts: hedgingPolicy.maxAttempts
  };

  if (hedgingPolicy.hedgingDelay) {
    normalizedPolicy.hedgingDelay = hedgingPolicy.hedgingDelay;
  }

  if (hedgingPolicy.nonFatalStatusCodes) {
    normalizedPolicy.nonFatalStatusCodes = hedgingPolicy.nonFatalStatusCodes;
  }

  return normalizedPolicy;
}

module.exports = validateAndNormalizeHedgingPolicy;