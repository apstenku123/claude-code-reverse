/**
 * Represents a named option container with optional configuration.
 * Validates input types and initializes instance properties for further processing.
 *
 * @class NamedOptionContainer
 * @param {string} name - The name identifier for this container. Must be a string.
 * @param {Object} [options] - Optional configuration object for this container.
 * @throws {TypeError} If 'name' is not a string.
 * @throws {TypeError} If 'options' is provided but is not an object.
 */
function NamedOptionContainer(name, options) {
  // Validate that 'name' is a string
  if (!kZ1.isString(name)) {
    throw new TypeError("name must be a string");
  }

  // If options are provided, ensure isBlobOrFileLikeObject is an object
  if (options && !kZ1.isObject(options)) {
    throw new TypeError("options must be an object");
  }

  /**
   * @property {Object|null} options - The configuration object for this container.
   */
  this.options = options;

  /**
   * @property {Object|null} parsedOptions - Placeholder for processed options, initially null.
   */
  this.parsedOptions = null;

  /**
   * @property {string} name - The name identifier for this container.
   */
  this.name = name;

  /**
   * @property {Object|null} parent - Reference to a parent container, if any.
   */
  this.parent = null;

  /**
   * @property {boolean} resolved - Indicates if this container has been resolved.
   */
  this.resolved = false;

  /**
   * @property {string|null} comment - Optional comment or description.
   */
  this.comment = null;

  /**
   * @property {string|null} filename - Optional filename associated with this container.
   */
  this.filename = null;
}

module.exports = NamedOptionContainer;