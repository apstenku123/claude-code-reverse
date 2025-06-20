/**
 * Normalizes various input types (string, ArrayBuffer, Blob, async iterable, etc.) into an array of ArrayBuffer-like objects.
 *
 * @async
 * @function normalizeInputToArrayBufferList
 * @param {*} input - The input data to normalize. Can be a string, ArrayBuffer, Blob, async iterable, or file-like object.
 * @returns {Promise<Array>} Resolves to an array containing normalized ArrayBuffer-like objects.
 * @throws {Error} If the input type is not supported.
 */
async function normalizeInputToArrayBufferList(input) {
  const normalizedBuffers = [];

  // Handle primitive string, ArrayBufferView, or ArrayBuffer directly
  if (
    typeof input === "string" ||
    ArrayBuffer.isView(input) ||
    input instanceof ArrayBuffer
  ) {
    normalizedBuffers.push(input);
  }
  // Handle file-like objects (e.g., Blob, File)
  else if (isFileLikeObject(input)) {
    // If isBlobOrFileLikeObject'createInteractionAccessor a Blob, push as is; otherwise, convert to ArrayBuffer
    if (input instanceof Blob) {
      normalizedBuffers.push(input);
    } else {
      normalizedBuffers.push(await input.arrayBuffer());
    }
  }
  // Handle async iterables (e.g., streams)
  else if (isAsyncIterable(input)) {
    for await (const chunk of input) {
      // Recursively normalize each chunk and flatten the result
      normalizedBuffers.push(...(await normalizeInputToArrayBufferList(chunk)));
    }
  }
  // Unsupported type: throw an error with diagnostic info
  else {
    const constructorName = input?.constructor?.name;
    throw new Error(
      `Unexpected data type: ${typeof input}` +
      (constructorName ? `; constructor: ${constructorName}` : "") +
      getDiagnosticString(input)
    );
  }

  return normalizedBuffers;
}

module.exports = normalizeInputToArrayBufferList;
