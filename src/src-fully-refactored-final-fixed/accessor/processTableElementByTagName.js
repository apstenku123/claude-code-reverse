/**
 * Processes a DOM element based on its tag name, dispatching to the appropriate handler function.
 * This function is primarily used for handling table-related elements and their specific processing logic.
 *
 * @param {object} context - The processing context or state object.
 * @param {HTMLElement} element - The DOM element to process.
 */
function processTableElementByTagName(context, element) {
  const tagName = element.tagName;

  // Switch based on the length of the tag name for performance reasons
  switch (tagName.length) {
    case 2:
      // Handle <TD>, <TH>, <TR>
      if (
        tagName === i.TD ||
        tagName === i.TH ||
        tagName === i.TR
      ) {
        resetTableBodyContextAndProcessToken(context, element);
      } else {
        withFosterParentingEnabled(context, element);
      }
      break;
    case 3:
      // Handle <COL>
      if (tagName === i.COL) {
        resetToTableContextAndProcessToken(context, element);
      } else {
        withFosterParentingEnabled(context, element);
      }
      break;
    case 4:
      // Handle <FORM>
      if (tagName === i.FORM) {
        insertElementIfNoFormOrTemplate(context, element);
      } else {
        withFosterParentingEnabled(context, element);
      }
      break;
    case 5:
      // Handle <TABLE>, <STYLE>, <TBODY>, <TFOOT>, <THEAD>, <INPUT>
      if (tagName === i.TABLE) {
        x55(context, element);
      } else if (tagName === i.STYLE) {
        handleHeadElementStartTag(context, element);
      } else if (
        tagName === i.TBODY ||
        tagName === i.TFOOT ||
        tagName === i.THEAD
      ) {
        insertElementInTableContext(context, element);
      } else if (tagName === i.INPUT) {
        processTokenWithHiddenTypeCheck(context, element);
      } else {
        withFosterParentingEnabled(context, element);
      }
      break;
    case 6:
      // Handle <SCRIPT>
      if (tagName === i.SCRIPT) {
        handleHeadElementStartTag(context, element);
      } else {
        withFosterParentingEnabled(context, element);
      }
      break;
    case 7:
      // Handle <CAPTION>
      if (tagName === i.CAPTION) {
        switchToCaptionMode(context, element);
      } else {
        withFosterParentingEnabled(context, element);
      }
      break;
    case 8:
      // Handle <COLGROUP>, <TEMPLATE>
      if (tagName === i.COLGROUP) {
        insertColumnGroupElement(context, element);
      } else if (tagName === i.TEMPLATE) {
        handleHeadElementStartTag(context, element);
      } else {
        withFosterParentingEnabled(context, element);
      }
      break;
    default:
      // For any other tag names, use foster parenting
      withFosterParentingEnabled(context, element);
  }
}

module.exports = processTableElementByTagName;