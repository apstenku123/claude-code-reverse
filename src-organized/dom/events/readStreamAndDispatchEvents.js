/**
 * Reads a stream from the provided source, accumulates its data, and dispatches events reflecting the loading state.
 * Handles progress, load, error, and loadend events, and updates the source object'createInteractionAccessor state accordingly.
 *
 * @param {Object} sourceObject - The object representing the loading state and event data.
 * @param {Object} streamSource - The object providing a .stream() method returning a ReadableStream.
 * @param {any} decodeOptions - Options to pass to the decoder function.
 * @param {any} additionalContext - Additional context for decoding or event handling.
 * @returns {void}
 */
function readStreamAndDispatchEvents(sourceObject, streamSource, decodeOptions, additionalContext) {
  // Check if the source is already loading
  if (sourceObject[gh] === "loading") {
    throw new DOMException("Invalid state", "InvalidStateError");
  }

  // Set initial loading state and clear previous results/errors
  sourceObject[gh] = "loading";
  sourceObject[Yc0] = null;
  sourceObject[eu1] = null;

  // Get a reader from the stream
  const reader = streamSource.stream().getReader();
  const dataChunks = [];
  let readPromise = reader.read();
  let isFirstChunk = true;

  (async () => {
    while (!sourceObject[gr]) {
      try {
        // Await the next chunk from the stream
        const { done, value } = await readPromise;

        // On first chunk, dispatch 'loadstart' event
        if (isFirstChunk && !sourceObject[gr]) {
          queueMicrotask(() => {
            dispatchCustomEvent("loadstart", sourceObject);
          });
        }
        isFirstChunk = false;

        // If not done and value is a Uint8Array, accumulate and possibly dispatch 'progress'
        if (!done && _w6.isUint8Array(value)) {
          dataChunks.push(value);

          // Dispatch 'progress' event every 50ms or on first chunk
          if ((sourceObject[Ap1] === undefined || Date.now() - sourceObject[Ap1] >= 50) && !sourceObject[gr]) {
            sourceObject[Ap1] = Date.now();
            queueMicrotask(() => {
              dispatchCustomEvent("progress", sourceObject);
            });
          }
          // Prepare to read the next chunk
          readPromise = reader.read();
        } else if (done) {
          // If stream is done, process accumulated data and dispatch 'load' or 'error'
          queueMicrotask(() => {
            sourceObject[gh] = "done";
            try {
              const decodedResult = convertDataToFormat(dataChunks, decodeOptions, streamSource.type, additionalContext);
              if (sourceObject[gr]) return;
              sourceObject[Yc0] = decodedResult;
              dispatchCustomEvent("load", sourceObject);
            } catch (decodeError) {
              sourceObject[eu1] = decodeError;
              dispatchCustomEvent("error", sourceObject);
            }
            // Always dispatch 'loadend' if not still loading
            if (sourceObject[gh] !== "loading") {
              dispatchCustomEvent("loadend", sourceObject);
            }
          });
          break;
        }
      } catch (readError) {
        // On error, dispatch 'error' and 'loadend' events
        if (sourceObject[gr]) return;
        queueMicrotask(() => {
          sourceObject[gh] = "done";
          sourceObject[eu1] = readError;
          dispatchCustomEvent("error", sourceObject);
          if (sourceObject[gh] !== "loading") {
            dispatchCustomEvent("loadend", sourceObject);
          }
        });
        break;
      }
    }
  })();
}

module.exports = readStreamAndDispatchEvents;