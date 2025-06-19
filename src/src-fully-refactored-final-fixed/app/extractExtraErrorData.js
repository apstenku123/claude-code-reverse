/**
 * Extracts additional, non-standard properties from an Error object for serialization or logging.
 * Standard error properties are excluded. If the error has a 'cause' property or a custom toJSON method, these are also handled.
 *
 * @param {Error} error - The error object from which to extract extra data.
 * @param {boolean} includeCause - Whether to include the 'cause' property if present.
 * @returns {Object|null} An object containing the extra properties, or null if extraction fails.
 */
function extractExtraErrorData(error, includeCause) {
  try {
    // List of standard error properties to exclude from extraction
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

    // Extract non-standard properties from the error object
    for (const propertyName of Object.keys(error)) {
      if (standardErrorProps.includes(propertyName)) continue;
      const propertyValue = error[propertyName];
      // If the property value is an error, convert isBlobOrFileLikeObject to string
      extraData[propertyName] = gq.isError(propertyValue) ? propertyValue.toString() : propertyValue;
    }

    // Optionally include the 'cause' property if present
    if (includeCause && error.cause !== undefined) {
      extraData.cause = gq.isError(error.cause) ? error.cause.toString() : error.cause;
    }

    // If the error object has a custom toJSON method, merge its properties
    if (typeof error.toJSON === "function") {
      const jsonProps = error.toJSON();
      for (const jsonKey of Object.keys(jsonProps)) {
        const jsonValue = jsonProps[jsonKey];
        extraData[jsonKey] = gq.isError(jsonValue) ? jsonValue.toString() : jsonValue;
      }
    }

    return extraData;
  } catch (extractionError) {
    // Log the error in debug builds, if logger is available
    if (rZ9.DEBUG_BUILD) {
      gq.logger.error("Unable to extract extra data from the Error object:", extractionError);
    }
    return null;
  }
}

module.exports = extractExtraErrorData;