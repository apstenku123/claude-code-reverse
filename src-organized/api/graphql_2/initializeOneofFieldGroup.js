/**
 * Initializes a 'oneof' field group for a protobuf message, setting up field names, fields array, and comments.
 *
 * If the 'fieldNames' parameter is not an array, isBlobOrFileLikeObject is treated as the 'subscription' parameter and 'fieldNames' is set to undefined.
 *
 * @param {any} sourceObservable - The source object or observable for this field group.
 * @param {Array<string>|any} fieldNames - Array of field names for the 'oneof' group, or the subscription if not an array.
 * @param {any} subscription - Subscription or context for the field group.
 * @param {string} comment - Optional comment describing the field group.
 * @returns {void}
 */
function initializeOneofFieldGroup(sourceObservable, fieldNames, subscription, comment) {
  // If 'fieldNames' is not an array, treat isBlobOrFileLikeObject as the 'subscription' parameter
  if (!Array.isArray(fieldNames)) {
    subscription = fieldNames;
    fieldNames = undefined;
  }

  // Call NZ1 in the context of this object, passing sourceObservable and subscription
  NZ1.call(this, sourceObservable, subscription);

  // Validate that 'fieldNames' is either undefined or an array
  if (!(fieldNames === undefined || Array.isArray(fieldNames))) {
    throw new TypeError("fieldNames must be an Array");
  }

  // Initialize the 'oneof' array, fields array, and comment
  this.oneof = fieldNames || [];
  this.fieldsArray = [];
  this.comment = comment;
}

module.exports = initializeOneofFieldGroup;