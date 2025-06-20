/**
 * @class FieldDescriptor
 * @description
 * Represents a field descriptor for a protocol buffer message, encapsulating metadata such as field id, type, rule, and other options. Handles flexible argument signatures for compatibility and validation of input parameters.
 *
 * @param {string} fieldName - The name of the field.
 * @param {number} fieldId - The unique non-negative integer identifier for the field.
 * @param {string} fieldType - The type of the field (e.g., 'string', 'int32', 'bytes').
 * @param {string} [fieldRule] - The rule for the field (e.g., 'optional', 'required', 'repeated', 'proto3_optional').
 * @param {string} [fieldExtension] - The extension name if this field extends another message.
 * @param {Object} [fieldOptions] - Additional options for the field.
 * @param {string} [fieldComment] - Optional comment or documentation for the field.
 * @throws {TypeError} If fieldId is not a non-negative integer, fieldType is not a string, or fieldRule is invalid.
 */
function FieldDescriptor(
  fieldName,
  fieldId,
  fieldType,
  fieldRule,
  fieldExtension,
  fieldOptions,
  fieldComment
) {
  // Handle flexible argument signatures for backward compatibility
  if (G7.isObject(fieldRule)) {
    fieldComment = fieldExtension;
    fieldOptions = fieldRule;
    fieldRule = fieldExtension = undefined;
  } else if (G7.isObject(fieldExtension)) {
    fieldComment = fieldOptions;
    fieldOptions = fieldExtension;
    fieldExtension = undefined;
  }

  // Call parent constructor or initializer
  EZ1.call(this, fieldName, fieldOptions);

  // Validate fieldId
  if (!G7.isInteger(fieldId) || fieldId < 0) {
    throw TypeError("id must be a non-negative integer");
  }

  // Validate fieldType
  if (!G7.isString(fieldType)) {
    throw TypeError("type must be a string");
  }

  // Validate fieldRule if provided
  if (
    fieldRule !== undefined &&
    !d56.test((fieldRule = fieldRule.toString().toLowerCase()))
  ) {
    throw TypeError("rule must be a string rule");
  }

  // Validate fieldExtension if provided
  if (fieldExtension !== undefined && !G7.isString(fieldExtension)) {
    throw TypeError("extend must be a string");
  }

  // Normalize proto3_optional rule
  if (fieldRule === "proto3_optional") {
    fieldRule = "optional";
  }

  // Assign properties
  this.rule = fieldRule && fieldRule !== "optional" ? fieldRule : undefined;
  this.type = fieldType;
  this.id = fieldId;
  this.extend = fieldExtension || undefined;
  this.required = fieldRule === "required";
  this.optional = !this.required;
  this.repeated = fieldRule === "repeated";
  this.map = false;
  this.message = null;
  this.partOf = null;
  this.typeDefault = null;
  this.defaultValue = null;
  this.long = G7.Long ? NS0.long[fieldType] !== undefined : false;
  this.bytes = fieldType === "bytes";
  this.resolvedType = null;
  this.extensionField = null;
  this.declaringField = null;
  this._packed = null;
  this.comment = fieldComment;
}

module.exports = FieldDescriptor;