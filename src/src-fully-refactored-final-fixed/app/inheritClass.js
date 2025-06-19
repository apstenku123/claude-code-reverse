/**
 * Sets up prototypal inheritance between two constructor functions (classes).
 * Throws if the superclass is not a function or null.
 *
 * @param {Function} subclassConstructor - The constructor function (class) that will inherit.
 * @param {Function|null} superclassConstructor - The constructor function (class) to inherit from, or null.
 * @returns {void}
 */
function inheritClass(subclassConstructor, superclassConstructor) {
  // Ensure the superclass is either a function or null
  if (typeof superclassConstructor !== "function" && superclassConstructor !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  // Set up the prototype chain for inheritance
  subclassConstructor.prototype = Object.create(
    superclassConstructor && superclassConstructor.prototype,
    {
      constructor: {
        value: subclassConstructor,
        writable: true,
        configurable: true
      }
    }
  );

  // If a superclass exists, link static properties as well (using dE)
  if (superclassConstructor) {
    dE(subclassConstructor, superclassConstructor);
  }
}

module.exports = inheritClass;