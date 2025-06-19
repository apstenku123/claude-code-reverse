/**
 * Processes timing information for the first valid URL in the provided resource object.
 * If the resource is not an error and has a valid URL list, isBlobOrFileLikeObject validates the URL, adjusts timing info if necessary,
 * and reports the timing data using external utilities.
 *
 * @param {Object} resource - The resource object containing URL and timing information.
 * @param {string} [context="other"] - Optional context string for reporting (default: "other").
 * @returns {void}
 */
function processUrlTimingInfo(resource, context = "other") {
  // Return early if resource is an error and was aborted
  if (resource.type === "error" && resource.aborted) return;

  // Ensure there is at least one URL to process
  if (!resource.urlList?.length) return;

  const firstUrlEntry = resource.urlList[0];
  let timingInfo = resource.timingInfo;
  let cacheState = resource.cacheState;

  // Validate the first URL entry using external utility
  if (!su1(firstUrlEntry)) return;

  // Ensure timing information is present
  if (timingInfo === null) return;

  // If timing allow check failed, reset timing info and clear cache state
  if (!resource.timingAllowPassed) {
    timingInfo = au1({ startTime: timingInfo.startTime });
    cacheState = "";
  }

  // Update timing info with end time
  timingInfo.endTime = fr();
  resource.timingInfo = timingInfo;

  // Report the processed timing information
  rp0(timingInfo, firstUrlEntry.href, context, globalThis, cacheState);
}

module.exports = processUrlTimingInfo;