/**
 * Creates a new observable from the entries of a given object, using a provided configuration or mapping function.
 *
 * @param {Object} sourceObject - The object whose entries will be used to create the observable.
 * @param {Function|Object} config - Configuration object or mapping function for the observable creation.
 * @returns {any} An observable created from the object'createInteractionAccessor entries, as defined by dO9.from.
 */
function createObservableFromEntries(sourceObject, config) {
  // Convert the source object into an array of [key, value] pairs
  const entriesArray = Object.entries(sourceObject);
  // Create an observable from the entries array using the provided config
  return dO9.from(entriesArray, config);
}

module.exports = createObservableFromEntries;