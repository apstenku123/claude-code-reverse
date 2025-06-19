/**
 * Extracts debug_id mappings from exception stack frames and appends them as sourcemap images to the debug_meta.images array.
 *
 * @param {Object} event - The event object containing exception and debug_meta information.
 * @returns {void} This function mutates the input event object in place.
 */
function extractDebugMetaFromException(event) {
  /**
   * Map of code file paths/filenames to their debug_id values.
   * @type {Object.<string, string>}
   */
  const debugIdMap = {};

  try {
    // Iterate over all exception values and their stack frames
    event.exception.values.forEach(exceptionValue => {
      exceptionValue.stacktrace.frames.forEach(frame => {
        if (frame.debug_id) {
          // Prefer abs_path as the key, fallback to filename
          if (frame.abs_path) {
            debugIdMap[frame.abs_path] = frame.debug_id;
          } else if (frame.filename) {
            debugIdMap[frame.filename] = frame.debug_id;
          }
          // Remove debug_id from the frame after extraction
          delete frame.debug_id;
        }
      });
    });
  } catch (error) {
    // Silently ignore errors if exception structure is not as expected
  }

  // If no debug_id mappings were found, exit early
  if (Object.keys(debugIdMap).length === 0) return;

  // Ensure debug_meta and debug_meta.images exist
  event.debug_meta = event.debug_meta || {};
  event.debug_meta.images = event.debug_meta.images || [];
  const images = event.debug_meta.images;

  // Add each debug_id mapping as a sourcemap image
  Object.keys(debugIdMap).forEach(codeFile => {
    images.push({
      type: "sourcemap",
      code_file: codeFile,
      debug_id: debugIdMap[codeFile]
    });
  });
}

module.exports = extractDebugMetaFromException;