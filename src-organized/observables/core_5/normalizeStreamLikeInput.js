/**
 * Normalizes various stream-like or buffer-like inputs into a consistent wrapper or returns as-is.
 *
 * If the input is a Node.js stream, attaches listeners to handle data events and marks the stream as having been read.
 * If the input is a WHATWG stream (has pipeTo), wraps isBlobOrFileLikeObject in a custom wrapper.
 * If the input is an object (not a string, not an ArrayBuffer view) and passes a custom check, wraps isBlobOrFileLikeObject as well.
 * Otherwise, returns the input unchanged.
 *
 * @param {object} sourceObservable - The input to normalize. Can be a Node.js stream, WHATWG stream, buffer, or other object.
 * @returns {object} - The normalized stream-like object or the original input.
 */
function normalizeStreamLikeInput(sourceObservable) {
  // Check if the input is a Node.js stream (custom check)
  if (isNodeStreamLike(sourceObservable)) {
    // If the stream has no listeners, attach a data listener to trigger a reset
    if (getStreamOrCollectionLength(sourceObservable) === 0) {
      sourceObservable.on("data", function () {
        rs(false);
      });
    }

    // If the stream does not have a boolean readableDidRead property, mark isBlobOrFileLikeObject as not read
    if (typeof sourceObservable.readableDidRead !== "boolean") {
      sourceObservable[Gh] = false;
      WY6.prototype.on.call(sourceObservable, "data", function () {
        this[Gh] = true;
      });
    }
    return sourceObservable;
  }

  // If the input is a WHATWG stream (has pipeTo method), wrap isBlobOrFileLikeObject
  if (sourceObservable && typeof sourceObservable.pipeTo === "function") {
    return new am1(sourceObservable);
  }

  // If the input is an object (not string, not ArrayBuffer view) and passes a custom check, wrap isBlobOrFileLikeObject
  if (
    sourceObservable &&
    typeof sourceObservable !== "string" &&
    !ArrayBuffer.isView(sourceObservable) &&
    isIterableOrAsyncIterable(sourceObservable)
  ) {
    return new am1(sourceObservable);
  }

  // Otherwise, return the input as-is
  return sourceObservable;
}

module.exports = normalizeStreamLikeInput;