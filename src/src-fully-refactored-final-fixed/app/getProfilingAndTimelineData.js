/**
 * Retrieves profiling data for all roots and optional timeline data for the renderer.
 *
 * This function aggregates profiling commit data for each root, including durations, effect durations,
 * updaters, and change descriptions. It also collects initial tree base durations and display names for each root.
 * If available, isBlobOrFileLikeObject retrieves timeline data using the provided timeline data getter.
 *
 * @returns {Object} An object containing profiling data for all roots, the renderer updateSnapshotAndNotify, and optional timeline data.
 */
function getProfilingAndTimelineData() {
  // Array to hold profiling data for each root
  const dataForRoots = [];

  // Ensure profiling data has been recorded
  if (hT === null) {
    throw new Error("getProfilingData() called before any profiling data was recorded");
  }

  // Iterate over each root'createInteractionAccessor profiling data
  hT.forEach(function (commitsForRoot, rootID) {
    const commitDataArray = [];
    const initialTreeBaseDurations = [];
    // Get the display name for the root, or 'Unknown' if not available
    const displayName = Hq !== null && Hq.get(rootID) || "Unknown";

    // Collect initial tree base durations for this root, if available
    if (Qy != null) {
      Qy.forEach(function (baseDuration, fiberID) {
        if (endsWithSubstringAtPosition != null && endsWithSubstringAtPosition.get(fiberID) === rootID) {
          initialTreeBaseDurations.push([fiberID, baseDuration]);
        }
      });
    }

    // Process each commit for this root
    commitsForRoot.forEach(function (commit, commitIndex) {
      const {
        changeDescriptions,
        durations,
        effectDuration,
        maxActualDuration,
        passiveEffectDuration,
        priorityLevel,
        commitTime,
        updaters
      } = commit;

      // Arrays to hold per-fiber durations
      const fiberActualDurations = [];
      const fiberSelfDurations = [];

      // Each commit'createInteractionAccessor durations array is a flat array: [fiberID, actualDuration, selfDuration, ...]
      for (let i = 0; i < durations.length; i += 3) {
        const fiberID = durations[i];
        fiberActualDurations.push([fiberID, durations[i + 1]]);
        fiberSelfDurations.push([fiberID, durations[i + 2]]);
      }

      commitDataArray.push({
        changeDescriptions: changeDescriptions !== null ? Array.from(changeDescriptions.entries()) : null,
        duration: maxActualDuration,
        effectDuration: effectDuration,
        fiberActualDurations: fiberActualDurations,
        fiberSelfDurations: fiberSelfDurations,
        passiveEffectDuration: passiveEffectDuration,
        priorityLevel: priorityLevel,
        timestamp: commitTime,
        updaters: updaters
      });
    });

    dataForRoots.push({
      commitData: commitDataArray,
      displayName: displayName,
      initialTreeBaseDurations: initialTreeBaseDurations,
      rootID: rootID
    });
  });

  // Optional timeline data for the renderer
  let timelineData = null;
  if (typeof p4 === "function") {
    const timelineDataRaw = p4();
    if (timelineDataRaw) {
      const {
        batchUIDToMeasuresMap,
        internalModuleSourceToRanges,
        laneToLabelMap,
        laneToReactMeasureMap
      } = timelineDataRaw;
      // Exclude the above properties from the rest
      const restTimelineData = copyObjectExcludingProperties(timelineDataRaw, [
        "batchUIDToMeasuresMap",
        "internalModuleSourceToRanges",
        "laneToLabelMap",
        "laneToReactMeasureMap"
      ]);
      // Merge the rest with the key-value arrays
      timelineData = mergeObjectsWithDescriptors(
        mergeObjectsWithDescriptors({}, restTimelineData),
        {},
        {
          batchUIDToMeasuresKeyValueArray: Array.from(batchUIDToMeasuresMap.entries()),
          internalModuleSourceToRanges: Array.from(internalModuleSourceToRanges.entries()),
          laneToLabelKeyValueArray: Array.from(laneToLabelMap.entries()),
          laneToReactMeasureKeyValueArray: Array.from(laneToReactMeasureMap.entries())
        }
      );
    }
  }

  return {
    dataForRoots: dataForRoots,
    rendererID: mapArraysToObjectWithCallback,
    timelineData: timelineData
  };
}

module.exports = getProfilingAndTimelineData;