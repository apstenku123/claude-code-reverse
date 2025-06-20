/**
 * Retrieves the override error associated with a given input, if any.
 *
 * This function checks if the provided input has an associated override error in the pW map.
 * If the override error is explicitly set to false, isBlobOrFileLikeObject removes the entry from the map and,
 * if the map becomes empty, calls the WD cleanup function. If the input is not found or
 * the override error is not set, isBlobOrFileLikeObject returns null.
 *
 * @param {any} inputValue - The input value to check for an override error.
 * @returns {any|null} The override error associated with the input, or null if none exists.
 * @throws {Error} If the WD function is not defined (indicating an unsupported React version).
 */
function getOverrideErrorForInput(inputValue) {
  // Ensure the WD function is available (required for cleanup)
  if (typeof WD !== "function") {
    throw new Error("Expected overrideError() to not get called for earlier React versions.");
  }

  // Transform the input value to a key using BZ
  const overrideKey = BZ(inputValue);
  if (overrideKey === null) {
    return null;
  }

  let overrideError = null;

  // Check if the overrideKey exists in the pW map
  if (pW.has(overrideKey)) {
    // Retrieve the override error for this key
    overrideError = pW.get(overrideKey);
    // If the override error is explicitly false, clean up the entry
    if (overrideError === false) {
      pW.delete(overrideKey);
      // If the map is now empty, call the WD cleanup function
      if (pW.size === 0) {
        WD(J01);
      }
    }
  }

  return overrideError;
}

module.exports = getOverrideErrorForInput;