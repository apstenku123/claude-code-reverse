/**
 * Executes a callback or subscribes to an observable based on a condition.
 *
 * @function executeOrSubscribeWithCondition
 * @param {Function} callback - The function to execute if the condition is true.
 * @param {Function|boolean} conditionOrObservableFactory - If true, executes the callback. If false, does nothing. If a function, applies isBlobOrFileLikeObject with the rest arguments and subscribes to its result.
 * @param {...any} args - Additional arguments to pass to the observable factory function.
 * @returns {void|Subscription} Returns nothing if the callback is executed or condition is false, otherwise returns the subscription object.
 */
function executeOrSubscribeWithCondition(callback, conditionOrObservableFactory, ...args) {
  // If the condition is strictly true, execute the callback and return
  if (conditionOrObservableFactory === true) {
    callback();
    return;
  }

  // If the condition is strictly false, do nothing
  if (conditionOrObservableFactory === false) {
    return;
  }

  // Otherwise, treat as a function: apply arguments and subscribe to the resulting observable
  // Create a SafeSubscriber that unsubscribes and calls the callback on next
  const safeSubscriber = new lMA.SafeSubscriber({
    next: function () {
      safeSubscriber.unsubscribe();
      callback();
    }
  });

  // Prepare arguments for the observable factory
  // yk9([], kk9(args)) appears to merge/flatten arguments; preserve this logic
  const observableInput = conditionOrObservableFactory.apply(
    undefined,
    yk9([], kk9(args))
  );

  // Convert to observable and subscribe
  return cMA.innerFrom(observableInput).subscribe(safeSubscriber);
}

module.exports = executeOrSubscribeWithCondition;