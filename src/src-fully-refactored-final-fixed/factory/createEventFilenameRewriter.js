/**
 * Factory function that creates an event processor for rewriting stacktrace frame filenames.
 *
 * This processor rewrites absolute or Windows-style file paths in stacktrace frames to use a custom prefix,
 * making them more readable and consistent for reporting (e.g., in Sentry events).
 *
 * @param {Object} [options={}] - Configuration options for the processor.
 * @param {string} [options.root] - The root directory to relativize file paths against.
 * @param {string} [options.prefix="app:///"] - The prefix to prepend to rewritten filenames.
 * @param {Function} [options.iteratee] - Optional custom function to rewrite a stacktrace frame.
 * @returns {Object} An object with name, setupOnce, and processEvent methods for integration.
 */
function createEventFilenameRewriter(options = {}) {
  const rootDirectory = options.root;
  const filenamePrefix = options.prefix || "app:///";
  /**
   * Function to rewrite a single stacktrace frame'createInteractionAccessor filename.
   * Handles Windows and Unix absolute paths, converting them to a relative path with a custom prefix.
   *
   * @param {Object} frame - a stacktrace frame object.
   * @returns {Object} The frame with the rewritten filename, if applicable.
   */
  const rewriteFrameFilename = options.iteratee || ((frame) => {
    if (!frame.filename) return frame;
    // Detect if the filename is a Windows absolute path
    const isWindowsPath = /^[a-zA-Z]:\\/.test(frame.filename) || (frame.filename.includes("\\") && !frame.filename.includes("/"));
    // Detect if the filename is a Unix absolute path
    const isUnixPath = /^\//.test(frame.filename);
    if (isWindowsPath || isUnixPath) {
      // Normalize Windows paths to Unix-style
      const normalizedFilename = isWindowsPath
        ? frame.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/")
        : frame.filename;
      // Use relative path from root if provided, else just the basename
      const relativeOrBasename = rootDirectory
        ? ZYA.relative(rootDirectory, normalizedFilename)
        : ZYA.basename(normalizedFilename);
      frame.filename = `${filenamePrefix}${relativeOrBasename}`;
    }
    return frame;
  });

  /**
   * Rewrites all frames in a stacktrace using the iteratee.
   *
   * @param {Object} stacktrace - The stacktrace object.
   * @returns {Object} The stacktrace with rewritten frames.
   */
  function rewriteStacktrace(stacktrace) {
    return {
      ...stacktrace,
      frames: stacktrace && stacktrace.frames && stacktrace.frames.map((frame) => rewriteFrameFilename(frame))
    };
  }

  /**
   * Processes an event, rewriting all stacktrace frame filenames in exception values.
   *
   * @param {Object} event - The event object to process.
   * @returns {Object} The processed event with rewritten filenames.
   */
  function processEventException(event) {
    try {
      return {
        ...event,
        exception: {
          ...event.exception,
          values: event.exception.values.map((exceptionValue) => ({
            ...exceptionValue,
            // Only rewrite stacktrace if present
            ...(exceptionValue.stacktrace && {
              stacktrace: rewriteStacktrace(exceptionValue.stacktrace)
            })
          }))
        }
      };
    } catch (error) {
      // If anything fails, return the original event
      return event;
    }
  }

  return {
    name: YYA, // Preserved external identifier
    setupOnce() {}, // No-op setup function
    /**
     * Processes an event, rewriting stacktrace frame filenames if exception values are present.
     *
     * @param {Object} event - The event to process.
     * @returns {Object} The processed event.
     */
    processEvent(event) {
      let processedEvent = event;
      if (event.exception && Array.isArray(event.exception.values)) {
        processedEvent = processEventException(processedEvent);
      }
      return processedEvent;
    }
  };
}

module.exports = createEventFilenameRewriter;