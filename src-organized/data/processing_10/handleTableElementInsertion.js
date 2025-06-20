/**
 * Handles insertion logic for various table-related HTML elements during parsing or DOM manipulation.
 * Dispatches processing to specialized handlers based on the tag name of the provided element.
 *
 * @param {Object} parserContext - The current parser or processing context.
 * @param {HTMLElement} element - The HTML element to process.
 * @returns {void}
 */
function handleTableElementInsertion(parserContext, element) {
  const tagName = element.tagName;

  // Switch based on the length of the tag name for performance
  switch (tagName.length) {
    case 2:
      // Handle <streamAssistantResponseWithObservable>, <th>, <tr>
      if (
        tagName === i.TD ||
        tagName === i.TH ||
        tagName === i.TR
      ) {
        resetTableBodyContextAndProcessToken(parserContext, element);
      } else {
        // Fallback handler
        temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
      }
      break;
    case 3:
      // Handle <col>
      if (tagName === i.COL) {
        resetToTableContextAndProcessToken(parserContext, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
      }
      break;
    case 4:
      // Handle <form>
      if (tagName === i.FORM) {
        insertElementIfNoFormOrTemplate(parserContext, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
      }
      break;
    case 5:
      // Handle <table>, <style>, <tbody>, <tfoot>, <thead>, <input>
      if (tagName === i.TABLE) {
        x55(parserContext, element);
      } else if (tagName === i.STYLE) {
        handleHeadElementStartTag(parserContext, element);
      } else if (
        tagName === i.TBODY ||
        tagName === i.TFOOT ||
        tagName === i.THEAD
      ) {
        insertElementInTableContext(parserContext, element);
      } else if (tagName === i.INPUT) {
        processTokenWithHiddenTypeCheck(parserContext, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
      }
      break;
    case 6:
      // Handle <script>
      if (tagName === i.SCRIPT) {
        handleHeadElementStartTag(parserContext, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
      }
      break;
    case 7:
      // Handle <caption>
      if (tagName === i.CAPTION) {
        switchToCaptionMode(parserContext, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
      }
      break;
    case 8:
      // Handle <colgroup>, <template>
      if (tagName === i.COLGROUP) {
        insertColumnGroupElement(parserContext, element);
      } else if (tagName === i.TEMPLATE) {
        handleHeadElementStartTag(parserContext, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
      }
      break;
    default:
      // Fallback handler for all other tag names
      temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
  }
}

module.exports = handleTableElementInsertion;