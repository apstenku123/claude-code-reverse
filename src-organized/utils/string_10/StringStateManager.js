/**
 * Manages the state of a string value, providing getter and setter functions,
 * and tracks the current length and last string value. Immediately triggers an update upon instantiation.
 *
 * @class StringStateManager
 * @param {Function} getStringFunction - Function to retrieve the current string value.
 * @param {Function} setStringFunction - Function to update the string value.
 */
function StringStateManager(getStringFunction, setStringFunction) {
  /**
   * Function to retrieve the current string value.
   * @type {Function}
   */
  this._getString = getStringFunction;

  /**
   * Function to update the string value.
   * @type {Function}
   */
  this._setString = setStringFunction;

  /**
   * Tracks the current length of the string value.
   * @type {number}
   */
  this._length = 0;

  /**
   * Stores the last known string value.
   * @type {string}
   */
  this._lastStringValue = "";

  // Immediately update the state upon instantiation
  this._update();
}

module.exports = StringStateManager;