/**
 * Initializes enum values and related metadata for a protobuf Enum type.
 *
 * @param {Object} enumType - The enum type definition (usually a protobuf descriptor).
 * @param {Object} enumValues - An object mapping enum names to their numeric values.
 * @param {Object} subscription - Subscription or context object for rS0 call.
 * @param {string} comment - Optional comment describing the enum.
 * @param {Object} commentsMap - Optional map of comments for each enum value.
 * @param {Object} valuesOptions - Optional options for enum values.
 * @returns {void}
 * @throws {TypeError} If enumValues is provided and is not an object.
 *
 * This function sets up the internal mappings for enum values by name and by id,
 * attaches comments, and stores options. It is typically used in protobuf code generation.
 */
function initializeEnumValues(enumType, enumValues, subscription, comment, commentsMap, valuesOptions) {
  // Call rS0 in the context of this object, passing enumType and subscription
  rS0.call(this, enumType, subscription);

  // Validate that enumValues, if provided, is an object
  if (enumValues && typeof enumValues !== "object") {
    throw TypeError("values must be an object");
  }

  // Initialize internal mappings and metadata
  this.valuesById = {};
  this.values = Object.create(this.valuesById);
  this.comment = comment;
  this.comments = commentsMap || {};
  this.valuesOptions = valuesOptions;
  this.reserved = undefined;

  // If enumValues is provided, map names to ids and ids to names
  if (enumValues) {
    const enumNames = Object.keys(enumValues);
    for (let i = 0; i < enumNames.length; ++i) {
      const name = enumNames[i];
      const value = enumValues[name];
      // Only process numeric enum values
      if (typeof value === "number") {
        this.valuesById[this.values[name] = value] = name;
      }
    }
  }
}

module.exports = initializeEnumValues;
