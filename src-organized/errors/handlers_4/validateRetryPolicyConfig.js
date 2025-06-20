/**
 * Validates a retry policy configuration object for method configs.
 * Ensures all required fields are present and correctly formatted.
 *
 * @param {Object} retryPolicyConfig - The retry policy configuration to validate.
 * @param {number} retryPolicyConfig.maxAttempts - The maximum number of retry attempts (integer >= 2).
 * @param {string} retryPolicyConfig.initialBackoff - Initial backoff duration as a string (e.g., '1.0s').
 * @param {string} retryPolicyConfig.maxBackoff - Maximum backoff duration as a string (e.g., '5.0s').
 * @param {number} retryPolicyConfig.backoffMultiplier - Multiplier for backoff (number > 0).
 * @param {Array<string|number>} retryPolicyConfig.retryableStatusCodes - Array of retryable status codes (as numbers or strings).
 * @returns {Object} The validated retry policy configuration object.
 * @throws {Error} If any validation fails.
 */
function validateRetryPolicyConfig(retryPolicyConfig) {
  // Validate maxAttempts: must exist, be an integer, and at least 2
  if (
    !('maxAttempts' in retryPolicyConfig) ||
    !Number.isInteger(retryPolicyConfig.maxAttempts) ||
    retryPolicyConfig.maxAttempts < 2
  ) {
    throw new Error(
      'Invalid method config retry policy: maxAttempts must be an integer at least 2'
    );
  }

  // Validate initialBackoff: must exist, be a string, and match the expected pattern
  if (
    !('initialBackoff' in retryPolicyConfig) ||
    typeof retryPolicyConfig.initialBackoff !== 'string' ||
    !WZ1.test(retryPolicyConfig.initialBackoff)
  ) {
    throw new Error(
      'Invalid method config retry policy: initialBackoff must be a string consisting of a positive integer or decimal followed by createInteractionAccessor'
    );
  }

  // Validate maxBackoff: must exist, be a string, and match the expected pattern
  if (
    !('maxBackoff' in retryPolicyConfig) ||
    typeof retryPolicyConfig.maxBackoff !== 'string' ||
    !WZ1.test(retryPolicyConfig.maxBackoff)
  ) {
    throw new Error(
      'Invalid method config retry policy: maxBackoff must be a string consisting of a positive integer or decimal followed by createInteractionAccessor'
    );
  }

  // Validate backoffMultiplier: must exist, be a number, and greater than 0
  if (
    !('backoffMultiplier' in retryPolicyConfig) ||
    typeof retryPolicyConfig.backoffMultiplier !== 'number' ||
    retryPolicyConfig.backoffMultiplier <= 0
  ) {
    throw new Error(
      'Invalid method config retry policy: backoffMultiplier must be a number greater than 0'
    );
  }

  // Validate retryableStatusCodes: must exist and be a non-empty array
  if (
    !('retryableStatusCodes' in retryPolicyConfig && Array.isArray(retryPolicyConfig.retryableStatusCodes))
  ) {
    throw new Error(
      'Invalid method config retry policy: retryableStatusCodes is required'
    );
  }
  if (retryPolicyConfig.retryableStatusCodes.length === 0) {
    throw new Error(
      'Invalid method config retry policy: retryableStatusCodes must be non-empty'
    );
  }

  // Validate each status code in retryableStatusCodes
  for (const statusCode of retryPolicyConfig.retryableStatusCodes) {
    if (typeof statusCode === 'number') {
      // Status code as number: must be present in YZ1.Status values
      if (!Object.values(YZ1.Status).includes(statusCode)) {
        throw new Error(
          'Invalid method config retry policy: retryableStatusCodes value not in status code range'
        );
      }
    } else if (typeof statusCode === 'string') {
      // Status code as string: must match a status code name (case-insensitive)
      if (!Object.values(YZ1.Status).includes(statusCode.toUpperCase())) {
        throw new Error(
          'Invalid method config retry policy: retryableStatusCodes value not a status code name'
        );
      }
    } else {
      throw new Error(
        'Invalid method config retry policy: retryableStatusCodes value must be a string or number'
      );
    }
  }

  // Return a validated, normalized config object
  return {
    maxAttempts: retryPolicyConfig.maxAttempts,
    initialBackoff: retryPolicyConfig.initialBackoff,
    maxBackoff: retryPolicyConfig.maxBackoff,
    backoffMultiplier: retryPolicyConfig.backoffMultiplier,
    retryableStatusCodes: retryPolicyConfig.retryableStatusCodes
  };
}

module.exports = validateRetryPolicyConfig;
