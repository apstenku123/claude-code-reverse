/**
 * Processes a DOM element based on its tag name, dispatching to the appropriate handler for table-related elements.
 * This function is typically used within an HTML parser or DOM manipulation context to ensure that elements
 * related to tables (such as <table>, <tr>, <streamAssistantResponseWithObservable>, etc.) are handled according to their specific requirements.
 *
 * @param {Object} parserContext - The current parser context or state object.
 * @param {HTMLElement} element - The DOM element to process.
 * @returns {void}
 */
function processTableRelatedElement(parserContext, element) {
  const tagName = element.tagName;

  // Switch based on the length of the tag name for efficient dispatch
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
      // For all other tag names, use the default handler
      temporarilyEnableFosterParentingAndProcessToken(parserContext, element);
  }
}

module.exports = processTableRelatedElement;