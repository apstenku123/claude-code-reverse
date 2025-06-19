/**
 * Extracts unified rate limit information from a headers-like object.
 *
 * @param {Map<string, string>|Object} headers - An object or Map containing rate limit headers.
 * @returns {Object} An object containing the unified rate limit status, reset time, and fallback availability.
 */
function extractUnifiedRateLimitInfo(headers) {
  // Get the unified rate limit status, defaulting to 'allowed' if not present
  const status = headers.get("anthropic-ratelimit-unified-status") || "allowed";

  // Get the reset time (as a string), if present
  const resetHeader = headers.get("anthropic-ratelimit-unified-reset");

  // Convert reset time to a number if present, otherwise undefined
  const resetsAt = resetHeader ? Number(resetHeader) : undefined;

  // Check if the fallback is available (strict equality to 'available')
  const unifiedRateLimitFallbackAvailable = headers.get("anthropic-ratelimit-unified-fallback") === "available";

  return {
    status,
    resetsAt,
    unifiedRateLimitFallbackAvailable
  };
}

module.exports = extractUnifiedRateLimitInfo;