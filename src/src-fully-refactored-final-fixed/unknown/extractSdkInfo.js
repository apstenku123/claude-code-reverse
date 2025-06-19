/**
 * Extracts the SDK name and version from the provided object, if available.
 *
 * @param {Object} sdkContainer - An object that may contain an 'sdk' property.
 * @param {Object} [sdkContainer.sdk] - The SDK object containing 'name' and 'version'.
 * @param {string} [sdkContainer.sdk.name] - The name of the SDK.
 * @param {string} [sdkContainer.sdk.version] - The version of the SDK.
 * @returns {{ name: string, version: string }|undefined} An object with 'name' and 'version' if present, otherwise undefined.
 */
function extractSdkInfo(sdkContainer) {
  // Return undefined if input or its 'sdk' property is missing
  if (!sdkContainer || !sdkContainer.sdk) return;

  const { name: sdkName, version: sdkVersion } = sdkContainer.sdk;

  // Return an object with the SDK'createInteractionAccessor name and version
  return {
    name: sdkName,
    version: sdkVersion
  };
}

module.exports = extractSdkInfo;
