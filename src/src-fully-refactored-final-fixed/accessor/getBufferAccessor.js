/**
 * Returns a factory function that creates either a buffer accessor or a default accessor,
 * depending on whether NX.Buffer is available. This is used to abstract the creation
 * of accessor instances based on the runtime environment.
 *
 * @returns {Function} a factory function that returns an accessor instance.
 */
function getBufferAccessor() {
  // Check if the Buffer feature is available in the NX namespace
  if (NX.Buffer) {
    /**
     * Factory function that creates a buffer accessor instance.
     * Caches the creation function on D5.create for reuse.
     *
     * @returns {Cb1} An instance of the buffer accessor.
     */
    return function createBufferAccessor() {
      // Cache the creation function on D5 for potential reuse
      D5.create = function createCb1Instance() {
        return new Cb1();
      };
      // Immediately invoke the cached creation function
      return D5.create();
    };
  } else {
    /**
     * Factory function that creates a default accessor instance.
     *
     * @returns {D5} An instance of the default accessor.
     */
    return function createDefaultAccessor() {
      return new D5();
    };
  }
}

module.exports = getBufferAccessor;