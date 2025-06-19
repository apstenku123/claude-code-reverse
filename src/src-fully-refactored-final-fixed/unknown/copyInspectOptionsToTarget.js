/**
 * Copies the properties from ZXA.inspectOpts to the inspectOpts property of the target object.
 *
 * @param {Object} targetObject - The object to which inspect options will be copied. The function will create or overwrite the 'inspectOpts' property on this object.
 * @returns {void}
 */
function copyInspectOptionsToTarget(targetObject) {
  // Initialize the inspectOpts property as an empty object
  targetObject.inspectOpts = {};

  // Get all property keys from ZXA.inspectOpts
  const inspectOptionKeys = Object.keys(ZXA.inspectOpts);

  // Copy each property from ZXA.inspectOpts to targetObject.inspectOpts
  for (let index = 0; index < inspectOptionKeys.length; index++) {
    const optionKey = inspectOptionKeys[index];
    targetObject.inspectOpts[optionKey] = ZXA.inspectOpts[optionKey];
  }
}

module.exports = copyInspectOptionsToTarget;