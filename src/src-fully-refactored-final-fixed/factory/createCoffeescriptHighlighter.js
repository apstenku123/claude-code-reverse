```javascript
keyword: [].concat(coffeescriptKeywords).filter(isNotReserved(reservedKeywords)),
literal: [].concat(literalValues),
built_in: [].concat(builtInIdentifiers)
```