/**
 * Detects resources using provided detectors, logs non-empty attributes, and merges all detected resources into a single resource object.
 *
 * @param {Object} [options={}] - Options object containing an array of resource detectors.
 * @param {Array<Object>} [options.detectors=[]] - Array of detector objects, each with a detect method.
 * @returns {Object} - The merged resource object from all detectors.
 */
function detectAndMergeResources(options = {}) {
  const { detectors = [] } = options;

  // Map over each detector to detect resources and handle errors gracefully
  const detectedResources = detectors.map(detector => {
    try {
      // Attempt to detect the resource using the detector
      const detectedResource = hv1.resourceFromDetectedResource(detector.detect(options));
      // Log successful detection
      mv1.diag.debug(`${detector.constructor.name} found resource.`, detectedResource);
      return detectedResource;
    } catch (error) {
      // Log detection failure and return an empty resource
      mv1.diag.debug(`${detector.constructor.name} failed: ${error.message}`);
      return hv1.emptyResource();
    }
  });

  // Log non-empty attributes of detected resources
  Zt4(detectedResources);

  // Merge all detected resources into a single resource object
  return detectedResources.reduce(
    (mergedResource, resource) => mergedResource.merge(resource),
    hv1.emptyResource()
  );
}

module.exports = detectAndMergeResources;