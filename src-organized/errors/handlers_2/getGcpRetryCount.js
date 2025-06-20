/**
 * Retrieves the number of GCP (Google Cloud Platform) retries from the environment variable DETECT_GCP_RETRIES.
 * If the environment variable is not set, returns 0 by default.
 *
 * @returns {number} The number of GCP retries to attempt, as specified by the DETECT_GCP_RETRIES environment variable, or 0 if not set.
 */
function getGcpRetryCount() {
  // Check if the DETECT_GCP_RETRIES environment variable is set
  // If set, convert its value to a number; otherwise, default to 0
  const gcpRetryCount = process.env.DETECT_GCP_RETRIES
    ? Number(process.env.DETECT_GCP_RETRIES)
    : 0;
  return gcpRetryCount;
}

module.exports = getGcpRetryCount;