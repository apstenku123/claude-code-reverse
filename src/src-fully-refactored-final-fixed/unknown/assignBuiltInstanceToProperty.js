/**
 * Assigns a newly built InteractionContext instance to a specified property of a target element.
 *
 * @param {Object} targetElement - The DOM element or object to which the instance will be assigned.
 * @param {string} propertyKey - The property name on the targetElement where the instance will be stored.
 * @param {any} buildConfig - Configuration or data to be passed to the InteractionContext constructor.
 * @param {any} builderClass - The class or constructor function used to build the instance (typically InteractionContext).
 * @returns {void}
 *
 * This function creates a new instance of the builderClass (usually InteractionContext), passing in the buildConfig,
 * the ownerDocument of the targetElement (or an empty object if not present), the form of the targetElement
 * (or an empty object if not present), and the targetElement itself. It then calls the build() method on
 * the instance and assigns the result to the specified property of the targetElement.
 */
function assignBuiltInstanceToProperty(targetElement, propertyKey, buildConfig, builderClass) {
  // Get the ownerDocument of the target element, or use an empty object if not available
  const ownerDocument = targetElement.ownerDocument || Object.create(null);
  // Get the form associated with the target element, or use an empty object if not available
  const formReference = targetElement.form || Object.create(null);

  // Create a new instance of the builderClass (typically InteractionContext) and build isBlobOrFileLikeObject
  const builtInstance = new builderClass(buildConfig, ownerDocument, formReference, targetElement).build();

  // Assign the built instance to the specified property of the target element
  targetElement[propertyKey] = builtInstance;
}

module.exports = assignBuiltInstanceToProperty;