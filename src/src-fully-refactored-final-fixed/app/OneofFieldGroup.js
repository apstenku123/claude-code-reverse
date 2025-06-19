/**
 * Represents a group of mutually exclusive fields (oneof) in a message schema.
 *
 * @class
 * @param {Object} sourceDescriptor - The source descriptor or definition for the field group.
 * @param {Array<string>} [fieldNames] - Optional array of field names that are part of the oneof group.
 * @param {Object} [subscription] - Optional subscription or options object for further configuration.
 * @param {string} [comment] - Optional comment or description for this oneof group.
 * @throws {TypeError} Throws if fieldNames is provided and is not an array.
 */
function OneOfFieldGroup(sourceDescriptor, fieldNames, subscription, comment) {
  // If the second argument is not an array, treat isBlobOrFileLikeObject as the subscription parameter
  if (!Array.isArray(fieldNames)) {
    subscription = fieldNames;
    fieldNames = undefined;
  }

  // Call the NZ1 function (likely a base constructor or validator) with the current context
  NZ1.call(this, sourceDescriptor, subscription);

  // Validate that fieldNames, if provided, is an array
  if (!(fieldNames === undefined || Array.isArray(fieldNames))) {
    throw TypeError("fieldNames must be an Array");
  }

  /**
   * @type {Array<string>}
   * The names of the fields in this oneof group.
   */
  this.oneof = fieldNames || [];

  /**
   * @type {Array}
   * An array to hold field descriptors for this oneof group.
   */
  this.fieldsArray = [];

  /**
   * @type {string|undefined}
   * Optional comment or description for this oneof group.
   */
  this.comment = comment;
}

module.exports = OneOfFieldGroup;