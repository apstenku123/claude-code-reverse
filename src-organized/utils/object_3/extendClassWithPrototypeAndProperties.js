/**
 * Sets up prototype inheritance for a subclass, assigns optional prototype properties, and defines a reference to the superclass prototype.
 *
 * @param {Function} SubClass - The constructor function of the subclass to extend.
 * @param {Function} SuperClass - The constructor function of the superclass to inherit from.
 * @param {Object} [additionalPrototypeProperties] - Optional properties to assign to the subclass prototype.
 * @param {Object} [propertyDescriptors] - Optional property descriptors for Object.create when creating the subclass prototype.
 * @returns {void}
 */
function extendClassWithPrototypeAndProperties(
  SubClass,
  SuperClass,
  additionalPrototypeProperties,
  propertyDescriptors
) {
  // Set up prototype inheritance from SuperClass, optionally using property descriptors
  SubClass.prototype = Object.create(SuperClass.prototype, propertyDescriptors);
  // Ensure the constructor property points back to SubClass
  SubClass.prototype.constructor = SubClass;
  // Define a non-enumerable 'super' property on SubClass pointing to SuperClass'createInteractionAccessor prototype
  Object.defineProperty(SubClass, "super", {
    value: SuperClass.prototype
  });
  // If additional prototype properties are provided, assign them to SubClass.prototype
  if (additionalPrototypeProperties) {
    Object.assign(SubClass.prototype, additionalPrototypeProperties);
  }
}

module.exports = extendClassWithPrototypeAndProperties;