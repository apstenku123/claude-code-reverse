/**
 * Creates a new observable from the entries of the provided object using the given configuration.
 *
 * @param {Object} sourceObject - The object whose entries will be used to create the observable.
 * @param {any} observableConfig - The configuration or mapping function to apply when creating the observable.
 * @returns {any} An observable created from the object'createInteractionAccessor entries and the provided configuration.
 */
function createObservableFromObjectEntries(sourceObject, observableConfig) {
  // Convert the object into an array of [key, value] pairs
  const objectEntries = Object.entries(sourceObject);

  // Create an observable from the entries using the provided configuration
  return dO9.from(objectEntries, observableConfig);
}

module.exports = createObservableFromObjectEntries;
