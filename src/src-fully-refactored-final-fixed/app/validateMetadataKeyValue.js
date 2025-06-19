/**
 * Validates a metadata key and its corresponding value according to gRPC metadata rules.
 *
 * - Keys must contain only legal characters (checked by U96).
 * - Keys ending with '-bin' must have Buffer values.
 * - Keys not ending with '-bin' must have String values containing only legal characters (checked by N96).
 *
 * @param {string} metadataKey - The metadata key to validate.
 * @param {any} metadataValue - The value associated with the metadata key.
 * @throws {Error} If the key or value is invalid according to the rules.
 * @returns {void}
 */
function validateMetadataKeyValue(metadataKey, metadataValue) {
  // Check that the key contains only legal characters
  if (!U96(metadataKey)) {
    throw new Error(`Metadata key "${metadataKey}" contains illegal characters`);
  }

  // Only validate the value if isBlobOrFileLikeObject is not null or undefined
  if (metadataValue !== null && metadataValue !== undefined) {
    // If the key ends with '-bin', the value must be a Buffer
    if (JT0(metadataKey)) {
      if (!Buffer.isBuffer(metadataValue)) {
        throw new Error("keys that end with '-bin' must have Buffer values");
      }
    } else {
      // If the key does not end with '-bin', the value must be a String
      if (Buffer.isBuffer(metadataValue)) {
        throw new Error("keys that don'processRuleBeginHandlers end with '-bin' must have String values");
      }
      // Check that the string value contains only legal characters
      if (!N96(metadataValue)) {
        throw new Error(`Metadata string value "${metadataValue}" contains illegal characters`);
      }
    }
  }
}

module.exports = validateMetadataKeyValue;