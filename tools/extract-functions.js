const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

function extractFunctions(filePath) {
  const cliContent = fs.readFileSync(filePath, 'utf-8');
  const functions = [];
  
  const ast = parser.parse(cliContent, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'decorators-legacy', 'topLevelAwait'],
    errorRecovery: true
  });

  function extractFunction(path, type, nameOverride = null) {
    const node = path.node;
    const functionName = nameOverride || (node.id ? node.id.name : null);
    
    if (!functionName) return;

    // Skip already processed functions
    if (functionName.startsWith('renamed_renamed_')) return;

    let code;
    try {
      // Generate the complete function code
      const generated = generate(node, {
        retainLines: false,
        compact: false,
        concise: false,
        comments: true
      });
      code = generated.code;
    } catch (error) {
      console.error(`Error generating code for function ${functionName}:`, error.message);
      code = '';
    }

    const startLine = node.loc ? node.loc.start.line : 0;
    const endLine = node.loc ? node.loc.end.line : 0;

    functions.push({
      name: functionName,
      type: type,
      startLine: startLine,
      endLine: endLine,
      code: code,
      node: node
    });
  }
  
  traverse(ast, {
    FunctionDeclaration(path) {
      extractFunction(path, 'FunctionDeclaration');
    },
    FunctionExpression(path) {
      // Only extract named function expressions
      const parent = path.parent;
      if (t.isVariableDeclarator(parent) && parent.id && t.isIdentifier(parent.id)) {
        extractFunction(path, 'FunctionExpression', parent.id.name);
      }
    },
    ArrowFunctionExpression(path) {
      // Only extract named arrow functions
      const parent = path.parent;
      if (t.isVariableDeclarator(parent) && parent.id && t.isIdentifier(parent.id)) {
        extractFunction(path, 'ArrowFunctionExpression', parent.id.name);
      }
    }
  });

  // Sort functions by line number for consistent processing
  functions.sort((a, b) => a.startLine - b.startLine);
  
  return functions;
}

module.exports = { extractFunctions };