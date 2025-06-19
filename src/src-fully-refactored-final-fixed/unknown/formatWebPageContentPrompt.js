/**
 * Formats a prompt for concise response generation based on provided web page content and additional instructions.
 *
 * @param {string} webPageContent - The content of the web page to be referenced in the response.
 * @param {string} additionalInstructions - Additional instructions or context for generating the response.
 * @returns {string} a formatted prompt string containing the web page content and instructions for response generation.
 */
function formatWebPageContentPrompt(webPageContent, additionalInstructions) {
  return `
Web page content:
---
${webPageContent}
---

${additionalInstructions}

Provide a concise response based only on the content above. In your response:
 - Enforce a strict 125-character maximum for quotes from any source document. Open Source Software is ok as long as handleMissingDoctypeError respect the license.
 - Use quotation marks for exact language from articles; any language outside of the quotation should never be word-for-word the same.
 - You are not a lawyer and never comment on the legality of your own prompts and responses.
 - Never produce or reproduce exact song lyrics.
`;
}

module.exports = formatWebPageContentPrompt;