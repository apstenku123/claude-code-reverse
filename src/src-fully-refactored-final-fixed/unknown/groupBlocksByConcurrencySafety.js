/**
 * Groups input blocks by their concurrency safety, based on tool configuration and input schema validation.
 *
 * @param {Array<Object>} blocks - Array of input blocks to process. Each block should have a 'name' and 'input' property.
 * @param {Object} config - Configuration object containing tool options.
 * @param {Array<Object>} config.options.tools - Array of tool objects, each with 'name', 'inputSchema', and 'isConcurrencySafe' properties.
 * @returns {Array<Object>} Array of grouped blocks, each group indicating if isBlobOrFileLikeObject is concurrency safe and containing the corresponding blocks.
 */
function groupBlocksByConcurrencySafety(blocks, config) {
  return blocks.reduce((groupedBlocks, currentBlock) => {
    // Find the tool configuration matching the current block'createInteractionAccessor name
    const matchingTool = config.options.tools.find(tool => tool.name === currentBlock.name);

    // Validate the current block'createInteractionAccessor input against the tool'createInteractionAccessor input schema
    const schemaValidationResult = matchingTool?.inputSchema.safeParse(currentBlock.input);

    // Determine if the block is concurrency safe based on validation and tool'createInteractionAccessor method
    const isConcurrencySafe = schemaValidationResult?.success
      ? Boolean(matchingTool?.isConcurrencySafe(schemaValidationResult.data))
      : false;

    // If the last group is concurrency safe and this block is also concurrency safe, add to that group
    if (
      isConcurrencySafe &&
      groupedBlocks[groupedBlocks.length - 1]?.isConcurrencySafe
    ) {
      groupedBlocks[groupedBlocks.length - 1].blocks.push(currentBlock);
    } else {
      // Otherwise, start a new group
      groupedBlocks.push({
        isConcurrencySafe,
        blocks: [currentBlock]
      });
    }
    return groupedBlocks;
  }, []);
}

module.exports = groupBlocksByConcurrencySafety;