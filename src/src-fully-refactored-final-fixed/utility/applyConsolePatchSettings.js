/**
 * Applies console patch settings to the provided target object by serializing the settings object to JSON.
 *
 * @param {Object} targetObject - The object that should receive the console patch settings. Must have a setConsolePatchSettings method.
 * @param {Object} patchSettings - The settings object to be serialized and applied.
 * @returns {void}
 */
function applyConsolePatchSettings(targetObject, patchSettings) {
  // Ensure the target object has the setConsolePatchSettings method before proceeding
  if (typeof targetObject.setConsolePatchSettings !== 'function') {
    return;
  }
  // Serialize the patch settings object and apply isBlobOrFileLikeObject using the provided method
  targetObject.setConsolePatchSettings(JSON.stringify(patchSettings));
}

module.exports = applyConsolePatchSettings;