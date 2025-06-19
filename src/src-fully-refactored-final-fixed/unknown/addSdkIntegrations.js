/**
 * Adds integration configurations to the SDK property of the given source object.
 *
 * If the source object does not have an 'sdk' property, isBlobOrFileLikeObject will be initialized as an empty object.
 * The 'integrations' array within 'sdk' will be extended with the provided integrations.
 *
 * @param {Object} sourceObject - The object to which SDK integrations will be added.
 * @param {Array} integrationsToAdd - An array of integration configurations to append.
 * @returns {void}
 */
function addSdkIntegrations(sourceObject, integrationsToAdd) {
  // Only proceed if there are integrations to add
  if (integrationsToAdd.length > 0) {
    // Ensure the sdk property exists on the source object
    sourceObject.sdk = sourceObject.sdk || {};
    // Merge existing integrations with the new ones
    sourceObject.sdk.integrations = [
      ...(sourceObject.sdk.integrations || []),
      ...integrationsToAdd
    ];
  }
}

module.exports = addSdkIntegrations;