/**
 * Deeply clones and transforms observable schema objects, handling various schema types recursively.
 *
 * @param {W3|YV|ZF|SU|Fz|any} sourceObservable - The observable schema or value to clone and transform.
 * @returns {any} - a deeply cloned and transformed schema or value, preserving the original structure and types.
 */
function deepCloneObservableSchema(sourceObservable) {
  // Handle W3 schema (object with shape)
  if (sourceObservable instanceof W3) {
    const clonedShape = {};
    // Recursively clone each property in the shape
    for (const propertyName in sourceObservable.shape) {
      const propertySchema = sourceObservable.shape[propertyName];
      clonedShape[propertyName] = ZF.create(deepCloneObservableSchema(propertySchema));
    }
    // Return a new W3 instance with the cloned shape
    return new W3({
      ...sourceObservable._def,
      shape: () => clonedShape
    });
  }
  // Handle YV schema (type wrapper)
  else if (sourceObservable instanceof YV) {
    return new YV({
      ...sourceObservable._def,
      type: deepCloneObservableSchema(sourceObservable.element)
    });
  }
  // Handle ZF schema (wrapper)
  else if (sourceObservable instanceof ZF) {
    return ZF.create(deepCloneObservableSchema(sourceObservable.unwrap()));
  }
  // Handle SU schema (wrapper)
  else if (sourceObservable instanceof SU) {
    return SU.create(deepCloneObservableSchema(sourceObservable.unwrap()));
  }
  // Handle Fz schema (array of items)
  else if (sourceObservable instanceof Fz) {
    return Fz.create(sourceObservable.items.map(item => deepCloneObservableSchema(item)));
  }
  // Base case: return the value as is
  else {
    return sourceObservable;
  }
}

module.exports = deepCloneObservableSchema;
