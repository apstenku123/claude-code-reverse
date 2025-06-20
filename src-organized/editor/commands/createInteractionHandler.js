/**
 * Creates an interaction handler function with attached metadata and prototype.
 *
 * The returned function wraps the formatWithAnsiSequences function, formatting its arguments as a single string if multiple are provided.
 * It also attaches metadata and sets its prototype for further extension or identification.
 *
 * @param {Function} processInteractionEntries - Function to process interaction entries (dependency).
 * @param {Object} handlerConfig - Configuration object for the handler (dependency).
 * @param {Object} subscriptionReference - Reference to the subscription or observer (dependency).
 * @returns {Function} An interaction handler function with attached metadata and prototype.
 */
const createInteractionHandler = (processInteractionEntries, handlerConfig, subscriptionReference) => {
  /**
   * The interaction handler function. Calls formatWithAnsiSequences with itself as context and a formatted string of arguments.
   * @param {...any} args - Arguments to be processed and passed to formatWithAnsiSequences.
   * @returns {any} The result of calling formatWithAnsiSequences with the formatted arguments.
   */
  const interactionHandler = (...args) => {
    // If only one argument, convert to string; otherwise, join all arguments with a space
    const formattedArgs = args.length === 1 ? String(args[0]) : args.join(" ");
    return formatWithAnsiSequences(interactionHandler, formattedArgs);
  };

  // Set the prototype of the handler to Ms9 for inheritance or identification
  Object.setPrototypeOf(interactionHandler, Ms9);

  // Attach metadata properties to the handler
  interactionHandler[DT1] = processInteractionEntries; // DT1 is a symbol or string key for the process function
  interactionHandler[wv] = handlerConfig;              // wv is a symbol or string key for configuration
  interactionHandler[Ri] = subscriptionReference;      // Ri is a symbol or string key for subscription reference

  return interactionHandler;
};

module.exports = createInteractionHandler;