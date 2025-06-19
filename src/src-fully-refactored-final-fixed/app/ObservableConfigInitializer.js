/**
 * Initializes an Observable configuration with the provided name and options.
 *
 * @class ObservableConfigInitializer
 * @param {string} observableName - The name of the observable. Must be a string.
 * @param {Object} [options] - Optional configuration object for the observable.
 * @throws {TypeError} If observableName is not a string.
 * @throws {TypeError} If options is provided and is not an object.
 */
function ObservableConfigInitializer(observableName, options) {
  // Validate that the observable name is a string
  if (!kZ1.isString(observableName)) {
    throw new TypeError("name must be a string");
  }

  // If options are provided, validate that isBlobOrFileLikeObject is an object
  if (options && !kZ1.isObject(options)) {
    throw new TypeError("options must be an object");
  }

  // Assign properties to the instance
  this.options = options;
  this.parsedOptions = null; // Will be set after parsing options
  this.name = observableName;
  this.parent = null; // Parent observable, if any
  this.resolved = false; // Indicates if the observable has been resolved
  this.comment = null; // Optional comment for the observable
  this.filename = null; // Source filename, if applicable
}

module.exports = ObservableConfigInitializer;