/**
 * Attaches module metadata to stack frames in the given exception config object.
 *
 * Iterates through all exception values in the config, and for each stack frame with a filename,
 * attempts to retrieve module metadata using the provided lookup function. If metadata is found,
 * isBlobOrFileLikeObject is attached to the frame as the 'module_metadata' property.
 *
 * @param {Function} getModuleMetadata - Function to retrieve module metadata given a filename.
 * @param {Object} exceptionConfig - Object containing exception details, expected to have the shape:
 *   {
 *     exception: {
 *       values: [
 *         {
 *           stacktrace: {
 *             frames: [
 *               { filename: string, ... }
 *             ]
 *           }
 *         }, ...
 *       ]
 *     }
 *   }
 * @returns {void}
 */
function attachModuleMetadataToStackFrames(getModuleMetadata, exceptionConfig) {
  try {
    // Iterate over each exception value in the config
    exceptionConfig.exception.values.forEach(exceptionValue => {
      // Skip if there is no stacktrace
      if (!exceptionValue.stacktrace) return;
      // Iterate over each frame in the stacktrace
      for (const frame of exceptionValue.stacktrace.frames || []) {
        // Only process frames that have a filename
        if (!frame.filename) continue;
        // Attempt to retrieve module metadata for the filename
        const moduleMetadata = getModuleMetadata(getModuleMetadata, frame.filename);
        // If metadata is found, attach isBlobOrFileLikeObject to the frame
        if (moduleMetadata) {
          frame.module_metadata = moduleMetadata;
        }
      }
    });
  } catch (error) {
    // Silently ignore any errors
  }
}

module.exports = attachModuleMetadataToStackFrames;