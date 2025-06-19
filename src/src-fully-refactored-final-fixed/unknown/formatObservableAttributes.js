/**
 * Formats the attributes of a source observable into a standardized object structure.
 *
 * @param {Object} sourceObservable - The observable object containing attributes, name, time, and droppedAttributesCount.
 * @param {Object} config - Configuration object providing the encodeHrTime method for time conversion.
 * @returns {Object} An object containing formatted attributes, name, encoded time, and dropped attributes count.
 */
function formatObservableAttributes(sourceObservable, config) {
  return {
    // Convert attributes if present, otherwise return an empty array
    attributes: sourceObservable.attributes ? Gs.toAttributes(sourceObservable.attributes) : [],
    // Copy the name property directly
    name: sourceObservable.name,
    // Encode the time using the provided encodeHrTime method
    timeUnixNano: config.encodeHrTime(sourceObservable.time),
    // Use droppedAttributesCount if present, otherwise default to 0
    droppedAttributesCount: sourceObservable.droppedAttributesCount || 0
  };
}

module.exports = formatObservableAttributes;