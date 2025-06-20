/**
 * Extends a child class from a parent class, sets up prototype inheritance, assigns static properties,
 * and optionally augments the prototype with additional properties.
 *
 * @param {Function} ChildClass - The constructor function of the child class to extend.
 * @param {Function} ParentClass - The constructor function of the parent class to inherit from.
 * @param {Object} [additionalPrototypeProperties] - Optional. An object containing additional properties to assign to the child class prototype.
 * @param {Object} [prototypePropertyDescriptors] - Optional. Property descriptors for defining the prototype object (used in Object.create).
 * @returns {void}
 */
const extendClassWithPrototypeAndStatics = (
  ChildClass,
  ParentClass,
  additionalPrototypeProperties,
  prototypePropertyDescriptors
) => {
  // Set up prototype inheritance from ParentClass, with optional property descriptors
  ChildClass.prototype = Object.create(
    ParentClass.prototype,
    prototypePropertyDescriptors
  );

  // Ensure the constructor property points to ChildClass
  ChildClass.prototype.constructor = ChildClass;

  // Define a static 'super' property on ChildClass pointing to ParentClass.prototype
  Object.defineProperty(ChildClass, "super", {
    value: ParentClass.prototype
  });

  // If additional prototype properties are provided, assign them to ChildClass.prototype
  if (additionalPrototypeProperties) {
    Object.assign(ChildClass.prototype, additionalPrototypeProperties);
  }
};

module.exports = extendClassWithPrototypeAndStatics;