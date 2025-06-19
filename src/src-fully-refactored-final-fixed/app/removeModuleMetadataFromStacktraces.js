/**
 * Removes the 'module_metadata' property from each frame in the stacktrace of every exception value.
 *
 * @param {Object} errorEvent - An object containing exception data, expected to have the structure:
 *   {
 *     exception: {
 *       values: [
 *         {
 *           stacktrace: {
 *             frames: [
 *               { module_metadata: any, ... }
 *             ]
 *           }
 *         }, ...
 *       ]
 *     }
 *   }
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the input object in place.
 */
function removeModuleMetadataFromStacktraces(errorEvent) {
  try {
    // Iterate over each exception value in the error event
    errorEvent.exception.values.forEach(exceptionValue => {
      // If there is no stacktrace, skip this exception value
      if (!exceptionValue.stacktrace) return;
      // For each frame in the stacktrace, remove the 'module_metadata' property
      for (const frame of exceptionValue.stacktrace.frames || []) {
        delete frame.module_metadata;
      }
    });
  } catch (err) {
    // Silently ignore any errors encountered during processing
  }
}

module.exports = removeModuleMetadataFromStacktraces;