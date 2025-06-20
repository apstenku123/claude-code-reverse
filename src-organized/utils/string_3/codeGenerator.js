/**
 * Dynamically generates JavaScript functions as strings or Function objects, supporting printf-style string formatting and code accumulation.
 *
 * @function codeGenerator
 * @param {string|string[]} [parameterNames] - An array of parameter names for the generated function, or a string format if only formatting is needed.
 * @param {string} [functionName] - Optional name for the generated function.
 * @returns {function} - a function that can be called with either a format string and arguments (for code accumulation), or an object of variables for code evaluation.
 */
function codeGenerator(parameterNames, functionName) {
  // If only a format string is provided, shift arguments
  if (typeof parameterNames === "string") {
    functionName = parameterNames;
    parameterNames = undefined;
  }

  /**
   * Accumulates code lines for the generated function
   * @type {string[]}
   */
  const codeLines = [];

  /**
   * Generates the full function source code as a string
   * @param {string} [customFunctionName] - Optional function name override
   * @returns {string} - The complete function source code as a string
   */
  function getFunctionSource(customFunctionName) {
    // Use provided name, fallback to functionName, or empty string
    const name = customFunctionName || functionName || "";
    // Join parameter names if provided
    const params = parameterNames && parameterNames.join(",") || "";
    // Join accumulated code lines
    const body = codeLines.join("\n  ");
    return `function ${name}(${params}){\n  ${body}\n}`;
  }

  /**
   * Main interface for accumulating code or evaluating generated code
   *
   * - If called with a string as the first argument, treats isBlobOrFileLikeObject as a printf-style format and accumulates a code line.
   * - If called with an object as the first argument, treats isBlobOrFileLikeObject as a variable map and evaluates the generated function with those variables.
   *
   * @param {string|Object} formatOrVariables - Format string for code line, or variable map for evaluation
   * @param {...any} args - Arguments for format string
   * @returns {function|any} - Returns itself for chaining, or the result of evaluated function
   */
  function codegenInterface(formatOrVariables, ...args) {
    // If first argument is not a string, treat as variable map for evaluation
    if (typeof formatOrVariables !== "string") {
      let functionSource = getFunctionSource();
      if (codeGenerator.verbose) {
        console.log("codegen: " + functionSource);
      }
      // Prepend 'return' to the function body
      functionSource = "return " + functionSource;
      if (formatOrVariables) {
        // If variables are provided, build argument lists
        const variableNames = Object.keys(formatOrVariables);
        const functionArgs = new Array(variableNames.length + 1);
        const argValues = new Array(variableNames.length);
        let i = 0;
        // Build argument names and values arrays
        while (i < variableNames.length) {
          functionArgs[i] = variableNames[i];
          argValues[i] = formatOrVariables[variableNames[i]];
          i++;
        }
        // Last argument is the function source
        functionArgs[i] = functionSource;
        // Dynamically create and invoke the function
        return Function.apply(null, functionArgs).apply(null, argValues);
      }
      // No variables, just evaluate the function
      return Function(functionSource)();
    }

    // If first argument is a string, treat as format string for code line
    const formatString = formatOrVariables;
    const formatArgs = args;
    let argIndex = 0;
    // Replace printf-style tokens with arguments
    const formattedLine = formatString.replace(/%([%dfijs])/g, function(match, type) {
      const value = formatArgs[argIndex++];
      switch (type) {
        case "d": // integer/float as number
        case "f":
          return String(Number(value));
        case "i": // integer
          return String(Math.floor(value));
        case "j": // JSON
          return JSON.stringify(value);
        case "createInteractionAccessor": // string
          return String(value);
        case "%": // literal percent
          return "%";
      }
      return "%";
    });
    // Check for argument count mismatch
    if (argIndex !== formatArgs.length) {
      throw new Error("parameter count mismatch");
    }
    // Accumulate the formatted code line
    codeLines.push(formattedLine);
    // Return self for chaining
    return codegenInterface;
  }

  // Allow .toString() to return the generated function source
  codegenInterface.toString = getFunctionSource;

  return codegenInterface;
}

module.exports = codeGenerator;