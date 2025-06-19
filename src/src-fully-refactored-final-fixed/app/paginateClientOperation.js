/**
 * Paginates over a client operation, yielding each page of results.
 *
 * @template ClientType, CommandInput, TokenKey, CommandType, PageSizeKey
 * @param {ClientType} expectedClientClass - The expected client class constructor for validation.
 * @param {CommandInput} commandInput - The input parameters for the command to be executed.
 * @param {TokenKey} tokenProperty - The property name used for pagination tokens.
 * @param {CommandType} commandType - The command type or identifier to be used with the client.
 * @param {PageSizeKey} pageSizeProperty - The property name for specifying the page size.
 * @returns {Function} An async generator function that yields each page of results.
 */
function paginateClientOperation(expectedClientClass, commandInput, tokenProperty, commandType, pageSizeProperty) {
  return mB(
    /**
     * Async generator for paginating client operations.
     *
     * @param {Object} paginationConfig - Configuration for pagination (e.g., startingToken, pageSize, client, stopOnSameToken, withCommand).
     * @param {Object} initialInput - The initial input object for the command.
     * @param {...any} additionalArgs - Additional arguments to pass to the command.
     * @yields {Object} The result of each paginated command execution.
     */
    async function* paginateGenerator(paginationConfig, initialInput, ...additionalArgs) {
      let currentInput = initialInput;
      let nextToken = paginationConfig.startingToken ?? currentInput[tokenProperty];
      let hasNext = true;
      let pageResult;

      while (hasNext) {
        // Set the pagination token for the current request
        currentInput[tokenProperty] = nextToken;

        // If a page size property is specified, set isBlobOrFileLikeObject if not already present
        if (pageSizeProperty) {
          currentInput[pageSizeProperty] = currentInput[pageSizeProperty] ?? paginationConfig.pageSize;
        }

        // Validate client type and execute the command
        if (paginationConfig.client instanceof expectedClientClass) {
          pageResult = await u04(
            commandInput,
            paginationConfig.client,
            initialInput,
            paginationConfig.withCommand,
            ...additionalArgs
          );
        } else {
          throw new Error(`Invalid client, expected instance of ${expectedClientClass.name}`);
        }

        // Yield the result of the current page
        yield pageResult;

        // Prepare for the next iteration
        const previousToken = nextToken;
        nextToken = p04(pageResult, commandType);
        hasNext = Boolean(
          nextToken && (!paginationConfig.stopOnSameToken || nextToken !== previousToken)
        );
      }
      return;
    },
    "paginateOperation"
  );
}

module.exports = paginateClientOperation;