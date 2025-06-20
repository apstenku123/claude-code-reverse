/**
 * Initializes observable options and validates input parameters.
 *
 * @class ObservableOptionsInitializer
 * @param {string} observableName - The name of the observable. Must be a string.
 * @param {Object} [options] - Optional configuration object for the observable.
 * @throws {TypeError} If observableName is not a string.
 * @throws {TypeError} If options is provided but is not an object.
 */
function ObservableOptionsInitializer(observableName, options) {
  // Validate that the observable name is a string
  if (!kZ1.isString(observableName)) {
    throw new TypeError("name must be a string");
  }

  // If options are provided, validate that isBlobOrFileLikeObject is an object
  if (options && !kZ1.isObject(options)) {
    throw new TypeError("options must be an object");
  }

  /**
   * @property {Object|null} options - Configuration options for the observable
   */
  this.options = options;

  /**
   * @property {Object|null} parsedOptions - Placeholder for parsed options, initialized as null
   */
  this.parsedOptions = null;

  /**
   * @property {string} name - Name of the observable
   */
  this.name = observableName;

  /**
   * @property {Object|null} parent - Reference to parent observable, initialized as null
   */
  this.parent = null;

  /**
   * @property {boolean} resolved - Indicates if the observable has been resolved
   */
  this.resolved = false;

  /**
   * @property {string|null} comment - Optional comment, initialized as null
   */
  this.comment = null;

  /**
   * @property {string|null} filename - Optional filename, initialized as null
   */
  this.filename = null;
}

module.exports = ObservableOptionsInitializer;