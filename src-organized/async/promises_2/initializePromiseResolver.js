/**
 * Initializes the internal state for a promise-like object and invokes the resolver function.
 * Throws a TypeError if the resolver is not a function.
 *
 * @param {Function} resolver - The function that resolves or rejects the promise.
 * @returns {void}
 */
function initializePromiseResolver(resolver) {
  // Ensure the resolver is a function
  if (typeof resolver !== "function") {
    throw new TypeError("resolver must be a function");
  }

  // Set the initial state of the promise-like object
  this.state = X; // X: external constant representing the initial state
  this.queue = []; // Initialize the queue for then/catch handlers
  this.outcome = undefined; // Outcome will hold the resolved/rejected value

  // If the resolver is not the special sentinel value processCssDeclarations, invoke operateWithLeadingTrailing to process the resolver
  if (resolver !== processCssDeclarations) {
    operateWithLeadingTrailing(this, resolver); // operateWithLeadingTrailing: external function to handle resolver execution
  }
}

module.exports = initializePromiseResolver;