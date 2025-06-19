/**
 * Returns a string representation for a given object, handling special cases for domains, globals, Vue view models, synthetic events, NaN, functions, symbols, bigints, and HTML elements.
 *
 * @param {string} objectTypeKey - a string key indicating the type or context of the object (e.g., 'domain', 'domainEmitter').
 * @param {any} objectValue - The object or value to be stringified for display or logging purposes.
 * @returns {string} a human-readable string describing the object'createInteractionAccessor type or special case.
 */
function getObjectTypeString(objectTypeKey, objectValue) {
  try {
    // Special case: Node.js domain object
    if (
      objectTypeKey === "domain" &&
      objectValue &&
      typeof objectValue === "object" &&
      objectValue._events
    ) {
      return "[Domain]";
    }

    // Special case: Domain emitter
    if (objectTypeKey === "domainEmitter") {
      return "[DomainEmitter]";
    }

    // Special case: Node.js global object
    if (typeof global !== "undefined" && objectValue === global) {
      return "[Global]";
    }

    // Special case: Browser window object
    if (typeof window !== "undefined" && objectValue === window) {
      return "[Window]";
    }

    // Special case: Browser document object
    if (typeof document !== "undefined" && objectValue === document) {
      return "[Document]";
    }

    // Special case: Vue.js ViewModel instance
    if (eE1.isVueViewModel(objectValue)) {
      return "[VueViewModel]";
    }

    // Special case: Synthetic event (e.g., React SyntheticEvent)
    if (eE1.isSyntheticEvent(objectValue)) {
      return "[SyntheticEvent]";
    }

    // Special case: NaN (Not a Number)
    if (typeof objectValue === "number" && objectValue !== objectValue) {
      return "[NaN]";
    }

    // Special case: Function
    if (typeof objectValue === "function") {
      return `[Function: ${hu2.getFunctionName(objectValue)}]`;
    }

    // Special case: Symbol
    if (typeof objectValue === "symbol") {
      return `[${String(objectValue)}]`;
    }

    // Special case: BigInt
    if (typeof objectValue === "bigint") {
      return `[BigInt: ${String(objectValue)}]`;
    }

    // Get the object'createInteractionAccessor internal class name using du2
    const objectClassName = du2(objectValue);

    // Special case: HTML element (e.g., HTMLDivElement)
    if (/^HTML(\w*)Element$/.test(objectClassName)) {
      return `[HTMLElement: ${objectClassName}]`;
    }

    // Default: generic object type
    return `[object ${objectClassName}]`;
  } catch (error) {
    // If anything goes wrong, return a non-serializable marker with the error
    return `**non-serializable** (${error})`;
  }
}

module.exports = getObjectTypeString;
