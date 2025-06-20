/**
 * Extracts and returns an options object containing only defined image processing options from the input parameter.
 * If none of the relevant options are defined, returns undefined.
 *
 * @param {Object} options - The options object potentially containing image processing parameters.
 * @param {Object} [options.raw] - Raw pixel input options.
 * @param {number} [options.density] - Image density (DPI).
 * @param {number} [options.limitInputPixels] - Maximum allowed input pixels.
 * @param {boolean} [options.ignoreIcc] - Whether to ignore ICC color profiles.
 * @param {boolean} [options.unlimited] - Whether to disable pixel limits.
 * @param {boolean} [options.sequentialRead] - Whether to enable sequential read mode.
 * @param {string} [options.failOn] - Failure mode for processing errors.
 * @param {boolean} [options.failOnError] - Whether to throw on error.
 * @param {boolean} [options.animated] - Whether to process animated images.
 * @param {number} [options.page] - Page number to process (for multi-page images).
 * @param {number} [options.pages] - Number of pages to process.
 * @param {boolean} [options.subifd] - Whether to process SubIFD images.
 * @returns {Object|undefined} An object containing only the defined options, or undefined if none are defined.
 */
function extractDefinedImageOptions(options) {
  const {
    raw: rawInput,
    density: imageDensity,
    limitInputPixels: maxInputPixels,
    ignoreIcc: ignoreIccProfile,
    unlimited: disablePixelLimit,
    sequentialRead: enableSequentialRead,
    failOn: failMode,
    failOnError: throwOnError,
    animated: processAnimated,
    page: pageNumber,
    pages: numberOfPages,
    subifd: processSubifd
  } = options;

  // Check if any of the relevant options are defined using lA.defined predicate
  const anyOptionDefined = [
    rawInput,
    imageDensity,
    maxInputPixels,
    ignoreIccProfile,
    disablePixelLimit,
    enableSequentialRead,
    failMode,
    throwOnError,
    processAnimated,
    pageNumber,
    numberOfPages,
    processSubifd
  ].some(lA.defined);

  if (anyOptionDefined) {
    // Return an object with only the relevant options
    return {
      raw: rawInput,
      density: imageDensity,
      limitInputPixels: maxInputPixels,
      ignoreIcc: ignoreIccProfile,
      unlimited: disablePixelLimit,
      sequentialRead: enableSequentialRead,
      failOn: failMode,
      failOnError: throwOnError,
      animated: processAnimated,
      page: pageNumber,
      pages: numberOfPages,
      subifd: processSubifd
    };
  }
  // Return undefined if none of the options are defined
  return undefined;
}

module.exports = extractDefinedImageOptions;