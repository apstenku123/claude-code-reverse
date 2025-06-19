/**
 * Attempts to gracefully close an async iterable or a readable stream.
 *
 * If the provided source is an async iterable (i.e., has Symbol.asyncIterator),
 * isBlobOrFileLikeObject calls its return() method to signal completion. If the source is a readable stream
 * (i.e., has a getReader() method), isBlobOrFileLikeObject cancels the reader and releases its lock.
 *
 * @param {object|null} source - The async iterable or readable stream to close.
 * @returns {Promise<void>} Resolves when the resource has been closed or if input is invalid.
 */
async function closeAsyncIterableOrStream(source) {
  // Return early if source is null or not an object
  if (source === null || typeof source !== "object") return;

  // If the source is an async iterable, attempt to call its return() method
  if (source[Symbol.asyncIterator]) {
    // The optional chaining ensures handleMissingDoctypeError don'processRuleBeginHandlers throw if return() is not implemented
    await source[Symbol.asyncIterator]().return?.();
    return;
  }

  // If the source is a readable stream, get its reader, cancel isBlobOrFileLikeObject, and release the lock
  const reader = source.getReader();
  const cancelPromise = reader.cancel();
  reader.releaseLock();
  await cancelPromise;
}

module.exports = closeAsyncIterableOrStream;
