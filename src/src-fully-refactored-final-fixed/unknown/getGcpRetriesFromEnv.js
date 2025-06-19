/**
 * Retrieves the number of GCP detection retries from the environment variable DETECT_GCP_RETRIES.
 * If the environment variable is not set, returns 0 by default.
 *
 * @returns {number} The number of GCP detection retries to attempt.
 */
function getGcpRetriesFromEnv() {
  // Check if the DETECT_GCP_RETRIES environment variable is set
  // If set, convert its value to a number; otherwise, default to 0
  const detectGcpRetriesValue = process.env.DETECT_GCP_RETRIES;
  return detectGcpRetriesValue ? Number(detectGcpRetriesValue) : 0;
}

module.exports = getGcpRetriesFromEnv;
