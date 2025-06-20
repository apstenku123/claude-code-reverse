/**
 * Serializes an array into a string, replacing Vue view model instances with a placeholder.
 *
 * @param {any[]} items - The array of items to serialize.
 * @param {string} separator - The string to use as a separator between serialized items.
 * @returns {string} The serialized string representation of the array, with Vue view models replaced by a placeholder.
 */
function serializeArrayWithVueViewModelHandling(items, separator) {
  // Return empty string if input is not an array
  if (!Array.isArray(items)) {
    return "";
  }

  const serializedItems = [];

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    try {
      // If the item is a Vue view model, use a placeholder
      if (X21.isVueViewModel(item)) {
        serializedItems.push("[VueViewModel]");
      } else {
        // Otherwise, convert the item to a string
        serializedItems.push(String(item));
      }
    } catch (error) {
      // If serialization fails, use a fallback placeholder
      serializedItems.push("[value cannot be serialized]");
    }
  }

  // Join all serialized items with the provided separator
  return serializedItems.join(separator);
}

module.exports = serializeArrayWithVueViewModelHandling;