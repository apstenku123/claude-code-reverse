/**
 * Validates and formats a retry throttling configuration object.
 * Ensures that the configuration contains valid 'maxTokens' and 'tokenRatio' properties,
 * both of which must be numbers within specified ranges. Returns a new object with these
 * properties rounded to three decimal places.
 *
 * @param {Object} retryThrottlingConfig - The configuration object to validate and format.
 * @param {number} retryThrottlingConfig.maxTokens - The maximum number of tokens allowed (must be in (0, 1000]).
 * @param {number} retryThrottlingConfig.tokenRatio - The token ratio (must be greater than 0).
 * @returns {{ maxTokens: number, tokenRatio: number }} - The validated and formatted configuration object.
 * @throws {Error} If validation fails for any property.
 */
function validateAndFormatRetryThrottlingConfig(retryThrottlingConfig) {
  // Validate 'maxTokens' property
  if (
    !('maxTokens' in retryThrottlingConfig) ||
    typeof retryThrottlingConfig.maxTokens !== 'number' ||
    retryThrottlingConfig.maxTokens <= 0 ||
    retryThrottlingConfig.maxTokens > 1000
  ) {
    throw new Error(
      "Invalid retryThrottling: maxTokens must be a number in (0, 1000]"
    );
  }

  // Validate 'tokenRatio' property
  if (
    !('tokenRatio' in retryThrottlingConfig) ||
    typeof retryThrottlingConfig.tokenRatio !== 'number' ||
    retryThrottlingConfig.tokenRatio <= 0
  ) {
    throw new Error(
      "Invalid retryThrottling: tokenRatio must be a number greater than 0"
    );
  }

  // Return a new object with values rounded to three decimal places
  return {
    maxTokens: +retryThrottlingConfig.maxTokens.toFixed(3),
    tokenRatio: +retryThrottlingConfig.tokenRatio.toFixed(3)
  };
}

module.exports = validateAndFormatRetryThrottlingConfig;
