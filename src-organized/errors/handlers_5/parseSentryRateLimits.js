/**
 * Parses Sentry rate limit and retry-after headers to determine when requests can be retried.
 *
 * @param {Object} baseLimits - The base object to extend with rate limit information.
 * @param {Object} responseMeta - The response metadata containing statusCode and headers.
 * @param {number} [currentTimestamp=Date.now()] - The current timestamp in milliseconds.
 * @returns {Object} An object containing updated rate limit information.
 */
function parseSentryRateLimits(
  baseLimits,
  {
    statusCode,
    headers
  },
  currentTimestamp = Date.now()
) {
  // Clone the base limits object to avoid mutating the input
  const updatedLimits = {
    ...baseLimits
  };

  // Extract Sentry-specific rate limit and retry-after headers
  const sentryRateLimitsHeader = headers && headers["x-sentry-rate-limits"];
  const retryAfterHeader = headers && headers["retry-after"];

  if (sentryRateLimitsHeader) {
    // The x-sentry-rate-limits header can contain multiple limits separated by commas
    const limits = sentryRateLimitsHeader.trim().split(",");
    for (const limitEntry of limits) {
      // Each limit entry is colon-separated: <retry_after_seconds>:<categories>:<scope>:<reason>:<extra>
      // We only care about the first, second, and fifth fields
      const [retryAfterStr, categories, , , extra] = limitEntry.split(":", 5);
      const retryAfterSeconds = parseInt(retryAfterStr, 10);
      // Default to 60 seconds if retryAfterSeconds is not a number
      const retryAfterMs = (!isNaN(retryAfterSeconds) ? retryAfterSeconds : 60) * 1000;

      if (!categories) {
        // If no categories are specified, apply the limit to all categories
        updatedLimits.all = currentTimestamp + retryAfterMs;
      } else {
        // Otherwise, apply the limit to each specified category
        for (const category of categories.split(";")) {
          if (category === "metric_bucket") {
            // For metric_bucket, only apply if extra is missing or contains 'custom'
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
    // If no Sentry-specific header, fall back to retry-after header (in seconds or HTTP-date)
    updatedLimits.all = currentTimestamp + parseTimestampOrDateDifference(retryAfterHeader, currentTimestamp);
  } else if (statusCode === 429) {
    // If status code is 429 (Too Many Requests), default to 60 seconds
    updatedLimits.all = currentTimestamp + 60000;
  }

  return updatedLimits;
}

module.exports = parseSentryRateLimits;