/**
 * Normalizes various input types (string, ArrayBuffer, Blob-like, async iterable) into an array of ArrayBuffer-like objects.
 *
 * @async
 * @function normalizeToArrayBufferList
 * @param {*} input - The data to normalize. Can be a string, ArrayBuffer, Blob-like object, or async iterable of such types.
 * @returns {Promise<Array>} Resolves to an array containing the normalized data as ArrayBuffer-like objects.
 * @throws {Error} Throws if the input type is not supported.
 */
async function normalizeToArrayBufferList(input) {
  const normalizedBuffers = [];

  // Handle primitive types and ArrayBuffer views
  if (
    typeof input === "string" ||
    ArrayBuffer.isView(input) ||
    input instanceof ArrayBuffer
  ) {
    normalizedBuffers.push(input);
    return normalizedBuffers;
  }

  // Handle Blob-like objects
  if (isBlobLikeObject(input)) {
    // If input is a Blob, push as-is; otherwise, convert to ArrayBuffer
    const buffer = input instanceof Blob ? input : await input.arrayBuffer();
    normalizedBuffers.push(buffer);
    return normalizedBuffers;
  }

  // Handle async iterables (e.g., streams)
  if (isAsyncIterableObject(input)) {
    for await (const element of input) {
      // Recursively normalize each element and flatten the result
      const elementBuffers = await normalizeToArrayBufferList(element);
      normalizedBuffers.push(...elementBuffers);
    }
    return normalizedBuffers;
  }

  // If input type is not supported, throw an error with details
  const constructorName = input?.constructor?.name;
  throw new Error(
    `Unexpected data type: ${typeof input}` +
    (constructorName ? `; constructor: ${constructorName}` : "") +
    `${formatObjectPropertyNames(input)}`
  );
}

module.exports = normalizeToArrayBufferList;