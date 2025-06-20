/**
 * Processes timing information for a given observable source, updating timing and cache state as needed.
 *
 * @param {Object} sourceObservable - The observable object containing timing and URL information.
 * @param {string} [contextType="other"] - The context or type for processing (default is "other").
 * @returns {void}
 *
 * The function checks for error and abort states, validates the URL list, ensures timing info is present,
 * and updates timing and cache state if required. It then records the timing using external utilities.
 */
function processObservableTiming(sourceObservable, contextType = "other") {
  // If the observable is in an error state and aborted, exit early
  if (sourceObservable.type === "error" && sourceObservable.aborted) return;

  // Ensure there is at least one URL to process
  if (!sourceObservable.urlList?.length) return;

  const subscription = sourceObservable.urlList[0];
  let timingInfo = sourceObservable.timingInfo;
  let cacheState = sourceObservable.cacheState;

  // Validate the subscription object using external utility
  if (!su1(subscription)) return;

  // If timing info is missing, exit early
  if (timingInfo === null) return;

  // If timing is not allowed, reset timing info and cache state
  if (!sourceObservable.timingAllowPassed) {
    timingInfo = au1({ startTime: timingInfo.startTime });
    cacheState = "";
  }

  // Update end time to current time using external utility
  timingInfo.endTime = fr();
  sourceObservable.timingInfo = timingInfo;

  // Record the processed timing information
  rp0(timingInfo, subscription.href, contextType, globalThis, cacheState);
}

module.exports = processObservableTiming;