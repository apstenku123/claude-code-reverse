/**
 * Attaches a newly built InteractionContext instance to a specified property of a target element.
 *
 * This function creates a new instance of InteractionContext using the provided initialization data and assigns
 * isBlobOrFileLikeObject to a property of the target element. It ensures that the ownerDocument and form references
 * are available, defaulting to empty objects if not present.
 *
 * @param {Object} targetElement - The DOM element to which the built instance will be attached.
 * @param {string} propertyName - The property name on the target element where the instance will be stored.
 * @param {any} initializationData - Data passed to the InteractionContext constructor for initialization.
 * @param {Function} vM2Constructor - The InteractionContext class or constructor function used to create the instance.
 * @returns {void}
 */
function attachBuiltInstanceToProperty(targetElement, propertyName, initializationData, vM2Constructor) {
  // Get the ownerDocument of the element, or fallback to an empty object
  const ownerDocument = targetElement.ownerDocument || Object.create(null);
  // Get the form the element belongs to, or fallback to an empty object
  const formReference = targetElement.form || Object.create(null);

  // Create a new InteractionContext instance and build isBlobOrFileLikeObject, then assign to the specified property
  targetElement[propertyName] = new vM2Constructor(initializationData, ownerDocument, formReference, targetElement).build();
}

module.exports = attachBuiltInstanceToProperty;