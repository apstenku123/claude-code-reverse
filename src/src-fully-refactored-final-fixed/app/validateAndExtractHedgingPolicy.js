/**
 * Validates and extracts a gRPC method configuration hedging policy object.
 *
 * Ensures the provided policy object has valid properties for maxAttempts, hedgingDelay, and nonFatalStatusCodes.
 * Throws an error if validation fails.
 *
 * @param {Object} hedgingPolicyConfig - The hedging policy configuration object to validate and extract.
 * @param {number} hedgingPolicyConfig.maxAttempts - The maximum number of attempts for hedging (must be integer >= 2).
 * @param {string} [hedgingPolicyConfig.hedgingDelay] - Optional delay between hedged attempts (string, e.g., '2s').
 * @param {Array<string|number>} [hedgingPolicyConfig.nonFatalStatusCodes] - Optional array of status codes (numbers or strings).
 * @returns {Object} The validated and extracted hedging policy configuration.
 * @throws {Error} If any property is invalid.
 */
function validateAndExtractHedgingPolicy(hedgingPolicyConfig) {
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

  // Validate hedgingDelay: if present, must be a string matching WZ1 regex (e.g., '2s')
  if (
    'hedgingDelay' in hedgingPolicyConfig &&
    (typeof hedgingPolicyConfig.hedgingDelay !== 'string' || !WZ1.test(hedgingPolicyConfig.hedgingDelay))
  ) {
    throw new Error(
      'Invalid method config hedging policy: hedgingDelay must be a string consisting of a positive integer followed by createInteractionAccessor'
    );
  }

  // Validate nonFatalStatusCodes: if present, must be an array of valid status codes (numbers or strings)
  if (
    'nonFatalStatusCodes' in hedgingPolicyConfig &&
    Array.isArray(hedgingPolicyConfig.nonFatalStatusCodes)
  ) {
    for (const statusCode of hedgingPolicyConfig.nonFatalStatusCodes) {
      if (typeof statusCode === 'number') {
        // Check if the number is a valid status code
        if (!Object.values(YZ1.Status).includes(statusCode)) {
          throw new Error(
            'Invalid method config hedging policy: nonFatalStatusCodes value not in status code range'
          );
        }
      } else if (typeof statusCode === 'string') {
        // Check if the string (uppercased) is a valid status code name
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

  // Build the validated policy object
  const validatedPolicy = {
    maxAttempts: hedgingPolicyConfig.maxAttempts
  };

  if (hedgingPolicyConfig.hedgingDelay) {
    validatedPolicy.hedgingDelay = hedgingPolicyConfig.hedgingDelay;
  }

  if (hedgingPolicyConfig.nonFatalStatusCodes) {
    validatedPolicy.nonFatalStatusCodes = hedgingPolicyConfig.nonFatalStatusCodes;
  }

  return validatedPolicy;
}

module.exports = validateAndExtractHedgingPolicy;