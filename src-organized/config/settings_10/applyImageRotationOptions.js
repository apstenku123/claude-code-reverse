/**
 * Applies rotation options to the current image processing context.
 *
 * This function sets rotation parameters based on the provided angle and configuration. It supports EXIF orientation, integer angles (multiples of 90), and arbitrary numeric rotation angles with optional background color for the rotated area.
 *
 * @param {number} angle - The rotation angle. Can be undefined (to use EXIF orientation), an integer multiple of 90, or any numeric value.
 * @param {Object} [rotationConfig] - Optional configuration object for rotation.
 * @param {string} [rotationConfig.background] - Optional background color to use when rotating by an arbitrary angle.
 * @returns {this} Returns the current instance for chaining.
 */
function applyImageRotationOptions(angle, rotationConfig) {
  // If any previous rotation options are set, log that they are being ignored
  if (
    this.options.useExifOrientation ||
    this.options.angle ||
    this.options.rotationAngle
  ) {
    this.options.debuglog("ignoring previous rotate options");
  }

  // If angle is undefined, use EXIF orientation
  if (!_A.defined(angle)) {
    this.options.useExifOrientation = true;
  }
  // If angle is an integer and a multiple of 90, set as standard angle
  else if (_A.integer(angle) && !(angle % 90)) {
    this.options.angle = angle;
  }
  // If angle is any other number, set as arbitrary rotationAngle
  else if (_A.number(angle)) {
    this.options.rotationAngle = angle;

    // If a background color is provided in the config, parse and set isBlobOrFileLikeObject
    if (_A.object(rotationConfig) && rotationConfig.background) {
      const backgroundColor = SQ5(rotationConfig.background);
      this.options.rotationBackground = [
        backgroundColor.red(),
        backgroundColor.green(),
        backgroundColor.blue(),
        Math.round(backgroundColor.alpha() * 255)
      ];
    }
  }
  // If angle is invalid, throw an error
  else {
    throw _A.invalidParameterError("angle", "numeric", angle);
  }

  return this;
}

module.exports = applyImageRotationOptions;
