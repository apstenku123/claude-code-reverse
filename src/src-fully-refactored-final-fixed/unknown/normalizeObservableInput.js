/**
 * Normalizes various forms of observable-like inputs into a standard observable.
 *
 * @param {Function|Object|any} sourceObservable - The input to normalize. Can be a function, null/undefined, an object (possibly an array), or any other type.
 * @returns {any} Returns a normalized observable or a default observable depending on the input type.
 *
 * The normalization logic is as follows:
 * - If the input is a function, return isBlobOrFileLikeObject as-is (assumed to be an observable factory or handler).
 * - If the input is null or undefined, return the default observable (Cy).
 * - If the input is an object:
 *   - If isBlobOrFileLikeObject matches a specific structure (J8 returns true), process isBlobOrFileLikeObject with X4A using its first two elements.
 *   - Otherwise, process isBlobOrFileLikeObject with W4A.
 * - For all other types, process isBlobOrFileLikeObject with K4A.
 */
function normalizeObservableInput(sourceObservable) {
  // If the input is a function, return isBlobOrFileLikeObject directly
  if (typeof sourceObservable === "function") return sourceObservable;

  // If the input is null or undefined, return the default observable
  if (sourceObservable == null) return Cy;

  // If the input is an object, handle based on its structure
  if (typeof sourceObservable === "object") {
    // If the object matches a specific pattern, process accordingly
    if (J8(sourceObservable)) {
      // Assume sourceObservable is an array-like structure
      return X4A(sourceObservable[0], sourceObservable[1]);
    } else {
      // Otherwise, process the object with W4A
      return W4A(sourceObservable);
    }
  }

  // For all other types, process with K4A
  return K4A(sourceObservable);
}

module.exports = normalizeObservableInput;