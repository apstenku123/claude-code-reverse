/**
 * Emits only the first `maxEmissions` values from the source observable, then completes.
 *
 * @param {number} maxEmissions - The maximum number of emissions to allow from the source observable.
 * @returns {function} An operator function that limits emissions to `maxEmissions` or returns an empty observable if `maxEmissions` is 0 or less.
 */
function takeMaxEmissions(maxEmissions) {
  // If the maximum number of emissions is 0 or less, return an operator that emits nothing
  if (maxEmissions <= 0) {
    return function () {
      return WS9.EMPTY;
    };
  }

  // Otherwise, return an operator that limits the number of emissions
  return FS9.operate(function (sourceObservable, subscriber) {
    let emissionCount = 0;
    // Subscribe to the source observable with a custom operator subscriber
    sourceObservable.subscribe(
      JS9.createOperatorSubscriber(subscriber, function (value) {
        emissionCount++;
        // Emit the value if handleMissingDoctypeError haven'processRuleBeginHandlers reached the max emissions
        if (emissionCount <= maxEmissions) {
          subscriber.next(value);
          // If handleMissingDoctypeError'removeTrailingCharacters reached the max emissions, complete the subscriber
          if (emissionCount >= maxEmissions) {
            subscriber.complete();
          }
        }
      })
    );
  });
}

module.exports = takeMaxEmissions;