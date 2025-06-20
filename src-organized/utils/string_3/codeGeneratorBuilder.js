/**
 * Builds a code generator function that can accumulate code lines, format them, and generate a new function dynamically.
 *
 * @param {string|string[]} parameterNames - An array of parameter names for the generated function, or a string (used as config if second argument is omitted).
 * @param {string} [functionName] - Optional name for the generated function. If omitted and the first argument is a string, isBlobOrFileLikeObject is used as the function name.
 * @returns {function} a function that can be used to accumulate code lines, format them, and generate a new function.
 */
function codeGeneratorBuilder(parameterNames, functionName) {
  // Handle case where only a string is provided (function name)
  if (typeof parameterNames === "string") {
    functionName = parameterNames;
    parameterNames = undefined;
  }

  /**
   * Accumulates code lines to be included in the generated function body.
   * @type {string[]}
   */
  const codeLines = [];

  /**
   * Internal function to handle code line accumulation, formatting, and function generation.
   *
   * @param {string|Object} codeOrContext - If a string, treated as a code line with optional format specifiers. If an object, used as context for dynamic function generation.
   * @returns {function|*} Returns itself for chaining when adding code lines, or the result of the generated function when context is provided.
   */
  function codegen(codeOrContext) {
    // If not a string, treat as context for generating and invoking the function
    if (typeof codeOrContext !== "string") {
      let functionSource = buildFunctionSource();
      if (codeGeneratorBuilder.verbose) {
        console.log("codegen: " + functionSource);
      }
      functionSource = "return " + functionSource;
      if (codeOrContext) {
        // If context is provided, extract keys and values to pass as arguments
        const contextKeys = Object.keys(codeOrContext);
        const functionArgs = new Array(contextKeys.length + 1);
        const contextValues = new Array(contextKeys.length);
        let index = 0;
        while (index < contextKeys.length) {
          functionArgs[index] = contextKeys[index];
          contextValues[index] = codeOrContext[contextKeys[index++]];
        }
        functionArgs[index] = functionSource;
        // Dynamically create and invoke the function with the provided context
        return Function.apply(null, functionArgs).apply(null, contextValues);
      }
      // If no context, just create and return the function
      return Function(functionSource)();
    }

    // Handle string input: treat as a code line with optional format specifiers
    const formatArgs = new Array(arguments.length - 1);
    let formatIndex = 0;
    while (formatIndex < formatArgs.length) {
      formatArgs[formatIndex] = arguments[++formatIndex];
    }
    formatIndex = 0;
    // Replace format specifiers in the code line
    const formattedCodeLine = codeOrContext.replace(/%([%dfijs])/g, function formatSpecifier(match, specifier) {
      const arg = formatArgs[formatIndex++];
      switch (specifier) {
        case "d":
        case "f":
          return String(Number(arg));
        case "i":
          return String(Math.floor(arg));
        case "j":
          return JSON.stringify(arg);
        case "createInteractionAccessor":
          return String(arg);
        case "%":
          return "%";
      }
      return "%";
    });
    // Throw if the number of format arguments does not match the number of specifiers
    if (formatIndex !== formatArgs.length) {
      throw Error("parameter count mismatch");
    }
    // Accumulate the formatted code line
    codeLines.push(formattedCodeLine);
    // Return self for chaining
    return codegen;
  }

  /**
   * Builds the full function source code as a string.
   * @param {string} [overrideFunctionName] - Optional override for the function name.
   * @returns {string} The complete function source code as a string.
   */
  function buildFunctionSource(overrideFunctionName) {
    const name = overrideFunctionName || functionName || "";
    const params = parameterNames && parameterNames.join(",") || "";
    return `function ${name}(${params}){\n  ${codeLines.join("\n  ")}\n}`;
  }

  // Allow toString to return the generated function source
  codegen.toString = buildFunctionSource;

  return codegen;
}

module.exports = codeGeneratorBuilder;