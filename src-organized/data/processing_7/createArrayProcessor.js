/**
 * Factory function to create an event processor that rewrites stacktrace filenames and processes exception events.
 *
 * @param {Object} [options={}] - Configuration options for the processor.
 * @param {string} [options.root] - The root directory to relativize filenames against.
 * @param {string} [options.prefix="app:///"] - The prefix to prepend to rewritten filenames.
 * @param {Function} [options.iteratee] - Optional custom function to process each frame object.
 * @returns {Object} Processor object with name, setupOnce, and processEvent methods.
 */
function createArrayProcessor(options = {}) {
  const {
    root: rootDirectory,
    prefix: filenamePrefix = "app:///",
    iteratee: frameIteratee
  } = options;

  /**
   * Default iteratee to rewrite stack frame filenames to use a custom prefix and normalized path.
   *
   * @param {Object} frame - a stack frame object.
   * @returns {Object} The processed frame object with a rewritten filename if applicable.
   */
  const defaultFrameIteratee = (frame) => {
    if (!frame.filename) return frame;

    // Detect Windows absolute paths (e.g., C:\foo\bar.js) or backslash-only paths
    const isWindowsPath = /^[a-zA-Z]:\\/.test(frame.filename) || (frame.filename.includes("\\") && !frame.filename.includes("/"));
    // Detect Unix absolute paths (e.g., /foo/bar.js)
    const isUnixPath = /^\//.test(frame.filename);

    if (isWindowsPath || isUnixPath) {
      // Normalize path: remove drive letter and convert backslashes to slashes for Windows
      const normalizedPath = isWindowsPath
        ? frame.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/")
        : frame.filename;
      // Relativize path if rootDirectory is provided, otherwise use basename
      const relativeOrBasename = rootDirectory
        ? ZYA.relative(rootDirectory, normalizedPath)
        : ZYA.basename(normalizedPath);
      frame.filename = `${filenamePrefix}${relativeOrBasename}`;
    }
    return frame;
  };

  // Use the provided iteratee or the default one
  const processFrame = frameIteratee || defaultFrameIteratee;

  /**
   * Processes a stacktrace object by rewriting all frame filenames.
   *
   * @param {Object} stacktrace - The stacktrace object containing frames.
   * @returns {Object} The processed stacktrace with rewritten frame filenames.
   */
  function processStacktrace(stacktrace) {
    return {
      ...stacktrace,
      frames: stacktrace && stacktrace.frames && stacktrace.frames.map(frame => processFrame(frame))
    };
  }

  /**
   * Processes an event object, rewriting stacktrace filenames in all exception values.
   *
   * @param {Object} event - The event object to process.
   * @returns {Object} The processed event object.
   */
  function processExceptionEvent(event) {
    try {
      return {
        ...event,
        exception: {
          ...event.exception,
          values: event.exception.values.map(exceptionValue => ({
            ...exceptionValue,
            // If stacktrace exists, process isBlobOrFileLikeObject
            ...(exceptionValue.stacktrace && {
              stacktrace: processStacktrace(exceptionValue.stacktrace)
            })
          }))
        }
      };
    } catch (error) {
      // In case of any error, return the original event unmodified
      return event;
    }
  }

  return {
    /**
     * Name of the processor (external constant).
     */
    name: YYA,

    /**
     * No-op setup method for interface compatibility.
     */
    setupOnce() {},

    /**
     * Processes an event, rewriting stacktrace filenames if exception values are present.
     *
     * @param {Object} event - The event to process.
     * @returns {Object} The processed event.
     */
    processEvent(event) {
      let processedEvent = event;
      if (event.exception && Array.isArray(event.exception.values)) {
        processedEvent = processExceptionEvent(processedEvent);
      }
      return processedEvent;
    }
  };
}

module.exports = createArrayProcessor;