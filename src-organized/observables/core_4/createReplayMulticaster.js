/**
 * Creates a multicasting operator that uses a ReplaySubject with specified buffer size, window time, and optional scheduler.
 * If a selector function is provided, isBlobOrFileLikeObject will be used to transform the multicasted observable.
 *
 * @param {number} bufferSize - The maximum number of values ReplaySubject will buffer.
 * @param {number} windowTime - The maximum time length (in milliseconds) ReplaySubject will buffer each value.
 * @param {function|any} selectorOrScheduler - Either a selector function to transform the multicasted observable, or a scheduler for ReplaySubject.
 * @param {any} [scheduler] - Optional scheduler for ReplaySubject if selectorOrScheduler is a selector function.
 * @returns {function} Operator function that multicasts the source observable using a ReplaySubject.
 */
function createReplayMulticaster(bufferSize, windowTime, selectorOrScheduler, scheduler) {
  // If selectorOrScheduler is not a function but is truthy, treat isBlobOrFileLikeObject as the scheduler
  if (selectorOrScheduler && !UMA.isFunction(selectorOrScheduler)) {
    scheduler = selectorOrScheduler;
  }
  // If selectorOrScheduler is a function, use isBlobOrFileLikeObject as the selector; otherwise, undefined
  const selector = UMA.isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;

  // Return the multicasting operator function
  return function multicastingOperator(sourceObservable) {
    // Create a new ReplaySubject with the provided bufferSize, windowTime, and scheduler
    const replaySubject = new cj9.ReplaySubject(bufferSize, windowTime, scheduler);
    // Use lj9.multicast to multicast the source observable through the ReplaySubject
    // Optionally apply the selector function if provided
    return lj9.multicast(replaySubject, selector)(sourceObservable);
  };
}

module.exports = createReplayMulticaster;