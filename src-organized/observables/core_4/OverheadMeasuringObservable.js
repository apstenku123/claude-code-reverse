/**
 * @class OverheadMeasuringObservable
 * @classdesc
 * Represents an observable that tracks overhead and value lengths, and allows custom configuration via options.
 *
 * @param {Object} [options={}] - Optional configuration object to set instance properties.
 *
 * @returns {OverheadMeasuringObservable} An instance of OverheadMeasuringObservable.
 *
 * @example
 * const obs = new OverheadMeasuringObservable({ customProp: 123 });
 */
function OverheadMeasuringObservable(options = {}) {
  // Ensure function is called as a constructor
  if (!(this instanceof OverheadMeasuringObservable)) {
    return new OverheadMeasuringObservable(options);
  }

  // Initialize tracking properties
  this._overheadLength = 0;
  this._valueLength = 0;
  this._valuesToMeasure = [];

  // Call parent constructor (assumes h$1 is a parent class constructor)
  h$1.call(this);

  // Assign all properties from options to the instance
  for (const propertyName in options) {
    if (Object.prototype.hasOwnProperty.call(options, propertyName)) {
      this[propertyName] = options[propertyName];
    }
  }
}

module.exports = OverheadMeasuringObservable;