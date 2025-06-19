/**
 * Applies rotation options to the current instance based on the provided angle and configuration.
 *
 * If no angle is provided, enables EXIF orientation. If the angle is an integer multiple of 90, sets the angle directly.
 * If the angle is a number (but not an integer multiple of 90), sets the rotationAngle and optionally the rotation background color.
 * Throws an error if the angle is not a valid number.
 *
 * @param {number} angle - The rotation angle to apply. Can be undefined, an integer multiple of 90, or any number.
 * @param {Object} [options] - Optional configuration object. May contain a 'background' property for rotation background color.
 * @returns {this} Returns the current instance for chaining.
 */
function applyRotationOptions(angle, options) {
  // If any previous rotation options are set, log that they are being ignored
  if (
    this.options.useExifOrientation ||
    this.options.angle ||
    this.options.rotationAngle
  ) {
    this.options.debuglog("ignoring previous rotate options");
  }

  // If angle is undefined, enable EXIF orientation
  if (!_A.defined(angle)) {
    this.options.useExifOrientation = true;
  }
  // If angle is an integer and a multiple of 90, set as angle
  else if (_A.integer(angle) && !(angle % 90)) {
    this.options.angle = angle;
  }
  // If angle is a number (but not an integer multiple of 90), set rotationAngle
  else if (_A.number(angle)) {
    this.options.rotationAngle = angle;
    // If options is an object and has a background property, set rotation background color
    if (_A.object(options) && options.background) {
      const color = SQ5(options.background);
      this.options.rotationBackground = [
        color.red(),
        color.green(),
        color.blue(),
        Math.round(color.alpha() * 255)
      ];
    }
  }
  // If angle is not valid, throw an error
  else {
    throw _A.invalidParameterError("angle", "numeric", angle);
  }

  return this;
}

module.exports = applyRotationOptions;