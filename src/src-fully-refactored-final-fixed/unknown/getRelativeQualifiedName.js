/**
 * Returns the relative qualified name of a target object (targetObject) with respect to a base object (baseObject).
 * This is done by comparing their dot-separated fullName properties and removing the common prefix.
 * Special handling is applied if source is not an instance of Os and target is an instance of z_0.
 *
 * @param {Object} source - The source object, expected to have a 'fullName' property (string).
 * @param {Object} target - The target object, expected to have a 'fullName' property (string), and a 'lookup' method.
 * @returns {string} The relative qualified name of the target with respect to the source.
 */
function getRelativeQualifiedName(source, target) {
  // Split the full names into arrays of namespace segments
  const sourceSegments = source.fullName.split(".");
  const targetSegments = target.fullName.split(".");
  let sourceIndex = 0;
  let targetIndex = 0;
  const lastTargetIndex = targetSegments.length - 1;

  // If source is NOT an instance of Os and target IS an instance of z_0, use special lookup logic
  if (!(source instanceof Os) && target instanceof z_0) {
    while (
      sourceIndex < sourceSegments.length &&
      targetIndex < lastTargetIndex &&
      sourceSegments[sourceIndex] === targetSegments[targetIndex]
    ) {
      // Use target'createInteractionAccessor lookup method to check for a matching segment
      const lookupResult = target.lookup(sourceSegments[sourceIndex], true);
      if (lookupResult !== null && lookupResult !== target) {
        // If lookup returns a different object, stop comparing further
        break;
      }
      sourceIndex++;
      targetIndex++;
    }
  } else {
    // Otherwise, just increment indices while segments match
    while (
      sourceIndex < sourceSegments.length &&
      targetIndex < lastTargetIndex &&
      sourceSegments[sourceIndex] === targetSegments[targetIndex]
    ) {
      sourceIndex++;
      targetIndex++;
    }
  }

  // Return the remaining segments of the target as a dot-separated string
  return targetSegments.slice(targetIndex).join(".");
}

module.exports = getRelativeQualifiedName;