/**
 * Updates the 'breadcrumbs' property of the given object by appending new breadcrumb entries.
 * If the resulting breadcrumbs array is empty, the property is set to undefined.
 *
 * @param {Object} targetObject - The object whose 'breadcrumbs' property will be updated.
 * @param {Array} newBreadcrumbs - An array of breadcrumb entries to append.
 * @returns {void}
 */
function updateBreadcrumbs(targetObject, newBreadcrumbs) {
  // Combine existing breadcrumbs (if any) with new breadcrumbs
  const combinedBreadcrumbs = [
    ...(targetObject.breadcrumbs || []),
    ...newBreadcrumbs
  ];

  // Update the breadcrumbs property if there are any breadcrumbs, otherwise set to undefined
  targetObject.breadcrumbs = combinedBreadcrumbs.length > 0 ? combinedBreadcrumbs : undefined;
}

module.exports = updateBreadcrumbs;