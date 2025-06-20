/**
 * Extracts debug_id values from exception stack frames and adds them as images to the debug_meta.images array in the event object.
 *
 * @param {Object} event - The event object containing exception and debug_meta information.
 * @returns {void} This function mutates the input event object and does not return a value.
 */
function extractDebugMetaImagesFromException(event) {
  /**
   * Map to store code file paths/filenames and their corresponding debug_id values.
   * Key: abs_path or filename from a stack frame.
   * Value: debug_id from the same stack frame.
   */
  const debugIdMap = {};

  try {
    // Iterate over all exception values and their stack frames
    event.exception.values.forEach(exceptionValue => {
      exceptionValue.stacktrace.frames.forEach(frame => {
        // Only process frames that have a debug_id
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
    // Silently ignore any errors during extraction
  }

  // If no debug_id entries were found, exit early
  if (Object.keys(debugIdMap).length === 0) {
    return;
  }

  // Ensure debug_meta and debug_meta.images exist on the event
  event.debug_meta = event.debug_meta || {};
  event.debug_meta.images = event.debug_meta.images || [];
  const imagesArray = event.debug_meta.images;

  // Add a new image entry for each debug_id found
  Object.keys(debugIdMap).forEach(codeFile => {
    imagesArray.push({
      type: "sourcemap",
      code_file: codeFile,
      debug_id: debugIdMap[codeFile]
    });
  });
}

module.exports = extractDebugMetaImagesFromException;