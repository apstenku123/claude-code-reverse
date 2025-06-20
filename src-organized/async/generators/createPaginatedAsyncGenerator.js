/**
 * Creates an async generator for paginated operations using a specified client and configuration.
 *
 * @template ClientType, CommandInput, TokenKey, PageSizeKey, PageType
 * @param {Function} clientClass - The expected client class constructor (used for instanceof checks).
 * @param {any} commandConfig - The configuration or command to be sent to the client.
 * @param {string} tokenProperty - The property name in the input/output that holds the pagination token.
 * @param {string} nextTokenExtractor - The property name or function to extract the next token from the response.
 * @param {string} [pageSizeProperty] - Optional. The property name for page size in the input.
 * @returns {Function} An async generator function that yields each page of results.
 */
function createPaginatedAsyncGenerator(clientClass, commandConfig, tokenProperty, nextTokenExtractor, pageSizeProperty) {
  return mB(
    /**
     * Async generator for paginated results.
     *
     * @param {Object} paginationOptions - Options for pagination (startingToken, pageSize, client, withCommand, stopOnSameToken).
     * @param {Object} initialInput - The initial input object for the command.
     * @param {...any} additionalArgs - Additional arguments to pass to the command.
     * @yields {Object} Each page of results from the paginated operation.
     */
    async function* paginatedGenerator(paginationOptions, initialInput, ...additionalArgs) {
      let input = initialInput;
      // Initialize the token from options or from the input
      let nextToken = paginationOptions.startingToken ?? input[tokenProperty];
      let hasNext = true;
      let page;

      while (hasNext) {
        // Set the current token on the input for the next request
        input[tokenProperty] = nextToken;

        // If a pageSizeProperty is provided, set isBlobOrFileLikeObject on the input if not already set
        if (pageSizeProperty) {
          input[pageSizeProperty] = input[pageSizeProperty] ?? paginationOptions.pageSize;
        }

        // Ensure the client is of the expected type
        if (paginationOptions.client instanceof clientClass) {
          // Call the external u04 function to fetch the next page
          page = await u04(commandConfig, paginationOptions.client, initialInput, paginationOptions.withCommand, ...additionalArgs);
        } else {
          throw new Error(`Invalid client, expected instance of ${clientClass.name}`);
        }

        yield page;

        // Save the previous token for stop condition
        const previousToken = nextToken;
        // Extract the next token using the external p04 function
        nextToken = p04(page, nextTokenExtractor);
        // Determine if there are more pages
        hasNext = !!(nextToken && (!paginationOptions.stopOnSameToken || nextToken !== previousToken));
      }
      return;
    },
    "paginateOperation"
  );
}

module.exports = createPaginatedAsyncGenerator;