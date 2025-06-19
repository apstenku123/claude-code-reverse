```javascript
function handleTableElementEndTag(parserContext, token) {
  const tagName = token.tagName;

  // Check if the tag is one of the table section elements
  if (
    tagName === i.TBODY ||
    tagName === i.TFOOT ||
    tagName === i.THEAD
  ) {
    // If the tag is in table scope, clear back to table body context and pop the element
    if (parserContext.openElements.hasInTableScope(tagName)) {
      parserContext.openElements.clearBackToTableBodyContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_MODE";
    }
  } else if (tagName === i.TABLE) {
    // If the tag is TABLE and table body context is in table scope, handle accordingly
    if (parserContext.openElements.hasTableBodyContextInTableScope()) {
      parserContext.openElements.clearBackToTableBodyContext();
      parserContext.openElements.pop();
      parserContext.insertionMode = "IN_TABLE_MODE";
      parserContext._processToken(token);
    }
  } else if (
    tagName !== i.BODY &&
    tagName !== i.CAPTION &&
    tagName !== i.COL &&
    tagName !== i.COLGROUP &&
    tagName !== i.HTML &&
    tagName !== i.TD &&
    tagName !== i.TH &&
    tagName !== i.TR
  ) {
    handleTableRelatedEndTag(parserContext, token);
  }
}

module.exports = handleTableElementEndTag;
```