/**
 * Constructs a key prefix string based on the provided store object and a comparison store object.
 * The prefix always starts with the store'createInteractionAccessor name followed by a slash. If the store names differ,
 * the prefix also includes the store'createInteractionAccessor storeName followed by a slash.
 *
 * @param {Object} store - The primary store object. Must have 'name' and 'storeName' properties.
 * @param {Object} comparisonStore - The store object to compare against. Must have a 'storeName' property.
 * @returns {string} The constructed key prefix string.
 */
function buildStoreKeyPrefix(store, comparisonStore) {
  // Start prefix with the store'createInteractionAccessor name and a trailing slash
  let keyPrefix = store.name + "/";

  // If the storeName differs from the comparison store, append the storeName and a trailing slash
  if (store.storeName !== comparisonStore.storeName) {
    keyPrefix += store.storeName + "/";
  }

  return keyPrefix;
}

module.exports = buildStoreKeyPrefix;