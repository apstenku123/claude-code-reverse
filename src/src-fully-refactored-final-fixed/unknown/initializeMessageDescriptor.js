/**
 * Initializes a message descriptor by calling the parent constructor and setting up descriptor properties.
 *
 * @param {Object} messageDefinition - The definition or schema of the message.
 * @param {Object} options - Configuration options for the message descriptor.
 * @returns {void}
 *
 * This function is typically used as a constructor for message descriptor objects in a protocol buffer or similar system.
 */
function initializeMessageDescriptor(messageDefinition, options) {
  // Call the parent constructor with the provided message definition and options
  hV.call(this, messageDefinition, options);

  // Initialize fields as an empty object to store field definitions
  this.fields = {};

  // Initialize oneofs, extensions, reserved, and group as undefined
  // These will be set later if applicable to the message definition
  this.oneofs = undefined;
  this.extensions = undefined;
  this.reserved = undefined;
  this.group = undefined;

  // Internal caches for fields and oneofs arrays, and a constructor reference
  this._fieldsById = null;
  this._fieldsArray = null;
  this._oneofsArray = null;
  this._ctor = null;
}

module.exports = initializeMessageDescriptor;