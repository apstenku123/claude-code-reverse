/**
 * Marks the provided object as an ES module and applies a transformation function.
 *
 * This function creates a shallow copy of the input object, adds the `__esModule` property (set to true),
 * and then passes the result to the `copyMissingPropertiesWithGetters` function along with the original input.
 *
 * @param {object} targetObject - The object to be marked as an ES module and transformed.
 * @returns {*} The result of applying the `copyMissingPropertiesWithGetters` function to the marked object and the original input.
 */
const defineEsModuleAndApply = (targetObject) => {
  // Create a shallow copy of the input object and add the __esModule property
  const esModuleObject = gX1({}, "__esModule", { value: true });
  // Pass the marked object and the original input to copyMissingPropertiesWithGetters for further processing
  return copyMissingPropertiesWithGetters(esModuleObject, targetObject);
};

module.exports = defineEsModuleAndApply;