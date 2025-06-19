/**
 * OverheadValueTracker is a constructor function (class-like) that initializes tracking properties
 * for measuring overhead and value lengths, and copies configuration properties from the provided options object.
 *
 * @constructor
 * @param {Object} [options={}] - Optional configuration object whose properties are copied to the instance.
 * @returns {OverheadValueTracker} Returns a new instance if not called with 'new'.
 */
function OverheadValueTracker(options) {
  // Ensure function is called as a constructor
  if (!(this instanceof OverheadValueTracker)) {
    return new OverheadValueTracker(options);
  }

  /**
   * Tracks the total overhead length.
   * @type {number}
   */
  this._overheadLength = 0;

  /**
   * Tracks the total value length.
   * @type {number}
   */
  this._valueLength = 0;

  /**
   * Stores values that need to be measured.
   * @type {Array}
   */
  this._valuesToMeasure = [];

  // Call parent constructor or initialization logic (assumed from h$1)
  h$1.call(this);

  // Default options to empty object if not provided
  options = options || {};

  // Copy all properties from options to this instance
  for (const configKey in options) {
    if (Object.prototype.hasOwnProperty.call(options, configKey)) {
      this[configKey] = options[configKey];
    }
  }
}

module.exports = OverheadValueTracker;