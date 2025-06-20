/**
 * Marks the provided module as an ES module and applies an accessor function.
 *
 * This function creates a new object with the `__esModule` property set to true,
 * then passes this object and the provided accessor to the `copyMissingPropertiesWithGetters` function.
 *
 * @param {any} accessor - The accessor or module to be wrapped and processed.
 * @returns {any} The result of passing the ES module-marked object and accessor to `copyMissingPropertiesWithGetters`.
 */
const createEsModuleWithAccessor = (accessor) => {
  // Create a new object with __esModule: true using kJ1
  const esModuleObject = kJ1({}, "__esModule", { value: true });
  // Pass the ES module object and the accessor to copyMissingPropertiesWithGetters
  return copyMissingPropertiesWithGetters(esModuleObject, accessor);
};

module.exports = createEsModuleWithAccessor;
