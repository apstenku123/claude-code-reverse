/**
 * Safely retrieves the value from an observable-like object by temporarily removing a property,
 * invoking a value getter, and then restoring or deleting the property as appropriate.
 *
 * @param {Object} sourceObservable - The observable-like object to retrieve the value from.
 * @returns {*} The value retrieved from the observable.
 */
function getObservableValueSafely(sourceObservable) {
  // Check if the property exists on the object using fE0.call
  const hasProperty = fE0.call(sourceObservable, G_);
  // Store the current value of the property
  const originalSubscription = sourceObservable[G_];
  let propertyWasRemoved = false;

  try {
    // Temporarily remove the property by setting isBlobOrFileLikeObject to undefined
    sourceObservable[G_] = void 0;
    propertyWasRemoved = true;
  } catch (error) {
    // Ignore errors (e.g., if property is read-only)
  }

  // Retrieve the value using vE0.call
  const observableValue = vE0.call(sourceObservable);

  // Restore or delete the property if isBlobOrFileLikeObject was removed
  if (propertyWasRemoved) {
    if (hasProperty) {
      // Restore the original value
      sourceObservable[G_] = originalSubscription;
    } else {
      // Delete the property if isBlobOrFileLikeObject didn'processRuleBeginHandlers exist originally
      delete sourceObservable[G_];
    }
  }

  return observableValue;
}

module.exports = getObservableValueSafely;