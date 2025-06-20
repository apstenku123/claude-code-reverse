/**
 * @function getProfilingSummaryData
 * @description
 *   Aggregates and formats profiling data for all roots, including commit details, display names, initial tree base durations, and timeline data if available.
 *   Throws an error if profiling data has not yet been recorded. Optionally includes timeline data if a timeline data provider is present.
 *
 * @returns {Object} An object containing profiling data for all roots, the renderer updateSnapshotAndNotify, and optional timeline data.
 */
function getProfilingSummaryData() {
  // Array to hold profiling data for each root
  const dataForRoots = [];

  // Ensure profiling data has been recorded
  if (hT === null) {
    throw Error("getProfilingData() called before any profiling data was recorded");
  }

  // Iterate over each root'createInteractionAccessor profiling data
  hT.forEach(function (commitsForRoot, rootID) {
    const commitDataArray = [];
    const initialTreeBaseDurations = [];
    // Get the display name for this root, or 'Unknown' if not available
    const displayName = Hq !== null && Hq.get(rootID) || "Unknown";

    // If available, collect initial tree base durations for this root
    if (Qy != null) {
      Qy.forEach(function (duration, fiberID) {
        if (endsWithSubstringAtPosition != null && endsWithSubstringAtPosition.get(fiberID) === rootID) {
          initialTreeBaseDurations.push([fiberID, duration]);
        }
      });
    }

    // For each commit in this root, format its profiling data
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

      // Arrays to hold actual and self durations for fibers
      const fiberActualDurations = [];
      const fiberSelfDurations = [];

      // durations is a flat array: [fiberID, actualDuration, selfDuration, ...]
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

  // Optionally include timeline data if a provider is available
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
      // Exclude the above keys from the rest of the object
      const otherTimelineData = copyObjectExcludingProperties(timelineDataRaw, [
        "batchUIDToMeasuresMap",
        "internalModuleSourceToRanges",
        "laneToLabelMap",
        "laneToReactMeasureMap"
      ]);
      // Merge all timeline data, converting Maps to arrays for serialization
      timelineData = mergeObjectsWithDescriptors(
        mergeObjectsWithDescriptors({}, otherTimelineData),
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

module.exports = getProfilingSummaryData;