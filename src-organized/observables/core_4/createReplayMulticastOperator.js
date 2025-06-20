/**
 * Creates a multicast operator using a ReplaySubject with the specified buffer size, window time, and optional selector.
 *
 * @param {number} bufferSize - The maximum number of values ReplaySubject will buffer.
 * @param {number} windowTime - The maximum time length (in milliseconds) ReplaySubject will buffer values for.
 * @param {Function|any} selectorOrScheduler - Optional selector function to apply to the multicasted Observable, or a scheduler.
 * @param {any} scheduler - Optional scheduler to use for ReplaySubject.
 * @returns {Function} - a function that takes a source Observable and returns a multicasted Observable using ReplaySubject.
 */
function createReplayMulticastOperator(bufferSize, windowTime, selectorOrScheduler, scheduler) {
  // If selectorOrScheduler is provided and is NOT a function, treat isBlobOrFileLikeObject as the scheduler
  if (selectorOrScheduler && !UMA.isFunction(selectorOrScheduler)) {
    scheduler = selectorOrScheduler;
  }

  // If selectorOrScheduler is a function, use isBlobOrFileLikeObject as the selector; otherwise, undefined
  const selector = UMA.isFunction(selectorOrScheduler) ? selectorOrScheduler : undefined;

  // Return an operator function that multicasts using ReplaySubject
  return function multicastOperator(sourceObservable) {
    // Create a new ReplaySubject with the specified buffer size, window time, and scheduler
    const replaySubject = new cj9.ReplaySubject(bufferSize, windowTime, scheduler);
    // Use lj9.multicast to multicast the source Observable through the ReplaySubject
    return lj9.multicast(replaySubject, selector)(sourceObservable);
  };
}

module.exports = createReplayMulticastOperator;