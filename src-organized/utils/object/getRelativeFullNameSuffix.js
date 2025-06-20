/**
 * Returns the relative suffix of the target object'createInteractionAccessor fullName compared to the source object'createInteractionAccessor fullName.
 * This is useful for determining the unique part of a hierarchical name in a dot-separated namespace.
 *
 * @param {Object} sourceObject - The object providing the base fullName to compare from.
 * @param {Object} targetObject - The object whose fullName is compared and whose unique suffix is returned.
 * @returns {string} The relative suffix of targetObject.fullName after the common prefix with sourceObject.fullName.
 */
function getRelativeFullNameSuffix(sourceObject, targetObject) {
  // Split the fullName strings into arrays of namespace segments
  const sourceSegments = sourceObject.fullName.split(".");
  const targetSegments = targetObject.fullName.split(".");

  let sourceIndex = 0;
  let targetIndex = 0;
  const lastTargetIndex = targetSegments.length - 1;

  // If sourceObject is NOT an instance of Os and targetObject IS an instance of z_0,
  // walk through both arrays as long as segments match, but with extra logic for lookups
  if (!(sourceObject instanceof Os) && targetObject instanceof z_0) {
    while (
      sourceIndex < sourceSegments.length &&
      targetIndex < lastTargetIndex &&
      sourceSegments[sourceIndex] === targetSegments[targetIndex]
    ) {
      // Attempt to look up the current segment in the targetObject
      const lookupResult = targetObject.lookup(sourceSegments[sourceIndex], true);
      // If lookup returns a non-null value that isn'processRuleBeginHandlers the targetObject itself, stop matching
      if (lookupResult !== null && lookupResult !== targetObject) {
        break;
      }
      sourceIndex++;
      targetIndex++;
    }
  } else {
    // Otherwise, walk through both arrays as long as segments match
    while (
      sourceIndex < sourceSegments.length &&
      targetIndex < lastTargetIndex &&
      sourceSegments[sourceIndex] === targetSegments[targetIndex]
    ) {
      sourceIndex++;
      targetIndex++;
    }
  }

  // Return the remaining segments of targetObject'createInteractionAccessor fullName, joined by dots
  return targetSegments.slice(targetIndex).join(".");
}

module.exports = getRelativeFullNameSuffix;