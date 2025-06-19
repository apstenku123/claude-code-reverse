/**
 * Deeply clones or transforms observable-like types (W3, YV, ZF, SU, Fz) recursively.
 * Handles nested shapes and elements, ensuring all subtypes are appropriately cloned or transformed.
 *
 * @param {any} sourceObservable - The observable-like object or value to clone/transform.
 * @returns {any} - a deeply cloned/transformed observable-like object or the original value if not recognized.
 */
function deepCloneObservableType(sourceObservable) {
  // Handle W3 type: recursively clone each property in the shape
  if (sourceObservable instanceof W3) {
    const clonedShape = {};
    for (const propertyName in sourceObservable.shape) {
      const propertyValue = sourceObservable.shape[propertyName];
      // Recursively clone each property in the shape
      clonedShape[propertyName] = ZF.create(deepCloneObservableType(propertyValue));
    }
    // Return a new W3 instance with the cloned shape
    return new W3({
      ...sourceObservable._def,
      shape: () => clonedShape
    });
  }
  // Handle YV type: recursively clone the element type
  else if (sourceObservable instanceof YV) {
    return new YV({
      ...sourceObservable._def,
      type: deepCloneObservableType(sourceObservable.element)
    });
  }
  // Handle ZF type: unwrap and recursively clone
  else if (sourceObservable instanceof ZF) {
    return ZF.create(deepCloneObservableType(sourceObservable.unwrap()));
  }
  // Handle SU type: unwrap and recursively clone
  else if (sourceObservable instanceof SU) {
    return SU.create(deepCloneObservableType(sourceObservable.unwrap()));
  }
  // Handle Fz type: recursively clone each item in the items array
  else if (sourceObservable instanceof Fz) {
    return Fz.create(sourceObservable.items.map(item => deepCloneObservableType(item)));
  }
  // For all other types, return as is
  else {
    return sourceObservable;
  }
}

module.exports = deepCloneObservableType;