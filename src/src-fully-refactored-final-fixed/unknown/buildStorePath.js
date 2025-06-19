/**
 * Constructs a store path string based on the provided source and target store objects.
 * The path always starts with the source'createInteractionAccessor name, followed by a slash. If the source and target store names differ,
 * the source'createInteractionAccessor storeName is appended, followed by a slash.
 *
 * @param {Object} sourceStore - The source store object. Must have 'name' and 'storeName' properties.
 * @param {Object} targetStore - The target store object. Must have a 'storeName' property.
 * @returns {string} The constructed store path string.
 */
function buildStorePath(sourceStore, targetStore) {
  // Start with the source store'createInteractionAccessor name followed by a slash
  let storePath = sourceStore.name + "/";

  // If the store names differ, append the source store'createInteractionAccessor storeName followed by a slash
  if (sourceStore.storeName !== targetStore.storeName) {
    storePath += sourceStore.storeName + "/";
  }

  return storePath;
}

module.exports = buildStorePath;
