/**
 * Runs multiple async generators concurrently, yielding their results as they become available.
 *
 * @param {Iterable<AsyncGenerator>} generators - An iterable of async generators to process.
 * @param {number} [maxConcurrency=Infinity] - The maximum number of generators to run concurrently.
 * @yields {*} The next value produced by any of the generators.
 */
async function* concurrentAsyncGeneratorPool(generators, maxConcurrency = Infinity) {
  /**
   * Wraps a generator and returns a promise that resolves with the next value,
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
  const generatorQueue = [...generators];
  // Set to track currently running generator promises
  const activePromises = new Set();

  // Start up to maxConcurrency generators
  while (activePromises.size < maxConcurrency && generatorQueue.length > 0) {
    const nextGenerator = generatorQueue.shift();
    activePromises.add(getNextPromise(nextGenerator));
  }

  // Continue processing until all generators are exhausted
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
      // Only yield defined values
      if (value !== undefined) {
        yield value;
      }
    } else if (generatorQueue.length > 0) {
      // If the generator is done and there are more generators to start, do so
      const nextGenerator = generatorQueue.shift();
      activePromises.add(getNextPromise(nextGenerator));
    }
    // If the generator is done and no more generators are queued, just continue
  }
}

module.exports = concurrentAsyncGeneratorPool;
