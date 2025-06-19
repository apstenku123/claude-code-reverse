/**
 * Creates a code generation utility that can build and return JavaScript function source code dynamically.
 * Supports printf-style string formatting and dynamic function creation with optional argument mapping.
 *
 * @param {string|string[]} [argumentNamesOrFunctionName] - Either an array of argument names for the generated function, or the function name as a string.
 * @param {string} [functionName] - Optional function name for the generated function (if the first argument is an array).
 * @returns {function} a code generation function that supports printf-style formatting and dynamic function creation.
 */
function codeGeneratorFactory(argumentNamesOrFunctionName, functionName) {
  // If the first argument is a string, treat isBlobOrFileLikeObject as the function name
  if (typeof argumentNamesOrFunctionName === "string") {
    functionName = argumentNamesOrFunctionName;
    argumentNamesOrFunctionName = undefined;
  }

  /**
   * Stores code lines to be included in the generated function body.
   * @type {string[]}
   */
  const codeLines = [];

  /**
   * Formats and accumulates code lines, or generates and evaluates a function from the accumulated code.
   *
   * @param {string|Object} formatOrContext - If a string, treated as a printf-style format string. If an object, treated as a context for dynamic function creation.
   * @returns {function|*} Returns itself for chaining when adding code lines, or the result of the generated function when invoked.
   */
  function codegen(formatOrContext) {
    // If not a string, treat as context for dynamic function creation
    if (typeof formatOrContext !== "string") {
      let functionSource = buildFunctionSource();
      if (codeGeneratorFactory.verbose) {
        console.log("codegen: " + functionSource);
      }
      functionSource = "return " + functionSource;
      if (formatOrContext) {
        // If context object provided, extract keys and values for Function constructor
        const contextKeys = Object.keys(formatOrContext);
        const functionArgs = new Array(contextKeys.length + 1);
        const functionValues = new Array(contextKeys.length);
        let index = 0;
        while (index < contextKeys.length) {
          functionArgs[index] = contextKeys[index];
          functionValues[index] = formatOrContext[contextKeys[index++]];
        }
        functionArgs[index] = functionSource;
        // Create and invoke the function with the provided context
        return Function.apply(null, functionArgs).apply(null, functionValues);
      }
      // No context: create and invoke the function with no arguments
      return Function(functionSource)();
    }

    // If a string, treat as printf-style format string
    const formatArgs = new Array(arguments.length - 1);
    let argIndex = 0;
    while (argIndex < formatArgs.length) {
      formatArgs[argIndex] = arguments[++argIndex];
    }
    argIndex = 0;
    // Replace printf-style placeholders with provided arguments
    const formattedLine = formatOrContext.replace(/%([%dfijs])/g, function formatPlaceholder(match, type) {
      const value = formatArgs[argIndex++];
      switch (type) {
        case "d":
        case "f":
          return String(Number(value));
        case "i":
          return String(Math.floor(value));
        case "j":
          return JSON.stringify(value);
        case "createInteractionAccessor":
          return String(value);
        case "%":
          return "%";
      }
      return "%";
    });
    // Ensure all arguments were consumed
    if (argIndex !== formatArgs.length) {
      throw Error("parameter count mismatch");
    }
    // Add the formatted line to the code lines
    codeLines.push(formattedLine);
    // Return self for chaining
    return codegen;
  }

  /**
   * Builds the full source code for the generated function as a string.
   *
   * @param {string} [overrideFunctionName] - Optional override for the function name.
   * @returns {string} The full function source code as a string.
   */
  function buildFunctionSource(overrideFunctionName) {
    // Use provided override, explicit functionName, or empty string
    const name = overrideFunctionName || functionName || "";
    // Use argument names if provided, otherwise empty string
    const args = argumentNamesOrFunctionName && argumentNamesOrFunctionName.join(",") || "";
    // Join all code lines with newlines
    const body = codeLines.join("\n  ");
    // Construct the function source code
    return `function ${name}(${args}){\n  ${body}\n}`;
  }

  // Allow toString to return the generated function source
  codegen.toString = buildFunctionSource;

  return codegen;
}

module.exports = codeGeneratorFactory;