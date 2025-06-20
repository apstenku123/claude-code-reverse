/**
 * Handles accessor logic for various table-related HTML elements based on their tagName.
 * Delegates processing to specialized functions depending on the element type.
 *
 * @param {Object} sourceObservable - The source observable or context object for the accessor.
 * @param {HTMLElement} element - The HTML element to process.
 */
function handleTableElementAccessor(sourceObservable, element) {
  const tagName = element.tagName;

  switch (tagName.length) {
    case 2:
      // Handle TD, TH, TR elements
      if (
        tagName === i.TD ||
        tagName === i.TH ||
        tagName === i.TR
      ) {
        resetTableBodyContextAndProcessToken(sourceObservable, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
      }
      break;
    case 3:
      // Handle COL element
      if (tagName === i.COL) {
        resetToTableContextAndProcessToken(sourceObservable, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
      }
      break;
    case 4:
      // Handle FORM element
      if (tagName === i.FORM) {
        insertElementIfNoFormOrTemplate(sourceObservable, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
      }
      break;
    case 5:
      // Handle TABLE, STYLE, TBODY, TFOOT, THEAD, INPUT elements
      if (tagName === i.TABLE) {
        x55(sourceObservable, element);
      } else if (tagName === i.STYLE) {
        handleHeadElementStartTag(sourceObservable, element);
      } else if (
        tagName === i.TBODY ||
        tagName === i.TFOOT ||
        tagName === i.THEAD
      ) {
        insertElementInTableContext(sourceObservable, element);
      } else if (tagName === i.INPUT) {
        processTokenWithHiddenTypeCheck(sourceObservable, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
      }
      break;
    case 6:
      // Handle SCRIPT element
      if (tagName === i.SCRIPT) {
        handleHeadElementStartTag(sourceObservable, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
      }
      break;
    case 7:
      // Handle CAPTION element
      if (tagName === i.CAPTION) {
        switchToCaptionMode(sourceObservable, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
      }
      break;
    case 8:
      // Handle COLGROUP, TEMPLATE elements
      if (tagName === i.COLGROUP) {
        insertColumnGroupElement(sourceObservable, element);
      } else if (tagName === i.TEMPLATE) {
        handleHeadElementStartTag(sourceObservable, element);
      } else {
        temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
      }
      break;
    default:
      // Fallback for all other elements
      temporarilyEnableFosterParentingAndProcessToken(sourceObservable, element);
  }
}

module.exports = handleTableElementAccessor;