/**
 * Enhances a React component object with formatted display name and HOC display names.
 *
 * This function takes a component object, extracts and formats its display name and HOC (Higher Order Component) display names
 * using the QD utility, and returns a new object with these enhanced properties. It also includes a flag indicating if the component
 * was compiled with the 'forget' compiler.
 *
 * @param {Object} component - The React component object to enhance. Should have at least 'displayName' and 'type' properties.
 * @returns {Object} a new component object with enhanced display name, HOC display names, and compiledWithForget flag.
 */
function enhanceComponentDisplayNames(component) {
  // Extract formatted display name, HOC display names, and compiledWithForget flag using QD utility
  const {
    formattedDisplayName,
    hocDisplayNames,
    compiledWithForget
  } = QD(component.displayName, component.type);

  // Merge the enhanced properties into a new component object
  return addItemToGlobalArray(
    addItemToGlobalArray({}, component),
    {},
    {
      displayName: formattedDisplayName,
      hocDisplayNames: hocDisplayNames,
      compiledWithForget: compiledWithForget
    }
  );
}

module.exports = enhanceComponentDisplayNames;