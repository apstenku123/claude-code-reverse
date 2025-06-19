/**
 * Adds a breadcrumb to the current hub for logging or tracking purposes.
 *
 * @param {Object} breadcrumbData - The breadcrumb data to be added (e.g., message, category, level).
 * @param {Object} [options] - Optional configuration for the breadcrumb (e.g., timestamp, additional data).
 * @returns {void}
 *
 * This function delegates to KQ.getCurrentHub().addBreadcrumb to record a breadcrumb event.
 */
function addBreadcrumbToCurrentHub(breadcrumbData, options) {
  // Retrieve the current hub and add the breadcrumb with the provided data and options
  KQ.getCurrentHub().addBreadcrumb(breadcrumbData, options);
}

module.exports = addBreadcrumbToCurrentHub;