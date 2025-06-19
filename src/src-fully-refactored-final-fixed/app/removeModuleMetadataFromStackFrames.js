/**
 * Removes the 'module_metadata' property from all stack frames in each exception value.
 *
 * @param {Object} exceptionContainer - An object containing an 'exception' property with a 'values' array.
 * @returns {void}
 *
 * Iterates through each exception value, and if a stacktrace exists, removes the 'module_metadata' property from each frame.
 * Any errors encountered during processing are silently ignored.
 */
function removeModuleMetadataFromStackFrames(exceptionContainer) {
  try {
    // Iterate over each exception value in the container
    exceptionContainer.exception.values.forEach((exceptionValue) => {
      // Proceed only if a stacktrace exists
      if (!exceptionValue.stacktrace) return;
      // Remove 'module_metadata' from each frame in the stacktrace
      for (const frame of exceptionValue.stacktrace.frames || []) {
        delete frame.module_metadata;
      }
    });
  } catch (error) {
    // Silently ignore any errors encountered during processing
  }
}

module.exports = removeModuleMetadataFromStackFrames;