/**
 * Marks the provided object as an ES module and applies a transformation function.
 *
 * This function creates a shallow copy of an object with the '__esModule' property set to true,
 * then passes this object to the provided transformation function.
 *
 * @param {Function} transformationFunction - a function to apply to the ES module-marked object.
 * @returns {*} The result of the transformation function applied to the ES module-marked object.
 */
const markAsESModuleAndApply = (transformationFunction) => {
  // Create a shallow copy of an object with '__esModule' set to true
  const esModuleObject = u31({}, "__esModule", { value: true });
  // Pass the ES module-marked object to the provided transformation function
  return copyPropertiesWithGetters(esModuleObject, transformationFunction);
};

module.exports = markAsESModuleAndApply;