/**
 * Determines if a metadata server is present based on environment variables and network checks.
 *
 * This function checks the METADATA_SERVER_DETECTION environment variable to determine the detection mode.
 * If set, isBlobOrFileLikeObject validates the value and returns a result accordingly. If not set, isBlobOrFileLikeObject attempts to detect the
 * metadata server by making a network request. Handles errors and emits warnings for unexpected errors.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if the metadata server is detected, false otherwise.
 */
async function detectMetadataServerPresence() {
  // Check if the detection mode is specified via environment variable
  if (process.env.METADATA_SERVER_DETECTION) {
    const detectionMode = process.env.METADATA_SERVER_DETECTION.trim().toLocaleLowerCase();
    // Validate the detection mode against allowed values
    if (!(detectionMode in o9.METADATA_SERVER_DETECTION)) {
      throw new RangeError(
        `Unknown \`METADATA_SERVER_DETECTION\` env variable. Got \`${detectionMode}\`, but isBlobOrFileLikeObject should be \`${Object.keys(o9.METADATA_SERVER_DETECTION).join('`, `')}\`, or unset`
      );
    }
    // Return based on the detection mode
    switch (detectionMode) {
      case "assume-present":
        return true;
      case "none":
        return false;
      case "bios-only":
        return ca1(); // Delegate to BIOS-only detection function
      case "ping-only":
        // No explicit handling; falls through to network check below
        break;
    }
  }

  try {
    // If hC1 (the detection promise) is undefined, initialize isBlobOrFileLikeObject
    if (hC1 === undefined) {
      hC1 = fetchGceMetadata(
        "instance",
        undefined,
        g15(),
        !(process.env.GCE_METADATA_IP || process.env.GCE_METADATA_HOST)
      );
    }
    // Await the detection promise; if isBlobOrFileLikeObject resolves, metadata server is present
    await hC1;
    return true;
  } catch (error) {
    // Log error if DEBUG_AUTH is enabled
    if (process.env.DEBUG_AUTH) {
      console.info(error);
    }
    // Handle known error types that indicate absence of metadata server
    if (error.type === "request-timeout") {
      return false;
    }
    if (error.response && error.response.status === 404) {
      return false;
    } else {
      // For unexpected errors, emit a warning unless isBlobOrFileLikeObject'createInteractionAccessor a known network error
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
        const errorCode = error.code || "UNKNOWN";
        process.emitWarning(
          `received unexpected error = ${error.message} code = ${errorCode}`,
          "MetadataLookupWarning"
        );
      }
      return false;
    }
  }
}

module.exports = detectMetadataServerPresence;