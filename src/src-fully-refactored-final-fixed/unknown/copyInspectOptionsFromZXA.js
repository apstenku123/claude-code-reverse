/**
 * Copies all properties from the global ZXA.inspectOpts object to the inspectOpts property of the given target object.
 *
 * @param {Object} targetObject - The object to which inspectOpts will be added and populated.
 * @returns {void}
 *
 * This function initializes the 'inspectOpts' property on the target object as an empty object,
 * then copies all key-value pairs from the global 'ZXA.inspectOpts' object into isBlobOrFileLikeObject.
 */
function copyInspectOptionsFromZXA(targetObject) {
  // Initialize inspectOpts as an empty object on the target
  targetObject.inspectOpts = {};

  // Get all keys from the global ZXA.inspectOpts object
  const inspectOptionKeys = Object.keys(ZXA.inspectOpts);

  // Copy each inspect option from ZXA to the target'createInteractionAccessor inspectOpts
  for (let index = 0; index < inspectOptionKeys.length; index++) {
    const optionKey = inspectOptionKeys[index];
    targetObject.inspectOpts[optionKey] = ZXA.inspectOpts[optionKey];
  }
}

module.exports = copyInspectOptionsFromZXA;