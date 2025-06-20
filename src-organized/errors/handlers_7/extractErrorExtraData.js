/**
 * Extracts non-standard properties from an Error-like object, optionally including its 'cause',
 * and merges in any properties returned by a custom toJSON method. Error objects often have standard
 * properties (like name, message, stack, etc.), but this function collects any additional properties
 * for serialization or logging purposes.
 *
 * @param {Object} errorObject - The error object to extract extra data from.
 * @param {boolean} includeCause - Whether to include the 'cause' property if present.
 * @returns {Object|null} An object containing the extra properties, or null if extraction fails.
 */
function extractErrorExtraData(errorObject, includeCause) {
  try {
    // List of standard Error properties to ignore
    const standardErrorProps = [
      "name",
      "message",
      "stack",
      "line",
      "column",
      "fileName",
      "lineNumber",
      "columnNumber",
      "toJSON"
    ];

    const extraData = {};

    // Extract all non-standard properties from the error object
    for (const propertyName of Object.keys(errorObject)) {
      if (standardErrorProps.includes(propertyName)) continue;
      const propertyValue = errorObject[propertyName];
      // If the property value is an Error, convert isBlobOrFileLikeObject to string
      extraData[propertyName] = gq.isError(propertyValue) ? propertyValue.toString() : propertyValue;
    }

    // Optionally include the 'cause' property if present
    if (includeCause && errorObject.cause !== undefined) {
      extraData.cause = gq.isError(errorObject.cause)
        ? errorObject.cause.toString()
        : errorObject.cause;
    }

    // If the error object has a custom toJSON method, merge its properties
    if (typeof errorObject.toJSON === "function") {
      const jsonProperties = errorObject.toJSON();
      for (const jsonKey of Object.keys(jsonProperties)) {
        const jsonValue = jsonProperties[jsonKey];
        extraData[jsonKey] = gq.isError(jsonValue) ? jsonValue.toString() : jsonValue;
      }
    }

    return extraData;
  } catch (extractionError) {
    // Log the error in debug builds if extraction fails
    if (rZ9.DEBUG_BUILD) {
      gq.logger.error("Unable to extract extra data from the Error object:", extractionError);
    }
    return null;
  }
}

module.exports = extractErrorExtraData;
