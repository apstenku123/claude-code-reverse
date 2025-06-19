/**
 * Factory function to create an integration that rewrites stacktrace frame filenames to a custom prefix.
 * Primarily used for normalizing stacktrace paths in error events before they are processed or sent.
 *
 * @param {Object} [options={}] - Configuration options for the integration.
 * @param {string} [options.root] - The root directory to relativize filenames against.
 * @param {string} [options.prefix="app:///"] - The prefix to prepend to rewritten filenames.
 * @param {Function} [options.iteratee] - Optional custom function to rewrite a single frame object.
 * @returns {Object} Integration object with name, setupOnce, and processEvent methods.
 */
function createStacktraceFilenameRewriterIntegration(options = {}) {
  const rootDirectory = options.root;
  const filenamePrefix = options.prefix || "app:///";
  const frameIteratee = options.iteratee || ((frame) => {
    if (!frame.filename) return frame;

    // Detect Windows absolute paths (e.g., C:\foo\bar) or backslash usage
    const isWindowsPath = /^[a-zA-Z]:\\/.test(frame.filename) || (frame.filename.includes("\\") && !frame.filename.includes("/"));
    // Detect Unix absolute paths (e.g., /foo/bar)
    const isUnixPath = /^\//.test(frame.filename);

    if (isWindowsPath || isUnixPath) {
      // Normalize Windows paths to Unix-style
      const normalizedFilename = isWindowsPath
        ? frame.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/")
        : frame.filename;
      // Relativize to root if provided, otherwise just use the basename
      const relativeOrBasename = rootDirectory
        ? ZYA.relative(rootDirectory, normalizedFilename)
        : ZYA.basename(normalizedFilename);
      frame.filename = `${filenamePrefix}${relativeOrBasename}`;
    }
    return frame;
  });

  /**
   * Rewrites all stacktrace frames in the event'createInteractionAccessor exception values using the iteratee.
   * @param {Object} event - The event object to process.
   * @returns {Object} The processed event with rewritten stacktrace filenames.
   */
  function rewriteEventStacktraces(event) {
    try {
      return {
        ...event,
        exception: {
          ...event.exception,
          values: event.exception.values.map((exceptionValue) => ({
            ...exceptionValue,
            // If stacktrace exists, rewrite its frames
            ...(exceptionValue.stacktrace && {
              stacktrace: rewriteStacktraceFrames(exceptionValue.stacktrace)
            })
          }))
        }
      };
    } catch (error) {
      // In case of any error, return the original event unmodified
      return event;
    }
  }

  /**
   * Applies the iteratee to all frames in a stacktrace object.
   * @param {Object} stacktrace - The stacktrace object containing frames.
   * @returns {Object} The stacktrace with rewritten frames.
   */
  function rewriteStacktraceFrames(stacktrace) {
    return {
      ...stacktrace,
      frames: stacktrace && stacktrace.frames && stacktrace.frames.map((frame) => frameIteratee(frame))
    };
  }

  return {
    name: YYA, // Preserved external constant for integration name
    setupOnce() {}, // No-op setup
    /**
     * Processes an event, rewriting stacktrace filenames if exception values are present.
     * @param {Object} event - The event to process.
     * @returns {Object} The processed event.
     */
    processEvent(event) {
      let processedEvent = event;
      if (event.exception && Array.isArray(event.exception.values)) {
        processedEvent = rewriteEventStacktraces(processedEvent);
      }
      return processedEvent;
    }
  };
}

module.exports = createStacktraceFilenameRewriterIntegration;