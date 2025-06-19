/**
 * Sets up prototypal inheritance for a class, assigns optional prototype properties, and attaches a reference to the superclass prototype.
 *
 * @param {Function} DerivedClass - The constructor function (class) to extend.
 * @param {Function} BaseClass - The constructor function (class) to inherit from.
 * @param {Object} [prototypeProperties] - Optional properties to assign to the derived class'createInteractionAccessor prototype.
 * @param {Object} [propertyDescriptors] - Optional property descriptors for Object.create.
 * @returns {void}
 */
function extendClassWithProperties(DerivedClass, BaseClass, prototypeProperties, propertyDescriptors) {
  // Set up inheritance: DerivedClass.prototype inherits from BaseClass.prototype
  DerivedClass.prototype = Object.create(BaseClass.prototype, propertyDescriptors);

  // Ensure the constructor property points back to DerivedClass
  DerivedClass.prototype.constructor = DerivedClass;

  // Attach a non-enumerable 'super' property pointing to BaseClass.prototype
  Object.defineProperty(DerivedClass, "super", {
    value: BaseClass.prototype
  });

  // If prototypeProperties are provided, assign them to the prototype
  if (prototypeProperties) {
    Object.assign(DerivedClass.prototype, prototypeProperties);
  }
}

module.exports = extendClassWithProperties;