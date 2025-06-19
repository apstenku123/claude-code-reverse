/**
 * Retrieves the 'major' property from a new PM6 instance initialized with the provided observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable source to be processed by PM6.
 * @param {Object} config - Configuration options for PM6 instance creation.
 * @returns {*} The 'major' property from the newly created PM6 instance.
 */
function getMajorPropertyFromPM6Instance(sourceObservable, config) {
  // Create a new PM6 instance with the provided observable and configuration
  const pm6Instance = new PM6(sourceObservable, config);

  // Return the 'major' property from the PM6 instance
  return pm6Instance.major;
}

module.exports = getMajorPropertyFromPM6Instance;
