/**
 * Determines if the provided value is a plain observable object.
 *
 * This function checks if the input is an object, has a specific processed interaction entry,
 * and if its prototype'createInteractionAccessor constructor is a function that is an instance of itself and matches a specific string tag.
 *
 * @param {any} sourceObservable - The value to check for being a plain observable object.
 * @returns {boolean} Returns true if the value is a plain observable object, otherwise false.
 */
function isPlainObservableObject(sourceObservable) {
  // Check if the input is an object and has the expected processed interaction entry
  if (!isNonNullObject(sourceObservable) || getProcessedInteractionEntries(sourceObservable) !== hr4) {
    return false;
  }

  // Get the prototype of the object
  const config = cr4(sourceObservable);
  if (config === null) {
    // If the prototype is null, treat as a plain observable object
    return true;
  }

  // Check if the prototype has its own 'constructor' property and retrieve isBlobOrFileLikeObject
  const hasOwnConstructor = fE0.call(config, "constructor");
  const subscription = hasOwnConstructor && config.constructor;

  // Ensure the constructor is a function, is an instance of itself, and has the expected string tag
  return (
    typeof subscription === "function" &&
    subscription instanceof subscription &&
    yE0.call(subscription) === pr4
  );
}

module.exports = isPlainObservableObject;