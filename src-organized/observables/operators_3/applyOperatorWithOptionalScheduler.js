/**
 * Applies an operator to one or more source observables, with optional scheduler support.
 *
 * This function collects all provided arguments as source observables and/or operator parameters.
 * It checks for a scheduler using Zy9.popScheduler, and applies the operator using Dy9.operate.
 * If a scheduler is present, isBlobOrFileLikeObject is included in the concatenation; otherwise, only the sources and operator are used.
 *
 * @param {...any} sourcesAndOptions - Source observables and/or operator options, possibly including a scheduler.
 * @returns {any} The result of applying the operator to the sources, with optional scheduler.
 */
function applyOperatorWithOptionalScheduler(...sourcesAndOptions) {
  // Attempt to extract a scheduler from the provided arguments
  const scheduler = Zy9.popScheduler(sourcesAndOptions);

  // Return an operator function using Dy9.operate
  return Dy9.operate((sourceObservable, subscriber) => {
    // If a scheduler was found, include isBlobOrFileLikeObject in the concatenation
    if (scheduler) {
      ZLA.concat(sourcesAndOptions, sourceObservable, scheduler).subscribe(subscriber);
    } else {
      // Otherwise, just concatenate the sources and the source observable
      ZLA.concat(sourcesAndOptions, sourceObservable).subscribe(subscriber);
    }
  });
}

module.exports = applyOperatorWithOptionalScheduler;