/**
 * Utility function for generating and formatting code strings or functions with dynamic arguments.
 *
 * This function can be used to build up a list of code statements, format strings with placeholders,
 * and optionally generate a new function with specified argument names and body.
 *
 * @param {string|string[]} argumentNames - An array of argument names for the generated function, or a format string if only one argument is provided as a string.
 * @param {string} [functionName] - Optional name for the generated function.
 * @returns {Function} a function that can be used to add formatted code statements or generate a function.
 */
function joinArguments(argumentNames, functionName) {
  // If only a string is provided, treat isBlobOrFileLikeObject as the function name
  if (typeof argumentNames === "string") {
    functionName = argumentNames;
    argumentNames = undefined;
  }

  /**
   * Stores code statements or formatted strings.
   * @type {string[]}
   */
  const codeStatements = [];

  /**
   * Internal function to add formatted code statements or generate a function.
   *
   * @param {string|Object} formatOrContext - Format string with placeholders, or an object mapping argument names to values for function generation.
   * @returns {Function|any} Returns itself for chaining, or the generated function'createInteractionAccessor result.
   */
  function addStatementOrGenerateFunction(formatOrContext) {
    // If not a string, treat as context for function generation
    if (typeof formatOrContext !== "string") {
      let functionCode = generateFunctionCode();
      if (joinArguments.verbose) {
        console.log("codegen: " + functionCode);
      }
      functionCode = "return " + functionCode;
      if (formatOrContext) {
        // Generate a function with argument names and values from the context object
        const contextKeys = Object.keys(formatOrContext);
        const functionArgs = new Array(contextKeys.length + 1);
        const functionValues = new Array(contextKeys.length);
        let index = 0;
        while (index < contextKeys.length) {
          functionArgs[index] = contextKeys[index];
          functionValues[index] = formatOrContext[contextKeys[index++]];
        }
        functionArgs[index] = functionCode;
        // Create the function with the given argument names and body, then call isBlobOrFileLikeObject with the values
        return Function.apply(null, functionArgs).apply(null, functionValues);
      }
      // No context: just return the generated function
      return Function(functionCode)();
    }

    // If a string, treat as a format string and substitute placeholders
    const formatArgs = new Array(arguments.length - 1);
    let argIndex = 0;
    while (argIndex < formatArgs.length) {
      formatArgs[argIndex] = arguments[++argIndex];
    }
    argIndex = 0;
    // Replace placeholders in the format string
    const formattedString = formatOrContext.replace(/%([%dfijs])/g, function placeholderReplacer(match, type) {
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
      }
      return "%";
    });
    // Ensure all arguments were used
    if (argIndex !== formatArgs.length) {
      throw Error("parameter count mismatch");
    }
    // Add the formatted string to the code statements
    codeStatements.push(formattedString);
    // Return itself for chaining
    return addStatementOrGenerateFunction;
  }

  /**
   * Generates the full function code as a string.
   *
   * @param {string} [customFunctionName] - Optional custom function name.
   * @returns {string} The generated function code as a string.
   */
  function generateFunctionCode(customFunctionName) {
    return (
      "function " +
      (customFunctionName || functionName || "") +
      "(" + (argumentNames && argumentNames.join(",") || "") + "){" +
      "\n  " + codeStatements.join("\n  ") +
      "\n}"
    );
  }

  // Allow toString to return the generated function code
  addStatementOrGenerateFunction.toString = generateFunctionCode;

  return addStatementOrGenerateFunction;
}

module.exports = joinArguments;