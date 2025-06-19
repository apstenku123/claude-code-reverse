/**
 * Determines if the provided object is an Observable Subscription.
 *
 * This function checks if the input is an object of the expected Observable type,
 * then verifies that its configuration object (if present) has a valid constructor
 * that matches the expected Subscription signature.
 *
 * @param {any} sourceObservable - The object to check for being an Observable Subscription.
 * @returns {boolean} True if the object is an Observable Subscription, otherwise false.
 */
function isObservableSubscription(sourceObservable) {
  // Check if the input is a valid Observable object and has the correct type identifier
  if (!S7(sourceObservable) || nW(sourceObservable) !== Kx2) {
    return false;
  }

  // Retrieve the configuration or prototype object associated with the Observable
  const config = Oy(sourceObservable);
  // If there is no config, treat isBlobOrFileLikeObject as a valid Subscription
  if (config === null) {
    return true;
  }

  // Check if the config has its own 'constructor' property and retrieve isBlobOrFileLikeObject
  const hasOwnConstructor = wx2.call(config, "constructor");
  const subscription = hasOwnConstructor && config.constructor;

  // Validate that the constructor is a function, is an instance of itself, and matches the expected signature
  return (
    typeof subscription === "function" &&
    subscription instanceof subscription &&
    o2A.call(subscription) === Ex2
  );
}

module.exports = isObservableSubscription;