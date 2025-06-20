/**
 * Creates a custom Error class with a specified name and optional property assignment.
 *
 * @param {string} errorName - The name to assign to the custom error class (e.g., 'ValidationError').
 * @returns {CustomErrorConstructor} - The custom error class constructor.
 *
 * @typedef {Error & { [key: string]: any }} CustomErrorInstance
 * @typedef {new (message: string, extraProperties?: object) => CustomErrorInstance} CustomErrorConstructor
 */
function createCustomErrorClass(errorName) {
  /**
   * Custom error constructor function.
   *
   * @param {string} message - The error message.
   * @param {object} [extraProperties] - Optional extra properties to assign to the error instance.
   * @returns {CustomErrorInstance}
   */
  function CustomError(message, extraProperties) {
    // Allow instantiation without 'new'
    if (!(this instanceof CustomError)) {
      return new CustomError(message, extraProperties);
    }

    // Define a dynamic 'message' property
    Object.defineProperty(this, "message", {
      get: function () {
        return message;
      }
    });

    // Capture stack trace if available, otherwise assign manually
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    } else {
      Object.defineProperty(this, "stack", {
        value: new Error().stack || ""
      });
    }

    // Assign extra properties if provided
    if (extraProperties) {
      assignMissingProperties(this, extraProperties);
    }
  }

  // Set up prototype chain and custom properties
  CustomError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: CustomError,
      writable: true,
      enumerable: false,
      configurable: true
    },
    name: {
      get: function () {
        return errorName;
      },
      // No setter
      enumerable: false,
      configurable: true
    },
    toString: {
      value: function () {
        return this.name + ": " + this.message;
      },
      writable: true,
      enumerable: false,
      configurable: true
    }
  });

  return CustomError;
}

module.exports = createCustomErrorClass;