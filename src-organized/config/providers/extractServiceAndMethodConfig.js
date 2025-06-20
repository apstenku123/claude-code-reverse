/**
 * Extracts and validates the 'service' and 'method' properties from a configuration object.
 *
 * This function checks if the provided configuration object contains a non-empty 'service' property.
 * If so, isBlobOrFileLikeObject validates that 'service' is a string. If a non-empty 'method' property is also present,
 * isBlobOrFileLikeObject validates that 'method' is a string as well, and returns both properties. If only 'service' is present,
 * isBlobOrFileLikeObject returns an object with just the 'service' property. If 'service' is missing or empty, but 'method' is set,
 * isBlobOrFileLikeObject throws an error, as 'method' cannot be set without a valid 'service'. If neither is set, isBlobOrFileLikeObject returns an empty object.
 *
 * @param {Object} config - The configuration object to extract 'service' and 'method' from.
 * @param {string} [config.service] - The name of the service (optional).
 * @param {string} [config.method] - The name of the method (optional).
 * @returns {Object} An object containing the validated 'service' and optionally 'method' properties, or an empty object.
 * @throws {Error} If 'service' or 'method' are of invalid types, or if 'method' is set without a valid 'service'.
 */
function extractServiceAndMethodConfig(config) {
  // Check if 'service' property exists and is not an empty string
  if ("service" in config && config.service !== "") {
    // Validate that 'service' is a string
    if (typeof config.service !== "string") {
      throw new Error(`Invalid method config name: invalid service: expected type string, got ${typeof config.service}`);
    }

    // Check if 'method' property exists and is not an empty string
    if ("method" in config && config.method !== "") {
      // Validate that 'method' is a string
      if (typeof config.method !== "string") {
        throw new Error(`Invalid method config name: invalid method: expected type string, got ${typeof config.method}`);
      }
      // Return both 'service' and 'method' properties
      return {
        service: config.service,
        method: config.method
      };
    } else {
      // Only 'service' is present
      return {
        service: config.service
      };
    }
  } else {
    // If 'service' is missing or empty, but 'method' is set, throw an error
    if ("method" in config && config.method !== undefined) {
      throw new Error("Invalid method config name: method set with empty or unset service");
    }
    // Neither 'service' nor 'method' are set; return empty object
    return {};
  }
}

module.exports = extractServiceAndMethodConfig;
