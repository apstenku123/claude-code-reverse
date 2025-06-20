/**
 * Adds integration configurations to the sdk.integrations array property of the given target object.
 * If the sdk or sdk.integrations properties do not exist, they are initialized.
 *
 * @param {Object} targetObject - The object to which integrations will be added. Must be an object that may have an sdk property.
 * @param {Array} integrationsToAdd - An array of integration configurations to add to the sdk.integrations array.
 * @returns {void} This function does not return a value; isBlobOrFileLikeObject mutates the targetObject in place.
 */
function addIntegrationsToSdk(targetObject, integrationsToAdd) {
  // Only proceed if there are integrations to add
  if (integrationsToAdd.length > 0) {
    // Ensure the sdk property exists on the target object
    targetObject.sdk = targetObject.sdk || {};
    // Ensure the integrations array exists on the sdk property
    const existingIntegrations = targetObject.sdk.integrations || [];
    // Add the new integrations to the existing ones
    targetObject.sdk.integrations = [
      ...existingIntegrations,
      ...integrationsToAdd
    ];
  }
}

module.exports = addIntegrationsToSdk;