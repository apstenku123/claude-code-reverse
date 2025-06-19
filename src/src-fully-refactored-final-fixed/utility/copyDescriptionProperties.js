/**
 * Copies the 'description' property from the source object to the target object.
 * If the config object has a 'markdownDescription' property, also copies the 'description' to 'markdownDescription' on the target.
 *
 * @param {Object} sourceObservable - The object containing the 'description' property to copy.
 * @param {Object} config - Configuration object, checked for 'markdownDescription' property.
 * @param {Object} subscription - The target object to which properties are copied.
 * @returns {Object} The updated subscription object with copied properties.
 */
const copyDescriptionProperties = (sourceObservable, config, subscription) => {
  if (sourceObservable.description) {
    // Always copy 'description' from source to subscription
    subscription.description = sourceObservable.description;
    // If config has 'markdownDescription', also copy to subscription.markdownDescription
    if (config.markdownDescription) {
      subscription.markdownDescription = sourceObservable.description;
    }
  }
  return subscription;
};

module.exports = copyDescriptionProperties;
