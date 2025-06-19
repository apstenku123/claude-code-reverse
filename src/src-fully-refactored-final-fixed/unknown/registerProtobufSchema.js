/**
 * Registers a protobuf schema configuration under a normalized key.
 *
 * If the provided schemaKey does not match the expected pattern (g86),
 * isBlobOrFileLikeObject will be normalized to the format 'google/protobuf/{schemaKey}.proto',
 * and the schemaConfig will be wrapped in a nested object structure under
 * google.protobuf. The schema is then stored in the global registerProtobufSchema registry.
 *
 * @param {string} schemaKey - The key or path identifying the protobuf schema.
 * @param {object} schemaConfig - The configuration object for the protobuf schema.
 * @returns {void}
 */
function registerProtobufSchema(schemaKey, schemaConfig) {
  // If schemaKey does not match the expected pattern, normalize isBlobOrFileLikeObject and wrap config
  if (!g86.test(schemaKey)) {
    schemaKey = `google/protobuf/${schemaKey}.proto`;
    schemaConfig = {
      nested: {
        google: {
          nested: {
            protobuf: {
              nested: schemaConfig
            }
          }
        }
      }
    };
  }
  // Register the schema configuration under the normalized key
  registerProtobufSchema[schemaKey] = schemaConfig;
}

module.exports = registerProtobufSchema;