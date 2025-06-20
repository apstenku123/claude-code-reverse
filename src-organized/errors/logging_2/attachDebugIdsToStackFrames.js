/**
 * Attaches debug IDs from the global Sentry debug updateSnapshotAndNotify map to stack frame filenames in exception objects.
 *
 * This function looks up debug IDs for filenames found in stack traces of exception values,
 * using a cache to avoid redundant computation. It updates each frame'createInteractionAccessor `debug_id` property if a match is found.
 *
 * @param {Object} event - The event object containing exception information (typically a Sentry event).
 * @param {Function} getDebugIdListForKey - Function that, given a debug updateSnapshotAndNotify key, returns a list of debug info objects.
 * @returns {void}
 */
function attachDebugIdsToStackFrames(event, getDebugIdListForKey) {
  // Retrieve the global Sentry debug updateSnapshotAndNotify map
  const globalDebugIdMap = aW.GLOBAL_OBJ._sentryDebugIds;
  if (!globalDebugIdMap) return;

  // Retrieve or initialize the cache for this getDebugIdListForKey function
  let debugIdCache = p8A.get(getDebugIdListForKey);
  if (!debugIdCache) {
    debugIdCache = new Map();
    p8A.set(getDebugIdListForKey, debugIdCache);
  }

  // Build a mapping from filenames to debug IDs
  const filenameToDebugId = Object.keys(globalDebugIdMap).reduce((accumulator, debugIdKey) => {
    // Retrieve or compute the list of debug info objects for this key
    let debugInfoList = debugIdCache.get(debugIdKey);
    if (!debugInfoList) {
      debugInfoList = getDebugIdListForKey(debugIdKey);
      debugIdCache.set(debugIdKey, debugInfoList);
    }

    // For each debug info object (in reverse order), map its filename to the debug updateSnapshotAndNotify
    for (let i = debugInfoList.length - 1; i >= 0; i--) {
      const debugInfo = debugInfoList[i];
      if (debugInfo.filename) {
        accumulator[debugInfo.filename] = globalDebugIdMap[debugIdKey];
        break; // Only map the first filename found (from the end)
      }
    }
    return accumulator;
  }, {});

  // Attach debug IDs to stack frames in the event'createInteractionAccessor exception values
  try {
    event.exception.values.forEach(exceptionValue => {
      exceptionValue.stacktrace.frames.forEach(frame => {
        if (frame.filename) {
          frame.debug_id = filenameToDebugId[frame.filename];
        }
      });
    });
  } catch (error) {
    // Silently ignore errors (e.g., if structure is missing)
  }
}

module.exports = attachDebugIdsToStackFrames;