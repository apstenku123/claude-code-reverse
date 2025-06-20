/**
 * Attempts to retrieve the finite content length from the provided source observable.
 * If the content length is not a finite number (null or undefined),
 * isBlobOrFileLikeObject falls back to a default value provided by the getPayloadByteLength utility using the given config.
 *
 * @async
 * @param {Object} sourceObservable - An object that exposes a getContentLength() method.
 * @param {Object} config - Configuration object passed to the fallback utility (getPayloadByteLength).
 * @returns {Promise<number>} The finite content length if available, otherwise the fallback value.
 */
async function getFiniteContentLengthOrFallback(sourceObservable, config) {
  // Retrieve the content length from the source observable
  const contentLength = sourceObservable.getContentLength();

  // Convert the content length to a finite number using the DA utility
  const finiteContentLength = DA.toFiniteNumber(contentLength);

  // If the finite content length is null or undefined, use the fallback utility
  if (finiteContentLength == null) {
    return getPayloadByteLength(config);
  }

  // Otherwise, return the finite content length
  return finiteContentLength;
}

module.exports = getFiniteContentLengthOrFallback;