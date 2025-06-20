/**
 * Enables merging of EXIF data and sets the source observable.
 *
 * This method calls the instance'createInteractionAccessor withExif method with the provided source observable,
 * then sets the withExifMerge option to true, and finally returns the instance for chaining.
 *
 * @param {any} sourceObservable - The observable or data source to be used for EXIF operations.
 * @returns {this} Returns the current instance to allow method chaining.
 */
function enableExifMergeWithSource(sourceObservable) {
  // Apply the EXIF operation with the provided source
  this.withExif(sourceObservable);
  // Enable the EXIF merge option
  this.options.withExifMerge = true;
  // Return the instance for chaining
  return this;
}

module.exports = enableExifMergeWithSource;