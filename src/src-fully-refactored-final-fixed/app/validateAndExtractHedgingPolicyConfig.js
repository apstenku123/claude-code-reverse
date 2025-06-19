/**
 * Validates and extracts a hedging policy configuration object.
 *
 * This function checks that the provided configuration object contains valid
 * hedging policy settings, including maxAttempts, hedgingDelay, and
 * nonFatalStatusCodes. It throws descriptive errors if validation fails.
 *
 * @param {Object} hedgingPolicyConfig - The configuration object to validate and extract.
 * @param {number} hedgingPolicyConfig.maxAttempts - The maximum number of attempts (must be integer >= 2).
 * @param {string} [hedgingPolicyConfig.hedgingDelay] - Optional delay string (e.g., '2s').
 * @param {Array<string|number>} [hedgingPolicyConfig.nonFatalStatusCodes] - Optional array of status codes (numbers or strings).
 * @returns {Object} a validated and normalized hedging policy configuration object.
 * @throws {Error} If any validation fails.
 */
function validateAndExtractHedgingPolicyConfig(hedgingPolicyConfig) {
  // Validate maxAttempts: must exist, be an integer, and at least 2
  if (
    !('maxAttempts' in hedgingPolicyConfig) ||
    !Number.isInteger(hedgingPolicyConfig.maxAttempts) ||
    hedgingPolicyConfig.maxAttempts < 2
  ) {
    throw new Error(
      'Invalid method config hedging policy: maxAttempts must be an integer at least 2'
    );
  }

  // Validate hedgingDelay: if present, must be a string matching the expected pattern
  if (
    'hedgingDelay' in hedgingPolicyConfig &&
    (typeof hedgingPolicyConfig.hedgingDelay !== 'string' || !WZ1.test(hedgingPolicyConfig.hedgingDelay))
  ) {
    throw new Error(
      'Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by createInteractionAccessor'
    );
  }

  // Validate nonFatalStatusCodes: if present, must be an array of valid status codes (number or string)
  if (
    'nonFatalStatusCodes' in hedgingPolicyConfig &&
    Array.isArray(hedgingPolicyConfig.nonFatalStatusCodes)
  ) {
    for (const statusCode of hedgingPolicyConfig.nonFatalStatusCodes) {
      if (typeof statusCode === 'number') {
        // Check if the numeric status code is valid
        if (!Object.values(YZ1.Status).includes(statusCode)) {
          throw new Error(
            'Invalid method config hedging policy: nonFatalStatusCodes value not in status code range'
          );
        }
      } else if (typeof statusCode === 'string') {
        // Check if the string status code (uppercased) is valid
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

  // Build the validated config object to return
  const validatedConfig = {
    maxAttempts: hedgingPolicyConfig.maxAttempts
  };

  if (hedgingPolicyConfig.hedgingDelay) {
    validatedConfig.hedgingDelay = hedgingPolicyConfig.hedgingDelay;
  }

  if (hedgingPolicyConfig.nonFatalStatusCodes) {
    validatedConfig.nonFatalStatusCodes = hedgingPolicyConfig.nonFatalStatusCodes;
  }

  return validatedConfig;
}

module.exports = validateAndExtractHedgingPolicyConfig;