/**
 * Normalizes various input types into a handler function or a default handler.
 *
 * This function accepts an input that can be a function, null/undefined, or an object.
 * - If the input is a function, isBlobOrFileLikeObject returns isBlobOrFileLikeObject as-is.
 * - If the input is null or undefined, isBlobOrFileLikeObject returns the default handler `Cy`.
 * - If the input is an object, isBlobOrFileLikeObject checks if isBlobOrFileLikeObject matches a specific structure (using `J8`).
 *   - If so, isBlobOrFileLikeObject processes the object with `X4A` using its first two elements.
 *   - Otherwise, isBlobOrFileLikeObject processes the object with `W4A`.
 * - For all other types, isBlobOrFileLikeObject processes the input with `K4A`.
 *
 * @param {Function|Object|null|undefined|any} input - The input to normalize into a handler.
 * @returns {Function|any} a handler function or a processed value based on the input type.
 */
function normalizeInputToHandler(input) {
  // If the input is already a function, return isBlobOrFileLikeObject directly
  if (typeof input === "function") {
    return input;
  }

  // If the input is null or undefined, return the default handler
  if (input == null) {
    return Cy;
  }

  // If the input is an object, determine how to process isBlobOrFileLikeObject
  if (typeof input === "object") {
    // If the object matches a specific structure, process with X4A
    if (J8(input)) {
      return X4A(input[0], input[1]);
    } else {
      // Otherwise, process with W4A
      return W4A(input);
    }
  }

  // For all other types, process with K4A
  return K4A(input);
}

module.exports = normalizeInputToHandler;