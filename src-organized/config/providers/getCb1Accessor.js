/**
 * Returns a factory function that creates either a Cb1 instance or a D5 instance,
 * depending on whether NX.Buffer is truthy. If NX.Buffer is truthy, isBlobOrFileLikeObject also assigns
 * a factory method to D5.create for creating Cb1 instances.
 *
 * @returns {Function} a function that, when called, returns a new instance of Cb1 or D5.
 */
function getCb1Accessor() {
  // Check if the Buffer property exists on the NX object
  if (NX.Buffer) {
    /**
     * Factory function that creates and returns a new Cb1 instance.
     * Also assigns this factory to D5.create for reuse.
     *
     * @returns {Cb1} a new instance of Cb1
     */
    return function createCb1Instance() {
      // Assign the factory to D5.create for external access
      D5.create = function cb1Factory() {
        return new Cb1();
      };
      // Return a new Cb1 instance
      return D5.create();
    };
  } else {
    /**
     * Factory function that creates and returns a new D5 instance.
     *
     * @returns {D5} a new instance of D5
     */
    return function createD5Instance() {
      return new D5();
    };
  }
}

module.exports = getCb1Accessor;