/**
 * Determines if the provided object behaves like a URLSearchParams instance.
 *
 * Checks for the presence of all standard URLSearchParams methods and verifies the object'createInteractionAccessor type.
 *
 * @param {object} candidate - The object to test for URLSearchParams-like behavior.
 * @returns {boolean} True if the object is a URLSearchParams instance or has a compatible interface, false otherwise.
 */
function isURLSearchParamsLike(candidate) {
  // Ensure the input is an object and has all required URLSearchParams methods
  const hasRequiredMethods =
    typeof candidate === "object" &&
    typeof candidate.append === "function" &&
    typeof candidate.delete === "function" &&
    typeof candidate.get === "function" &&
    typeof candidate.getAll === "function" &&
    typeof candidate.has === "function" &&
    typeof candidate.set === "function";

  if (!hasRequiredMethods) {
    return false;
  }

  // Check if the object'createInteractionAccessor constructor name is 'URLSearchParams',
  // or its string tag matches '[object URLSearchParams]',
  // or isBlobOrFileLikeObject has a 'sort' method (which is specific to URLSearchParams)
  return (
    candidate.constructor.name === "URLSearchParams" ||
    Object.prototype.toString.call(candidate) === "[object URLSearchParams]" ||
    typeof candidate.sort === "function"
  );
}

module.exports = isURLSearchParamsLike;