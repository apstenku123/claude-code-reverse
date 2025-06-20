/**
 * Normalizes various input types into an array of buffers or strings.
 *
 * Accepts strings, ArrayBuffer views, ArrayBuffers, Blob-like objects, or async iterables of these types.
 * Throws an error for unsupported types.
 *
 * @async
 * @param {string | ArrayBuffer | ArrayBufferView | Blob | AsyncIterable<any>} input - The data to normalize.
 * @returns {Promise<Array<string | ArrayBuffer | ArrayBufferView>>} An array containing the normalized data.
 * @throws {Error} If the input type is not supported.
 */
async function normalizeToBufferArray(input) {
  const normalizedArray = [];

  // Handle string, ArrayBufferView, or ArrayBuffer directly
  if (
    typeof input === "string" ||
    ArrayBuffer.isView(input) ||
    input instanceof ArrayBuffer
  ) {
    normalizedArray.push(input);
  }
  // Handle Blob-like objects
  else if (isBlobLikeObject(input)) {
    // If input is a Blob, push as is; otherwise, convert to ArrayBuffer
    const buffer = input instanceof Blob ? input : await input.arrayBuffer();
    normalizedArray.push(buffer);
  }
  // Handle async iterable objects recursively
  else if (isAsyncIterableObject(input)) {
    for await (const element of input) {
      // Recursively normalize each element and flatten the result
      normalizedArray.push(...(await normalizeToBufferArray(element)));
    }
  }
  // Unsupported type: throw an error with details
  else {
    const constructorName = input?.constructor?.name;
    throw new Error(
      `Unexpected data type: ${typeof input}` +
      (constructorName ? `; constructor: ${constructorName}` : "") +
      getDebugInfo(input)
    );
  }

  return normalizedArray;
}

module.exports = normalizeToBufferArray;
