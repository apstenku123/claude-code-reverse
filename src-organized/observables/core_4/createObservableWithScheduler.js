/**
 * Creates an Observable from the provided arguments, using a scheduler extracted from the arguments.
 *
 * @param {...any} sources - The source observables or values to combine.
 * @returns {Observable} An Observable created from the provided sources, using the extracted scheduler.
 */
function createObservableWithScheduler(...sources) {
  // Extract the scheduler from the sources using QL9.popScheduler
  const scheduler = QL9.popScheduler(sources);
  // Create and return an Observable from the sources, using the extracted scheduler
  return IL9.from(sources, scheduler);
}

module.exports = createObservableWithScheduler;