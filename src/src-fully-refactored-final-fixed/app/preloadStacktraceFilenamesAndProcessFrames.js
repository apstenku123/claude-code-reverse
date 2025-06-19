/**
 * Preloads unique stacktrace filenames from exception frames and processes stacktrace frames if present.
 *
 * This function checks if the provided event object contains exception values with stacktraces. It collects all unique filenames from stacktrace frames that are not already cached, preloads them asynchronously, and then processes the stacktrace frames if the configuration allows.
 *
 * @param {Object} event - The event object, expected to possibly contain exception values with stacktraces.
 * @param {number} configLevel - The configuration level that determines if processing should occur (must be > 0).
 * @returns {Promise<Object>} The original event object, after any asynchronous processing is complete.
 */
async function preloadStacktraceFilenamesAndProcessFrames(event, configLevel) {
  // Track which filenames have already been queued for preloading
  const preloadedFilenames = {};
  // Collect promises for preloading filenames
  const preloadPromises = [];

  // Check if configLevel allows processing and if event has exception values with stacktraces
  if (
    configLevel > 0 &&
    pN1([
      event,
      "access",
      exceptionObj => exceptionObj.exception,
      "optionalAccess",
      exceptionObj => exceptionObj.values
    ])
  ) {
    // Iterate over each exception value
    for (const exception of event.exception.values) {
      // Skip if no stacktrace frames
      if (!pN1([
        exception,
        "access",
        stacktraceObj => stacktraceObj.stacktrace,
        "optionalAccess",
        stacktraceObj => stacktraceObj.frames
      ])) {
        continue;
      }
      // Iterate frames in reverse order
      for (
        let frameIndex = exception.stacktrace.frames.length - 1;
        frameIndex >= 0;
        frameIndex--
      ) {
        const frame = exception.stacktrace.frames[frameIndex];
        // If frame has a filename, and isBlobOrFileLikeObject'createInteractionAccessor not already preloaded or cached, queue isBlobOrFileLikeObject for preloading
        if (
          frame.filename &&
          !preloadedFilenames[frame.filename] &&
          !d91.get(frame.filename)
        ) {
          preloadPromises.push(getOrFetchAndCacheSplitLines(frame.filename));
          preloadedFilenames[frame.filename] = true;
        }
      }
    }
  }

  // Await all preloading operations if any
  if (preloadPromises.length > 0) {
    await Promise.all(preloadPromises);
  }

  // After preloading, process stacktrace frames if configLevel allows
  if (
    configLevel > 0 &&
    pN1([
      event,
      "access",
      exceptionObj => exceptionObj.exception,
      "optionalAccess",
      exceptionObj => exceptionObj.values
    ])
  ) {
    for (const exception of event.exception.values) {
      if (exception.stacktrace && exception.stacktrace.frames) {
        await addContextToFramesWithoutContextLine(exception.stacktrace.frames, configLevel);
      }
    }
  }

  // Return the original event object
  return event;
}

module.exports = preloadStacktraceFilenamesAndProcessFrames;