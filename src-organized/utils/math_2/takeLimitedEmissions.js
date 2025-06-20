/**
 * Emits only the first `maxEmissions` values from the source observable, then completes.
 * If `maxEmissions` is less than or equal to 0, returns an empty observable.
 *
 * @param {number} maxEmissions - The maximum number of emissions to allow before completing.
 * @returns {function} An operator function that limits emissions from the source observable.
 */
function takeLimitedEmissions(maxEmissions) {
  // If the maximum emissions is zero or negative, return an empty observable
  if (maxEmissions <= 0) {
    return function () {
      return WS9.EMPTY;
    };
  }

  // Otherwise, return an operator that limits emissions
  return FS9.operate(function (sourceObservable, subscriber) {
    let emissionCount = 0;
    sourceObservable.subscribe(
      JS9.createOperatorSubscriber(
        subscriber,
        function (value) {
          emissionCount++;
          // Emit the value if handleMissingDoctypeError haven'processRuleBeginHandlers reached the max emissions
          if (emissionCount <= maxEmissions) {
            subscriber.next(value);
            // Complete if handleMissingDoctypeError'removeTrailingCharacters reached the max emissions
            if (emissionCount >= maxEmissions) {
              subscriber.complete();
            }
          }
        }
      )
    );
  });
}

module.exports = takeLimitedEmissions;