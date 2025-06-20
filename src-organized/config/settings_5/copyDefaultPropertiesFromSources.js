/**
 * Copies the 'default' property from one or two source objects to a target object as a getter, 
 * only if the property does not already exist on the target. This is useful for ensuring that 
 * the 'default' export is available on the target, typically in module interop scenarios.
 *
 * @param {object} sourceObject - The primary source object from which to copy the 'default' property.
 * @param {object} targetObject - The target object to which the 'default' property will be copied.
 * @param {object} [optionalSecondSource] - An optional second source object from which to also copy the 'default' property.
 * @returns {void}
 */
function copyDefaultPropertiesFromSources(sourceObject, targetObject, optionalSecondSource) {
  // Copy 'default' property from the primary source to the target
  copyMissingPropertiesWithGetters(sourceObject, targetObject, "default");
  // If a second source is provided, also copy its 'default' property
  if (optionalSecondSource) {
    copyMissingPropertiesWithGetters(optionalSecondSource, targetObject, "default");
  }
}

module.exports = copyDefaultPropertiesFromSources;