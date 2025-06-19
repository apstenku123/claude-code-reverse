/**
 * Returns a string description for special JavaScript objects and values.
 * Handles special cases such as domains, global/window/document objects, Vue view models, synthetic events, NaN, functions, symbols, bigints, and HTML elements.
 * Falls back to a generic object description if no special case matches.
 *
 * @param {string} objectType - a string indicating the type or context of the object (e.g., 'domain', 'domainEmitter').
 * @param {any} objectValue - The value to be described.
 * @returns {string} a string description of the special object or value.
 */
function describeSpecialObject(objectType, objectValue) {
  try {
    // Check for Node.js domain object
    if (
      objectType === "domain" &&
      objectValue &&
      typeof objectValue === "object" &&
      objectValue._events
    ) {
      return "[Domain]";
    }

    // Check for domain emitter
    if (objectType === "domainEmitter") {
      return "[DomainEmitter]";
    }

    // Check for global object (Node.js)
    if (typeof global !== "undefined" && objectValue === global) {
      return "[Global]";
    }

    // Check for window object (browser)
    if (typeof window !== "undefined" && objectValue === window) {
      return "[Window]";
    }

    // Check for document object (browser)
    if (typeof document !== "undefined" && objectValue === document) {
      return "[Document]";
    }

    // Check for Vue.js view model
    if (eE1.isVueViewModel(objectValue)) {
      return "[VueViewModel]";
    }

    // Check for synthetic event (e.g., React synthetic event)
    if (eE1.isSyntheticEvent(objectValue)) {
      return "[SyntheticEvent]";
    }

    // Check for NaN
    if (typeof objectValue === "number" && objectValue !== objectValue) {
      return "[NaN]";
    }

    // Check for function
    if (typeof objectValue === "function") {
      // Use helper to get function name
      return `[Function: ${hu2.getFunctionName(objectValue)}]`;
    }

    // Check for symbol
    if (typeof objectValue === "symbol") {
      return `[${String(objectValue)}]`;
    }

    // Check for bigint
    if (typeof objectValue === "bigint") {
      return `[BigInt: ${String(objectValue)}]`;
    }

    // Use du2 to get the object'createInteractionAccessor class/type name
    const objectClassName = du2(objectValue);

    // Check for HTML element
    if (/^HTML(\w*)Element$/.test(objectClassName)) {
      return `[HTMLElement: ${objectClassName}]`;
    }

    // Fallback: generic object description
    return `[object ${objectClassName}]`;
  } catch (error) {
    // If any error occurs during processing, return a non-serializable marker
    return `**non-serializable** (${error})`;
  }
}

module.exports = describeSpecialObject;
