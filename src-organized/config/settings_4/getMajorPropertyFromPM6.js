/**
 * Retrieves the 'major' property from a new PM6 instance.
 *
 * @function getMajorPropertyFromPM6
 * @description
 * Instantiates a PM6 object using the provided source observable and configuration, then returns its 'major' property.
 *
 * @param {Observable} sourceObservable - The observable or data source to be processed by PM6.
 * @param {Object} config - Configuration options or parameters for PM6.
 * @returns {any} The 'major' property from the instantiated PM6 object.
 */
function getMajorPropertyFromPM6(sourceObservable, config) {
  // Create a new PM6 instance with the provided observable and configuration
  const pm6Instance = new PM6(sourceObservable, config);

  // Return the 'major' property from the PM6 instance
  return pm6Instance.major;
}

module.exports = getMajorPropertyFromPM6;
