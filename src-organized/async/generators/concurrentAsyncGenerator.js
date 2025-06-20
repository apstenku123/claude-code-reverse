/**
 * Asynchronously iterates over multiple async generators concurrently, yielding their values as they become available.
 *
 * @param {Iterable<AsyncGenerator>} asyncGenerators - An iterable of async generators to consume concurrently.
 * @param {number} [concurrencyLimit=Infinity] - The maximum number of generators to process concurrently.
 * @yields {*} The next value produced by any of the input async generators.
 */
async function* concurrentAsyncGenerator(asyncGenerators, concurrencyLimit = Infinity) {
  /**
   * Wraps an async generator and returns a promise that resolves with the next result,
   * along with references to the generator and the promise itself for tracking.
   *
   * @param {AsyncGenerator} generator - The async generator to wrap.
   * @returns {Promise<{done: boolean, value: *, generator: AsyncGenerator, promise: Promise}>}
   */
  const getNextPromise = (generator) => {
    const promise = generator.next().then(({ done, value }) => ({
      done,
      value,
      generator,
      promise
    }));
    return promise;
  };

  // Convert the input iterable to an array for easier manipulation
  const generatorQueue = [...asyncGenerators];
  // Set to track currently active generator promises
  const activePromises = new Set();

  // Start up to concurrencyLimit generators
  while (activePromises.size < concurrencyLimit && generatorQueue.length > 0) {
    const generator = generatorQueue.shift();
    activePromises.add(getNextPromise(generator));
  }

  // Continue processing until all generators are exhausted
  while (activePromises.size > 0) {
    // Wait for the next available value from any generator
    const { done, value, generator, promise } = await Promise.race(activePromises);
    // Remove the completed promise from the set
    activePromises.delete(promise);

    if (!done) {
      // If the generator is not done, queue its next value
      activePromises.add(getNextPromise(generator));
      // Only yield defined values
      if (value !== undefined) {
        yield value;
      }
    } else if (generatorQueue.length > 0) {
      // If the generator is done, start a new one if available
      const nextGenerator = generatorQueue.shift();
      activePromises.add(getNextPromise(nextGenerator));
    }
  }
}

module.exports = concurrentAsyncGenerator;