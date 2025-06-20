/**
 * Determines if an image has a non-default orientation based on its angle, EXIF orientation usage, or rotation angle.
 *
 * @param {Object} imageMetadata - The metadata object describing the image'createInteractionAccessor orientation.
 * @param {number} imageMetadata.angle - The angle (in degrees) of the image. Typically 0 if not rotated.
 * @param {boolean} imageMetadata.useExifOrientation - Indicates if EXIF orientation should be used.
 * @param {number} imageMetadata.rotationAngle - The rotation angle (in degrees) applied to the image. Typically 0 if not rotated.
 * @returns {boolean} Returns true if the image has a non-default orientation (rotated or using EXIF orientation), otherwise false.
 */
function hasNonDefaultImageOrientation(imageMetadata) {
  // Check if the image is rotated (angle not a multiple of 360),
  // uses EXIF orientation, or has a non-zero rotation angle
  const isAngleRotated = imageMetadata.angle % 360 !== 0;
  const usesExifOrientation = imageMetadata.useExifOrientation === true;
  const hasRotationAngle = imageMetadata.rotationAngle !== 0;

  return isAngleRotated || usesExifOrientation || hasRotationAngle;
}

module.exports = hasNonDefaultImageOrientation;