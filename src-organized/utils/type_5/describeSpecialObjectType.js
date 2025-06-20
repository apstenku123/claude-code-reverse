/**
 * Returns a human-readable string describing the special type of a given object/value.
 * Handles special cases such as domains, global/window/document objects, Vue view models, synthetic events, NaN, functions, symbols, bigints, and HTML elements.
 * Falls back to a generic object description if no special case matches.
 *
 * @param {string} objectTypeHint - a string hint about the object'createInteractionAccessor type (e.g., 'domain', 'domainEmitter').
 * @param {any} value - The value to be described.
 * @returns {string} a string describing the special type or a generic object description.
 */
function describeSpecialObjectType(objectTypeHint, value) {
  try {
    // Special case: Node.js domain object
    if (
      objectTypeHint === "domain" &&
      value &&
      typeof value === "object" &&
      value._events
    ) {
      return "[Domain]";
    }

    // Special case: domain emitter
    if (objectTypeHint === "domainEmitter") {
      return "[DomainEmitter]";
    }

    // Special case: global object (Node.js)
    if (typeof global !== "undefined" && value === global) {
      return "[Global]";
    }

    // Special case: window object (browser)
    if (typeof window !== "undefined" && value === window) {
      return "[Window]";
    }

    // Special case: document object (browser)
    if (typeof document !== "undefined" && value === document) {
      return "[Document]";
    }

    // Special case: Vue.js view model
    if (eE1.isVueViewModel(value)) {
      return "[VueViewModel]";
    }

    // Special case: Synthetic event (e.g., React synthetic event)
    if (eE1.isSyntheticEvent(value)) {
      return "[SyntheticEvent]";
    }

    // Special case: NaN
    if (typeof value === "number" && value !== value) {
      return "[NaN]";
    }

    // Special case: Function
    if (typeof value === "function") {
      return `[Function: ${hu2.getFunctionName(value)}]`;
    }

    // Special case: Symbol
    if (typeof value === "symbol") {
      return `[${String(value)}]`;
    }

    // Special case: BigInt
    if (typeof value === "bigint") {
      return `[BigInt: ${String(value)}]`;
    }

    // Attempt to get the object'createInteractionAccessor class/type name
    const objectClassName = du2(value);

    // Special case: HTML element
    if (/^HTML(\w*)Element$/.test(objectClassName)) {
      return `[HTMLElement: ${objectClassName}]`;
    }

    // Fallback: generic object description
    return `[object ${objectClassName}]`;
  } catch (error) {
    // If serialization fails, return a non-serializable marker
    return `**non-serializable** (${error})`;
  }
}

module.exports = describeSpecialObjectType;
