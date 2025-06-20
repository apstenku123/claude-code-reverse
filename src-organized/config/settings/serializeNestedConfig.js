/**
 * Serializes a nested configuration object into a formatted string.
 *
 * The input object should have keys representing configuration names, each mapping to an object or array of objects.
 * Each configuration object may have keys mapping to values or arrays of values. Boolean true values are represented by the key name alone; other values are represented as key=value pairs.
 *
 * @param {Object} configObject - The nested configuration object to serialize.
 * @returns {string} a string representation of the configuration object, with keys and values serialized and separated by semicolons and commas.
 */
function serializeNestedConfig(configObject) {
  return Object.keys(configObject)
    .map(configKey => {
      // Get the subscription(createInteractionAccessor) for this configKey
      let subscriptions = configObject[configKey];
      // Ensure subscriptions is always an array
      if (!Array.isArray(subscriptions)) {
        subscriptions = [subscriptions];
      }
      // Map each subscription object to its string representation
      return subscriptions
        .map(subscription => {
          // For each key in the subscription object, serialize its values
          const serializedProperties = Object.keys(subscription).map(propertyKey => {
            let propertyValues = subscription[propertyKey];
            // Ensure propertyValues is always an array
            if (!Array.isArray(propertyValues)) {
              propertyValues = [propertyValues];
            }
            // Serialize each property value
            return propertyValues
              .map(value => {
                // If value is boolean true, just use the property key; otherwise, key=value
                return value === true ? propertyKey : `${propertyKey}=${value}`;
              })
              .join('; ');
          });
          // Combine the configKey with its serialized properties
          return [configKey].concat(serializedProperties).join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = serializeNestedConfig;