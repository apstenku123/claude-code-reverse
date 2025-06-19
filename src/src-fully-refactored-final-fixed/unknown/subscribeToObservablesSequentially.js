/**
 * Subscribes to each provided observable (or value convertible to observable) in sequence.
 * Each observable is subscribed to only after the previous one completes.
 * If an error occurs during observable creation, the sequence is terminated.
 *
 * @param {...any} sources - a list of observables or values convertible to observables.
 * @returns {Observable} An Observable that emits the values from each input observable in order.
 */
function zA(...sources) {
  // Convert arguments to an array of observables or observable-like values
  const observables = bO9.argsOrArgArray(sources);

  return new vO9.Observable((subscriber) => {
    let currentIndex = 0;

    // Function to subscribe to the next observable in the list
    const subscribeNext = () => {
      if (currentIndex < observables.length) {
        let innerObservable;
        try {
          // Convert the current value to an observable
          innerObservable = hO9.innerFrom(observables[currentIndex++]);
        } catch (error) {
          // If conversion fails, complete the sequence
          completeSequence();
          return;
        }
        // Create an operator subscriber that forwards emissions to the main subscriber
        const operatorSubscriber = new gO9.OperatorSubscriber(
          subscriber,
          undefined,
          UNA.noop,
          UNA.noop
        );
        // Subscribe to the inner observable
        innerObservable.subscribe(operatorSubscriber);
        // Ensure that when the operator subscriber is unsubscribed, the sequence is completed
        operatorSubscriber.add(completeSequence);
      } else {
        // All observables have been processed; complete the main subscriber
        subscriber.complete();
      }
    };

    // Alias for subscribeNext, used for clarity in error handling
    const completeSequence = subscribeNext;

    // Start the subscription chain
    subscribeNext();
  });
}

module.exports = zA;