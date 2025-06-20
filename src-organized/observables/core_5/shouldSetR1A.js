/**
 * Determines whether the hasAndOrProperty property should be set for a given source observable.
 *
 * This function checks three conditions:
 *   1. The source observable is NOT already marked by isArrayUtility(e.g., not a special type or already processed).
 *   2. The source observable passes the isObjectType check (e.g., meets certain requirements).
 *   3. The source observable does NOT already have hasAndOrProperty set.
 *
 * @param {object} sourceObservable - The observable or object to check for hasAndOrProperty eligibility.
 * @returns {boolean} True if hasAndOrProperty should be set for the source observable; otherwise, false.
 */
const shouldSetR1A = (sourceObservable) => {
  // Check if sourceObservable is NOT marked by isArrayUtility
  const isNotMarkedByM$ = !isArrayUtility(sourceObservable);

  // Check if sourceObservable passes the isObjectType requirement
  const passesR2Check = isObjectType(sourceObservable);

  // Check if sourceObservable does NOT already have hasAndOrProperty set
  const doesNotHaveR1A = !hasAndOrProperty(sourceObservable);

  // All conditions must be true to set hasAndOrProperty
  return isNotMarkedByM$ && passesR2Check && doesNotHaveR1A;
};

module.exports = shouldSetR1A;