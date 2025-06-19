/**
 * Merges SDK metadata from a source object and an optional configuration object.
 *
 * If the configuration object is provided, its SDK properties (name, version, integrations, packages)
 * are merged into the source object'createInteractionAccessor `sdk` property. Arrays are concatenated, and existing values
 * in the source object are preserved if already present.
 *
 * @param {Object} sourceObject - The object to which SDK metadata will be merged. This object will be mutated.
 * @param {Object} [sdkConfig] - Optional configuration object containing SDK metadata to merge.
 * @returns {Object} The updated source object with merged SDK metadata.
 */
function mergeSdkMetadata(sourceObject, sdkConfig) {
  // If no configuration is provided, return the source object as-is
  if (!sdkConfig) {
    return sourceObject;
  }

  // Ensure the source object has an 'sdk' property
  sourceObject.sdk = sourceObject.sdk || {};

  // Merge 'name' and 'version' if not already present in the source object
  sourceObject.sdk.name = sourceObject.sdk.name || sdkConfig.name;
  sourceObject.sdk.version = sourceObject.sdk.version || sdkConfig.version;

  // Merge 'integrations' arrays (concatenate, preserving existing entries)
  sourceObject.sdk.integrations = [
    ...(sourceObject.sdk.integrations || []),
    ...(sdkConfig.integrations || [])
  ];

  // Merge 'packages' arrays (concatenate, preserving existing entries)
  sourceObject.sdk.packages = [
    ...(sourceObject.sdk.packages || []),
    ...(sdkConfig.packages || [])
  ];

  return sourceObject;
}

module.exports = mergeSdkMetadata;
