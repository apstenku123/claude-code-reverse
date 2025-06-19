/**
 * Initializes command options with validation and default properties.
 *
 * @class CommandOptionsInitializer
 * @param {string} commandName - The name of the command to initialize. Must be a string.
 * @param {Object} [options] - Optional configuration object for the command.
 * @throws {TypeError} If commandName is not a string.
 * @throws {TypeError} If options is provided and is not an object.
 *
 * @property {Object|null} options - The provided options object or null.
 * @property {Object|null} parsedOptions - Placeholder for parsed options, initialized as null.
 * @property {string} name - The validated command name.
 * @property {Object|null} parent - Placeholder for parent command, initialized as null.
 * @property {boolean} resolved - Indicates if the command has been resolved, initialized as false.
 * @property {string|null} comment - Placeholder for a comment, initialized as null.
 * @property {string|null} filename - Placeholder for a filename, initialized as null.
 */
function CommandOptionsInitializer(commandName, options) {
  // Validate that commandName is a string
  if (!kZ1.isString(commandName)) {
    throw new TypeError("name must be a string");
  }

  // If options is provided, ensure isBlobOrFileLikeObject is an object
  if (options && !kZ1.isObject(options)) {
    throw new TypeError("options must be an object");
  }

  // Assign validated and default properties
  this.options = options;
  this.parsedOptions = null;
  this.name = commandName;
  this.parent = null;
  this.resolved = false;
  this.comment = null;
  this.filename = null;
}

module.exports = CommandOptionsInitializer;