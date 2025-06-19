/**
 * Determines if the Google Compute Engine (GCE) metadata server is present and accessible.
 * The function checks the METADATA_SERVER_DETECTION environment variable to control detection behavior.
 * If not set, isBlobOrFileLikeObject attempts to detect the metadata server by making a network request.
 * Handles various error scenarios and emits warnings for unexpected errors.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if the metadata server is detected, false otherwise.
 */
async function detectGceMetadataServer() {
  // Check if detection mode is set via environment variable
  if (process.env.METADATA_SERVER_DETECTION) {
    const detectionMode = process.env.METADATA_SERVER_DETECTION.trim().toLocaleLowerCase();
    // Validate detection mode against allowed values
    if (!(detectionMode in o9.METADATA_SERVER_DETECTION)) {
      throw new RangeError(
        `Unknown \`METADATA_SERVER_DETECTION\` env variable. Got \`${detectionMode}\`, but isBlobOrFileLikeObject should be \`${Object.keys(o9.METADATA_SERVER_DETECTION).join('`, `')}\`, or unset`
      );
    }
    switch (detectionMode) {
      case "assume-present":
        // Always assume metadata server is present
        return true;
      case "none":
        // Always assume metadata server is absent
        return false;
      case "bios-only":
        // Use BIOS-based detection
        return ca1();
      case "ping-only":
        // No explicit return; falls through to network detection
        break;
    }
  }

  try {
    // Lazy initialization of metadata server check promise
    if (typeof hC1 === 'undefined') {
      hC1 = fetchGceMetadata(
        "instance",
        undefined,
        g15(),
        !(process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST)
      );
    }
    // Await the check and return true if successful
    await hC1;
    return true;
  } catch (error) {
    // Log error details if debugging is enabled
    if (process.env.DEBUG_AUTH) {
      console.info(error);
    }
    // Handle known error types that indicate absence of metadata server
    if (error.type === "request-timeout") {
      return false;
    }
    if (error.response && error.response.status === 404) {
      return false;
    }
    // Handle unexpected errors and emit a warning
    const knownNetworkErrorCodes = [
      "EHOSTDOWN",
      "EHOSTUNREACH",
      "ENETUNREACH",
      "ENOENT",
      "ENOTFOUND",
      "ECONNREFUSED"
    ];
    const isKnownNetworkError = error.code && knownNetworkErrorCodes.includes(error.code);
    if (!isKnownNetworkError) {
      const errorCode = error.code ? error.code : "UNKNOWN";
      process.emitWarning(
        `received unexpected error = ${error.message} code = ${errorCode}`,
        "MetadataLookupWarning"
      );
    }
    return false;
  }
}

module.exports = detectGceMetadataServer;
