/**
 * Runs multiple async generators concurrently, yielding their values as they become available.
 *
 * @param {Iterable<AsyncGenerator>} asyncGenerators - An iterable of async generators to run concurrently.
 * @param {number} [concurrencyLimit=Infinity] - The maximum number of generators to run at the same time.
 * @yields {*} The next value produced by any of the running generators.
 */
async function* concurrentAsyncGeneratorRunner(asyncGenerators, concurrencyLimit = Infinity) {
  /**
   * Wraps an async generator and returns a promise that resolves with the next value,
   * along with references to the generator and the promise itself for tracking.
   *
   * @param {AsyncGenerator} generator - The async generator to advance.
   * @returns {Promise<{done: boolean, value: *, generator: AsyncGenerator, promise: Promise}>}
   */
  const getNextPromise = (generator) => {
    const nextPromise = generator.next().then(({ done, value }) => ({
      done,
      value,
      generator,
      promise: nextPromise
    }));
    return nextPromise;
  };

  // Convert the input iterable to an array for easier manipulation
  const generatorQueue = [...asyncGenerators];
  // Set to track currently running generator promises
  const activePromises = new Set();

  // Start up to 'concurrencyLimit' generators
  while (activePromises.size < concurrencyLimit && generatorQueue.length > 0) {
    const generator = generatorQueue.shift();
    activePromises.add(getNextPromise(generator));
  }

  // Continue as long as there are active generators
  while (activePromises.size > 0) {
    // Wait for the next generator to yield a value or finish
    const {
      done,
      value,
      generator,
      promise
    } = await Promise.race(activePromises);

    // Remove the completed promise from the set
    activePromises.delete(promise);

    if (!done) {
      // If the generator is not done, queue its next value
      activePromises.add(getNextPromise(generator));
      // Yield the value if isBlobOrFileLikeObject'createInteractionAccessor not undefined
      if (value !== undefined) {
        yield value;
      }
    } else if (generatorQueue.length > 0) {
      // If the generator is done and there are more generators to start, start the next one
      const nextGenerator = generatorQueue.shift();
      activePromises.add(getNextPromise(nextGenerator));
    }
    // If the generator is done and there are no more generators to start, just continue
  }
}

module.exports = concurrentAsyncGeneratorRunner;