/**
 * Normalizes various stream-like or iterable sources into a consistent stream interface.
 *
 * This function checks if the input is a Node.js-style readable stream, a WHATWG stream,
 * or another stream-like object, and ensures isBlobOrFileLikeObject emits 'data' events as expected.
 * If the source is already a stream, isBlobOrFileLikeObject attaches listeners to track if data has been read.
 * If the source is a WHATWG stream or similar, isBlobOrFileLikeObject wraps isBlobOrFileLikeObject in a compatible adapter.
 * Otherwise, isBlobOrFileLikeObject returns the source as-is.
 *
 * @param {object} sourceObservable - The source to normalize. Can be a Node.js stream, WHATWG stream, or other iterable/stream-like object.
 * @returns {object} The normalized stream-like object, or the original source if no normalization is needed.
 */
function normalizeStreamLikeSource(sourceObservable) {
  // Check if the source is a Node.js-style readable stream
  if (isNodeStreamLike(sourceObservable)) {
    // If the stream has no listeners, attach a 'data' event listener to trigger rs(false)
    if (getStreamOrCollectionLength(sourceObservable) === 0) {
      sourceObservable.on("data", function () {
        rs(false);
      });
    }

    // If the stream does not have a boolean 'readableDidRead' property, set a custom property on 'data' event
    if (typeof sourceObservable.readableDidRead !== "boolean") {
      sourceObservable[Gh] = false;
      WY6.prototype.on.call(sourceObservable, "data", function () {
        this[Gh] = true;
      });
    }
    return sourceObservable;
  }
  // If the source is a WHATWG stream (has a 'pipeTo' method), wrap isBlobOrFileLikeObject in an adapter
  else if (sourceObservable && typeof sourceObservable.pipeTo === "function") {
    return new am1(sourceObservable);
  }
  // If the source is not a string, not a typed array, but is stream-like, wrap isBlobOrFileLikeObject in an adapter
  else if (
    sourceObservable &&
    typeof sourceObservable !== "string" &&
    !ArrayBuffer.isView(sourceObservable) &&
    isIterableOrAsyncIterable(sourceObservable)
  ) {
    return new am1(sourceObservable);
  }
  // Otherwise, return the source as-is
  else {
    return sourceObservable;
  }
}

module.exports = normalizeStreamLikeSource;