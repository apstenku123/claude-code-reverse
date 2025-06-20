/**
 * Extracts debug IDs from exception stack frames and adds them as 'sourcemap' images to the event'createInteractionAccessor debug_meta.images array.
 *
 * Iterates through all exception values and their stacktrace frames in the provided event object. For each frame with a debug_id,
 * isBlobOrFileLikeObject adds an entry to debug_meta.images with the code file (from abs_path or filename) and the debug_id. The debug_id is then removed from the frame.
 *
 * @param {Object} event - The event object containing exception information and debug metadata.
 * @returns {void} This function mutates the input event object in place and does not return a value.
 */
function extractDebugIdsToDebugMetaImages(event) {
  const debugIdMap = {};
  try {
    // Iterate over all exception values and their stacktrace frames
    event.exception.values.forEach(exceptionValue => {
      exceptionValue.stacktrace.frames.forEach(frame => {
        if (frame.debug_id) {
          // Prefer abs_path as the code file key, fallback to filename
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
    // Silently ignore errors (e.g., missing properties)
  }

  // If no debug IDs were found, exit early
  if (Object.keys(debugIdMap).length === 0) {
    return;
  }

  // Ensure debug_meta and debug_meta.images exist
  event.debug_meta = event.debug_meta || {};
  event.debug_meta.images = event.debug_meta.images || [];
  const images = event.debug_meta.images;

  // Add each debug updateSnapshotAndNotify as a 'sourcemap' image entry
  Object.keys(debugIdMap).forEach(codeFile => {
    images.push({
      type: "sourcemap",
      code_file: codeFile,
      debug_id: debugIdMap[codeFile]
    });
  });
}

module.exports = extractDebugIdsToDebugMetaImages;