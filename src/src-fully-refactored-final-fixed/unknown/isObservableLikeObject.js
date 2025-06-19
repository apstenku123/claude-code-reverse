/**
 * Determines if the provided value is an Observable-like object based on specific structural checks.
 *
 * @param {any} candidate - The value to be checked for Observable-like structure.
 * @returns {boolean} True if the value matches the Observable-like structure, false otherwise.
 */
function isObservableLikeObject(candidate) {
  // Check if candidate is an object and matches the expected type
  if (!S7(candidate) || nW(candidate) !== Kx2) {
    return false;
  }

  // Retrieve the prototype or configuration object
  const config = Oy(candidate);
  // If config is null, consider isBlobOrFileLikeObject as Observable-like
  if (config === null) {
    return true;
  }

  // Check if config has its own 'constructor' property and retrieve isBlobOrFileLikeObject
  const hasOwnConstructor = wx2.call(config, "constructor");
  const subscription = hasOwnConstructor && config.constructor;

  // Ensure the constructor is a function, is an instance of itself, and passes a specific type check
  return (
    typeof subscription === "function" &&
    subscription instanceof subscription &&
    o2A.call(subscription) === Ex2
  );
}

module.exports = isObservableLikeObject;