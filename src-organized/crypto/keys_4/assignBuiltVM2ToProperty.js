/**
 * Assigns a built InteractionContext instance to a specified property of a target element.
 *
 * @param {Object} targetElement - The DOM element to which the property will be assigned.
 * @param {string} propertyName - The property name on the target element to assign the built InteractionContext instance to.
 * @param {any} vM2Config - Configuration or data to be passed to the InteractionContext constructor.
 * @param {Function} vM2Constructor - The InteractionContext class or constructor function used to create the instance.
 * @returns {void}
 *
 * This function retrieves the ownerDocument and form from the target element (if available),
 * creates a new InteractionContext instance with the provided configuration, and assigns the result of its
 * build() method to the specified property on the target element.
 */
function assignBuiltVM2ToProperty(targetElement, propertyName, vM2Config, vM2Constructor) {
  // Retrieve the ownerDocument of the element, or create an empty object if not present
  const ownerDocument = targetElement.ownerDocument || Object.create(null);
  // Retrieve the form associated with the element, or create an empty object if not present
  const form = targetElement.form || Object.create(null);
  // Create a new InteractionContext instance and assign the result of build() to the specified property
  targetElement[propertyName] = new vM2Constructor(vM2Config, ownerDocument, form, targetElement).build();
}

module.exports = assignBuiltVM2ToProperty;