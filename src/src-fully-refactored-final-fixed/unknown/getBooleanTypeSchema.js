/**
 * Returns a schema object representing a boolean type.
 *
 * @returns {{ type: string }} An object with a 'type' property set to 'boolean'.
 */
function getBooleanTypeSchema() {
  // Return a schema definition for a boolean type
  return {
    type: "boolean"
  };
}

module.exports = getBooleanTypeSchema;