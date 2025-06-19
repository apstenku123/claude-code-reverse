/**
 * Merges new breadcrumb entries into an object'createInteractionAccessor existing breadcrumbs property.
 *
 * If the object already has breadcrumbs, the new entries are appended.
 * If the resulting breadcrumbs array is empty, the property is set to undefined.
 *
 * @param {Object} targetObject - The object whose breadcrumbs property will be updated.
 * @param {Array} newBreadcrumbs - An array of breadcrumb entries to append.
 * @returns {void}
 */
function mergeBreadcrumbs(targetObject, newBreadcrumbs) {
  // Combine existing breadcrumbs (if any) with the new breadcrumbs
  const combinedBreadcrumbs = [
    ...(targetObject.breadcrumbs || []),
    ...newBreadcrumbs
  ];

  // If there are breadcrumbs after merging, set them; otherwise, remove the property
  targetObject.breadcrumbs = combinedBreadcrumbs.length > 0 ? combinedBreadcrumbs : undefined;
}

module.exports = mergeBreadcrumbs;