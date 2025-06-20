/**
 * Defines getter properties on a target object using descriptors from a source object.
 *
 * For each property in the propertyDescriptors object, this function defines a getter
 * on the targetObject using the NX1 utility. The getter is taken from the propertyDescriptors
 * object, and each property is set to be enumerable.
 *
 * @param {Object} targetObject - The object on which properties will be defined.
 * @param {Object} propertyDescriptors - An object whose properties are getter functions to be defined on the targetObject.
 * @returns {void}
 */
function defineObservableProperties(targetObject, propertyDescriptors) {
  // Iterate over each property in the propertyDescriptors object
  for (const propertyName in propertyDescriptors) {
    // Define a getter property on the targetObject using NX1
    NX1(targetObject, propertyName, {
      get: propertyDescriptors[propertyName],
      enumerable: true
    });
  }
}

module.exports = defineObservableProperties;