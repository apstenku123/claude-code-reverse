/**
 * Recursively collects all referenced observables starting from a given source observable.
 *
 * @param {string} sourceObservable - The starting observable identifier.
 * @param {object} config - Configuration object passed to the observable resolver.
 * @param {Set<string>} visitedObservables - Set of observables already visited to avoid cycles.
 * @param {boolean} requireValidReference - If true, only include valid references (as determined by iw2).
 * @param {number} depth - Current recursion depth (used to prevent infinite recursion).
 * @param {string|null} parentObservable - The parent observable identifier, if any.
 * @returns {Array<object>} Array of observable objects, each possibly with a parent property.
 */
function collectReferencedObservables(
  sourceObservable,
  config,
  visitedObservables,
  requireValidReference,
  depth = 0,
  parentObservable = null
) {
  // Prevent infinite recursion: stop if already visited or depth limit reached
  if (visitedObservables.has(sourceObservable) || depth >= QD5) {
    return [];
  }

  // Resolve the observable object
  const observableObject = readFileIfAccessible(sourceObservable, config);
  if (!observableObject || !observableObject.content.trim()) {
    return [];
  }

  // Attach parent reference if provided
  if (parentObservable) {
    observableObject.parent = parentObservable;
  }

  // Mark this observable as visited
  visitedObservables.add(sourceObservable);

  // Start with the current observable
  const collectedObservables = [observableObject];

  // Extract all referenced observables from the content
  const referencedObservables = extractMentionedReferences(observableObject.content, sourceObservable);

  for (const referencedId of referencedObservables) {
    // Optionally skip invalid references
    if (!iw2(referencedId) && !requireValidReference) {
      continue;
    }
    // Recursively collect from referenced observables
    const childObservables = collectReferencedObservables(
      referencedId,
      config,
      visitedObservables,
      requireValidReference,
      depth + 1,
      sourceObservable
    );
    collectedObservables.push(...childObservables);
  }

  return collectedObservables;
}

module.exports = collectReferencedObservables;