/**
 * Applies Sentry rate limits to the provided state object based on response headers and status code.
 *
 * @param {Object} currentLimits - The current rate limit state object to update.
 * @param {Object} responseMeta - An object containing response metadata.
 * @param {number} [responseMeta.statusCode] - The HTTP status code from the response.
 * @param {Object} [responseMeta.headers] - The HTTP headers from the response.
 * @param {number} [currentTimestamp=Date.now()] - The current timestamp in milliseconds (defaults to Date.now()).
 * @returns {Object} The updated rate limit state object with new limits applied.
 */
function applySentryRateLimits(
  currentLimits,
  {
    statusCode,
    headers
  },
  currentTimestamp = Date.now()
) {
  // Clone the current limits to avoid mutating the input
  const updatedLimits = { ...currentLimits };

  // Extract Sentry-specific rate limit headers
  const sentryRateLimitsHeader = headers && headers["x-sentry-rate-limits"];
  const retryAfterHeader = headers && headers["retry-after"];

  if (sentryRateLimitsHeader) {
    // Parse the Sentry rate limits header, which may contain multiple limits separated by commas
    for (const rateLimitEntry of sentryRateLimitsHeader.trim().split(",")) {
      // Each entry is colon-separated: <retry_after_seconds>:<categories>:<scope>:<reason_code>:<extra>
      const [
        retryAfterSecondsRaw,
        categories,
        , // scope (unused)
        , // reason_code (unused)
        extra
      ] = rateLimitEntry.split(":", 5);

      // Parse the retry-after value (in seconds), default to 60 if invalid
      const retryAfterSeconds = parseInt(retryAfterSecondsRaw, 10);
      const retryAfterMs = (!isNaN(retryAfterSeconds) ? retryAfterSeconds : 60) * 1000;

      if (!categories) {
        // If no categories are specified, apply the rate limit to all categories
        updatedLimits.all = currentTimestamp + retryAfterMs;
      } else {
        // Otherwise, apply the rate limit to each specified category
        for (const category of categories.split(";")) {
          if (category === "metric_bucket") {
            // Special handling for 'metric_bucket' category
            // Only apply if 'extra' is missing or includes 'custom'
            if (!extra || extra.split(";").includes("custom")) {
              updatedLimits[category] = currentTimestamp + retryAfterMs;
            }
          } else {
            updatedLimits[category] = currentTimestamp + retryAfterMs;
          }
        }
      }
    }
  } else if (retryAfterHeader) {
    // If only the standard Retry-After header is present, apply to all categories
    updatedLimits.all = currentTimestamp + parseTimestampOrDateDifference(retryAfterHeader, currentTimestamp);
  } else if (statusCode === 429) {
    // If HTTP 429 (Too Many Requests), apply a default 60s rate limit to all
    updatedLimits.all = currentTimestamp + 60000;
  }

  return updatedLimits;
}

module.exports = applySentryRateLimits;