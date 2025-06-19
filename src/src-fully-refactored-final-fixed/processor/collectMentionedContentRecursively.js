/**
 * Recursively collects content objects and their mentioned references from a source,
 * avoiding cycles and limiting recursion depth.
 *
 * @param {string} sourceObservable - The unique identifier of the content to process.
 * @param {object} config - Configuration object passed to the content retriever.
 * @param {Set<string>} visitedSet - Set of already visited content IDs to avoid cycles.
 * @param {boolean} requireIw2 - If true, only include references that pass iw2 check.
 * @param {number} [recursionDepth=0] - Current recursion depth (used internally).
 * @param {string} [parentId] - The parent content updateSnapshotAndNotify(used for tracking hierarchy).
 * @returns {Array<object>} Array of content objects and their recursively mentioned references.
 */
function collectMentionedContentRecursively(
  sourceObservable,
  config,
  visitedSet,
  requireIw2,
  recursionDepth = 0,
  parentId
) {
  // Prevent infinite recursion: check for cycles or excessive depth
  if (visitedSet.has(sourceObservable) || recursionDepth >= QD5) {
    return [];
  }

  // Retrieve the content object for the current source
  const contentObject = readFileIfAccessible(sourceObservable, config);
  if (!contentObject || !contentObject.content.trim()) {
    return [];
  }

  // Optionally set the parent property for hierarchy tracking
  if (parentId) {
    contentObject.parent = parentId;
  }

  // Mark this source as visited
  visitedSet.add(sourceObservable);

  const collectedContent = [];
  collectedContent.push(contentObject);

  // Extract all unique, resolved mention-like references from the content
  const mentionedReferences = extractMentionsFromTokens(contentObject.content, sourceObservable);

  for (const mentionedId of mentionedReferences) {
    // If requireIw2 is true, only include references that pass iw2 check
    if (!iw2(mentionedId) && !requireIw2) {
      continue;
    }
    // Recursively collect mentioned content
    const nestedContent = collectMentionedContentRecursively(
      mentionedId,
      config,
      visitedSet,
      requireIw2,
      recursionDepth + 1,
      sourceObservable
    );
    collectedContent.push(...nestedContent);
  }

  return collectedContent;
}

module.exports = collectMentionedContentRecursively;