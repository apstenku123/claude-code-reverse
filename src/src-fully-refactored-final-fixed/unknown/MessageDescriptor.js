/**
 * Represents a message descriptor, initializing its fields and configuration.
 * Calls the parent constructor and sets up internal properties for fields, oneofs, extensions, reserved names, and group information.
 *
 * @class
 * @extends hV
 * @param {Object} messageDefinition - The definition or schema for the message.
 * @param {Object} options - Additional configuration options for the message descriptor.
 */
function MessageDescriptor(messageDefinition, options) {
  // Call the parent constructor with the provided message definition and options
  hV.call(this, messageDefinition, options);

  /**
   * Stores field definitions by field name.
   * @type {Object}
   */
  this.fields = {};

  /**
   * Stores oneof group definitions, if any.
   * @type {Object|undefined}
   */
  this.oneofs = undefined;

  /**
   * Stores extension field definitions, if any.
   * @type {Object|undefined}
   */
  this.extensions = undefined;

  /**
   * Stores reserved field names or numbers, if any.
   * @type {Object|undefined}
   */
  this.reserved = undefined;

  /**
   * Indicates if this descriptor represents a group.
   * @type {Object|undefined}
   */
  this.group = undefined;

  /**
   * Cached lookup table for fields by their numeric updateSnapshotAndNotify.
   * @type {Object|null}
   */
  this._fieldsById = null;

  /**
   * Cached array of field definitions.
   * @type {Array|null}
   */
  this._fieldsArray = null;

  /**
   * Cached array of oneof group definitions.
   * @type {Array|null}
   */
  this._oneofsArray = null;

  /**
   * Cached constructor reference for the message type.
   * @type {Function|null}
   */
  this._ctor = null;
}

module.exports = MessageDescriptor;