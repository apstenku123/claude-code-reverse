/**
 * Adds the __esModule property to the provided module object.
 *
 * This function merges the given module object with an object that has the
 * '__esModule' property set to true. This is commonly used to indicate that
 * the module is an ES module, which can be important for interoperability
 * between CommonJS and ES module systems.
 *
 * @param {object} moduleObject - The module object to which the __esModule flag will be added.
 * @returns {object} The resulting module object with the __esModule property set to true.
 */
const addEsModuleFlag = (moduleObject) => {
  // Merge the moduleObject with an object that has __esModule: true
  // Tn is assumed to be an object merging utility (like Object.assign)
  return copyPropertiesWithGetters(
    Tn({}, "__esModule", { value: true }),
    moduleObject
  );
};

module.exports = addEsModuleFlag;
