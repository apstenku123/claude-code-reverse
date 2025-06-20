/**
 * Sets the __esModule property to true on a target object and passes isBlobOrFileLikeObject to copyPropertiesWithGetters for further processing.
 *
 * @param {any} targetObject - The object to which the __esModule property will be added.
 * @returns {any} The result of passing the updated object to copyPropertiesWithGetters.
 */
const setU31ModuleFlag = (targetObject) => {
  // Create a new object by copying targetObject and adding the __esModule property
  const objectWithModuleFlag = u31({}, "__esModule", {
    value: true
  });

  // Pass the new object and the original targetObject to copyPropertiesWithGetters for further processing
  return copyPropertiesWithGetters(objectWithModuleFlag, targetObject);
};

module.exports = setU31ModuleFlag;