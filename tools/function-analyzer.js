const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');

class FunctionAnalyzer {
  constructor() {
    this.patterns = {
      getter: /^(get|is|has|should|can|will)/,
      setter: /^set/,
      handler: /^(handle|on)/,
      validator: /^(validate|check|verify|ensure)/,
      factory: /^(create|make|build|generate)/,
      processor: /^(process|transform|convert|parse)/,
      initializer: /^(init|setup|configure|bootstrap)/,
      utility: /^(format|normalize|sanitize|extract)/
    };

    this.contextKeywords = {
      http: ['fetch', 'request', 'response', 'url', 'endpoint', 'api', 'http', 'xhr', 'ajax'],
      database: ['query', 'insert', 'update', 'delete', 'find', 'save', 'db', 'sql', 'mongo'],
      logging: ['log', 'console', 'debug', 'info', 'error', 'warn', 'trace'],
      error: ['try', 'catch', 'throw', 'Error', 'exception', 'fail'],
      auth: ['auth', 'token', 'login', 'user', 'permission', 'role', 'session'],
      cache: ['cache', 'store', 'retrieve', 'expire', 'ttl', 'memoize'],
      async: ['async', 'await', 'Promise', 'then', 'catch', 'resolve', 'reject'],
      dom: ['document', 'window', 'element', 'querySelector', 'addEventListener'],
      react: ['useState', 'useEffect', 'Component', 'render', 'props', 'state'],
      event: ['emit', 'on', 'off', 'listener', 'event', 'trigger', 'subscribe']
    };
  }

  analyzeFunctionCode(code, originalName, metadata = {}) {
    try {
      const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript', 'decorators-legacy'],
        errorRecovery: true
      });

      const analysis = {
        originalName,
        code,
        metadata,
        features: this.extractFeatures(ast, code),
        patterns: this.detectPatterns(ast, code),
        complexity: this.calculateComplexity(ast),
        purpose: null,
        suggestedNames: []
      };

      analysis.purpose = this.inferPurpose(analysis);
      analysis.suggestedNames = this.generateNameSuggestions(analysis);

      return analysis;
    } catch (error) {
      console.error(`Error analyzing function ${originalName}:`, error);
      return {
        originalName,
        error: error.message,
        features: {},
        patterns: [],
        complexity: { score: 0 },
        purpose: 'unknown',
        suggestedNames: [`${originalName}_error`]
      };
    }
  }

  extractFeatures(ast, code) {
    const features = {
      identifiers: [],
      stringLiterals: [],
      apiCalls: [],
      parameters: [],
      returnType: null,
      hasReturn: false,
      isAsync: false,
      isGenerator: false,
      usesThis: false,
      dependencies: [],
      operations: [],
      controlFlow: {
        hasConditionals: false,
        hasLoops: false,
        hasTryCatch: false,
        hasSwitch: false
      }
    };

    traverse(ast, {
      FunctionDeclaration(path) {
        features.isAsync = path.node.async;
        features.isGenerator = path.node.generator;
        features.parameters = path.node.params.map(p => p.name || 'unknown');
      },
      FunctionExpression(path) {
        features.isAsync = path.node.async;
        features.isGenerator = path.node.generator;
        features.parameters = path.node.params.map(p => p.name || 'unknown');
      },
      ArrowFunctionExpression(path) {
        features.isAsync = path.node.async;
        features.parameters = path.node.params.map(p => p.name || 'unknown');
      },
      Identifier(path) {
        if (!path.isBindingIdentifier() && !path.isReferencedIdentifier()) return;
        const name = path.node.name;
        if (!features.identifiers.includes(name)) {
          features.identifiers.push(name);
        }
      },
      StringLiteral(path) {
        features.stringLiterals.push(path.node.value);
      },
      CallExpression(path) {
        const callee = path.get('callee');
        if (callee.isIdentifier()) {
          features.apiCalls.push(callee.node.name);
          features.dependencies.push(callee.node.name);
        } else if (callee.isMemberExpression()) {
          const obj = callee.get('object');
          const prop = callee.get('property');
          if (obj.isIdentifier() && prop.isIdentifier()) {
            features.apiCalls.push(`${obj.node.name}.${prop.node.name}`);
          }
        }
      },
      ReturnStatement(path) {
        features.hasReturn = true;
        const argument = path.node.argument;
        if (argument) {
          if (t.isBooleanLiteral(argument)) {
            features.returnType = 'boolean';
          } else if (t.isStringLiteral(argument)) {
            features.returnType = 'string';
          } else if (t.isNumericLiteral(argument)) {
            features.returnType = 'number';
          } else if (t.isArrayExpression(argument)) {
            features.returnType = 'array';
          } else if (t.isObjectExpression(argument)) {
            features.returnType = 'object';
          } else if (t.isNewExpression(argument)) {
            features.returnType = 'instance';
          }
        }
      },
      IfStatement(path) {
        features.controlFlow.hasConditionals = true;
      },
      ConditionalExpression(path) {
        features.controlFlow.hasConditionals = true;
      },
      ForStatement(path) {
        features.controlFlow.hasLoops = true;
      },
      WhileStatement(path) {
        features.controlFlow.hasLoops = true;
      },
      DoWhileStatement(path) {
        features.controlFlow.hasLoops = true;
      },
      ForInStatement(path) {
        features.controlFlow.hasLoops = true;
      },
      ForOfStatement(path) {
        features.controlFlow.hasLoops = true;
      },
      TryStatement(path) {
        features.controlFlow.hasTryCatch = true;
      },
      SwitchStatement(path) {
        features.controlFlow.hasSwitch = true;
      },
      ThisExpression(path) {
        features.usesThis = true;
      },
      BinaryExpression(path) {
        features.operations.push(path.node.operator);
      },
      UnaryExpression(path) {
        features.operations.push(path.node.operator);
      },
      UpdateExpression(path) {
        features.operations.push(path.node.operator);
      }
    });

    return features;
  }

  detectPatterns(ast, code) {
    const patterns = [];
    const features = this.extractFeatures(ast, code);

    // Check for getter pattern
    if (!features.parameters.length && features.hasReturn && !features.controlFlow.hasLoops) {
      patterns.push('getter');
    }

    // Check for setter pattern
    if (features.parameters.length === 1 && !features.hasReturn) {
      patterns.push('setter');
    }

    // Check for boolean checker
    if (features.returnType === 'boolean') {
      patterns.push('checker');
    }

    // Check for factory pattern
    if (features.returnType === 'instance' || features.returnType === 'object') {
      patterns.push('factory');
    }

    // Check for async pattern
    if (features.isAsync || features.apiCalls.some(call => call.includes('Promise'))) {
      patterns.push('async');
    }

    // Check for event handler pattern
    if (features.parameters.some(p => p.toLowerCase().includes('event')) ||
        features.apiCalls.some(call => call.includes('addEventListener'))) {
      patterns.push('eventHandler');
    }

    // Check for validator pattern
    if (features.returnType === 'boolean' && features.controlFlow.hasConditionals) {
      patterns.push('validator');
    }

    // Check for transformer pattern
    if (features.hasReturn && features.parameters.length > 0 && 
        (features.apiCalls.includes('map') || features.apiCalls.includes('filter') || 
         features.apiCalls.includes('reduce'))) {
      patterns.push('transformer');
    }

    // Check for middleware pattern
    if (features.parameters.length >= 3 && 
        features.parameters.some(p => ['req', 'res', 'next'].includes(p))) {
      patterns.push('middleware');
    }

    // Check for React hook pattern
    if (features.apiCalls.some(call => call.startsWith('use')) && 
        features.returnType === 'array') {
      patterns.push('reactHook');
    }

    return patterns;
  }

  calculateComplexity(ast) {
    let cyclomaticComplexity = 1;
    let cognitiveComplexity = 0;
    let nestingLevel = 0;
    let maxNesting = 0;

    traverse(ast, {
      IfStatement: {
        enter(path) {
          cyclomaticComplexity++;
          cognitiveComplexity += (1 + nestingLevel);
          nestingLevel++;
          maxNesting = Math.max(maxNesting, nestingLevel);
        },
        exit() {
          nestingLevel--;
        }
      },
      ConditionalExpression() {
        cyclomaticComplexity++;
        cognitiveComplexity++;
      },
      ForStatement: {
        enter() {
          cyclomaticComplexity++;
          cognitiveComplexity += (1 + nestingLevel);
          nestingLevel++;
          maxNesting = Math.max(maxNesting, nestingLevel);
        },
        exit() {
          nestingLevel--;
        }
      },
      WhileStatement: {
        enter() {
          cyclomaticComplexity++;
          cognitiveComplexity += (1 + nestingLevel);
          nestingLevel++;
          maxNesting = Math.max(maxNesting, nestingLevel);
        },
        exit() {
          nestingLevel--;
        }
      },
      DoWhileStatement: {
        enter() {
          cyclomaticComplexity++;
          cognitiveComplexity += (1 + nestingLevel);
          nestingLevel++;
          maxNesting = Math.max(maxNesting, nestingLevel);
        },
        exit() {
          nestingLevel--;
        }
      },
      SwitchCase() {
        cyclomaticComplexity++;
      },
      CatchClause() {
        cyclomaticComplexity++;
        cognitiveComplexity++;
      },
      LogicalExpression(path) {
        if (path.node.operator === '&&' || path.node.operator === '||') {
          cyclomaticComplexity++;
        }
      }
    });

    return {
      cyclomatic: cyclomaticComplexity,
      cognitive: cognitiveComplexity,
      maxNesting,
      score: cyclomaticComplexity + (cognitiveComplexity / 2)
    };
  }

  inferPurpose(analysis) {
    const { features, patterns } = analysis;
    
    // Check for specific patterns first
    if (patterns.includes('getter')) return 'getter';
    if (patterns.includes('setter')) return 'setter';
    if (patterns.includes('validator')) return 'validator';
    if (patterns.includes('factory')) return 'factory';
    if (patterns.includes('eventHandler')) return 'handler';
    if (patterns.includes('middleware')) return 'middleware';
    if (patterns.includes('transformer')) return 'processor';
    if (patterns.includes('reactHook')) return 'hook';

    // Check context keywords
    for (const [context, keywords] of Object.entries(this.contextKeywords)) {
      const allText = [
        ...features.identifiers,
        ...features.stringLiterals,
        ...features.apiCalls
      ].join(' ').toLowerCase();

      if (keywords.some(keyword => allText.includes(keyword))) {
        return context;
      }
    }

    // Default based on features
    if (features.isAsync) return 'async';
    if (features.hasReturn && features.parameters.length === 0) return 'getter';
    if (!features.hasReturn && features.parameters.length > 0) return 'setter';
    if (features.controlFlow.hasLoops) return 'processor';
    
    return 'utility';
  }

  generateNameSuggestions(analysis) {
    const suggestions = [];
    const { features, patterns, purpose } = analysis;

    // Generate based on purpose
    const purposeBasedName = this.generatePurposeBasedName(purpose, features);
    if (purposeBasedName) suggestions.push(purposeBasedName);

    // Generate based on patterns
    patterns.forEach(pattern => {
      const patternBasedName = this.generatePatternBasedName(pattern, features);
      if (patternBasedName && !suggestions.includes(patternBasedName)) {
        suggestions.push(patternBasedName);
      }
    });

    // Generate based on operations
    const operationBasedName = this.generateOperationBasedName(features);
    if (operationBasedName && !suggestions.includes(operationBasedName)) {
      suggestions.push(operationBasedName);
    }

    // If no good suggestions, create a descriptive fallback
    if (suggestions.length === 0) {
      suggestions.push(this.generateFallbackName(analysis));
    }

    return suggestions.slice(0, 3); // Return top 3 suggestions
  }

  generatePurposeBasedName(purpose, features) {
    const mainEntity = this.extractMainEntity(features);
    
    switch (purpose) {
      case 'getter':
        return `get${this.capitalize(mainEntity)}`;
      case 'setter':
        return `set${this.capitalize(mainEntity)}`;
      case 'validator':
        return `validate${this.capitalize(mainEntity)}`;
      case 'factory':
        return `create${this.capitalize(mainEntity)}`;
      case 'handler':
        return `handle${this.capitalize(mainEntity)}`;
      case 'processor':
        return `process${this.capitalize(mainEntity)}`;
      case 'http':
        return features.apiCalls.includes('fetch') ? 
          `fetch${this.capitalize(mainEntity)}` : 
          `request${this.capitalize(mainEntity)}`;
      case 'database':
        if (features.apiCalls.some(call => call.includes('find'))) {
          return `find${this.capitalize(mainEntity)}`;
        }
        if (features.apiCalls.some(call => call.includes('save'))) {
          return `save${this.capitalize(mainEntity)}`;
        }
        return `query${this.capitalize(mainEntity)}`;
      case 'cache':
        return `cache${this.capitalize(mainEntity)}`;
      case 'auth':
        return `authenticate${this.capitalize(mainEntity)}`;
      default:
        return null;
    }
  }

  generatePatternBasedName(pattern, features) {
    const mainEntity = this.extractMainEntity(features);
    
    switch (pattern) {
      case 'checker':
        return `is${this.capitalize(mainEntity)}`;
      case 'async':
        return `async${this.capitalize(mainEntity)}`;
      case 'eventHandler':
        const eventType = this.extractEventType(features);
        return `on${this.capitalize(eventType)}`;
      case 'middleware':
        return `${mainEntity}Middleware`;
      case 'transformer':
        return `transform${this.capitalize(mainEntity)}`;
      case 'reactHook':
        return `use${this.capitalize(mainEntity)}`;
      default:
        return null;
    }
  }

  generateOperationBasedName(features) {
    const mainEntity = this.extractMainEntity(features);
    const mainOperation = this.extractMainOperation(features);
    
    if (mainOperation && mainEntity) {
      return `${mainOperation}${this.capitalize(mainEntity)}`;
    }
    
    return null;
  }

  generateFallbackName(analysis) {
    const { features, purpose, originalName } = analysis;
    
    // Try to extract meaningful parts from the original name
    const cleanedOriginal = originalName.replace(/^renamed_+/, '');
    
    // If the function is simple, describe what it does
    if (features.parameters.length === 0 && features.hasReturn) {
      return `get${this.capitalize(cleanedOriginal)}Value`;
    }
    
    if (features.parameters.length === 1 && !features.hasReturn) {
      return `set${this.capitalize(cleanedOriginal)}Value`;
    }
    
    // Otherwise, use purpose and original name
    return `${purpose}${this.capitalize(cleanedOriginal)}`;
  }

  extractMainEntity(features) {
    // Look for meaningful identifiers
    const meaningfulIdentifiers = features.identifiers
      .filter(id => id.length > 2 && !['var', 'let', 'const', 'function'].includes(id))
      .filter(id => !id.match(/^[A-Z]$/)); // Filter out single letter vars
    
    // Look for entities in string literals
    const entityFromStrings = features.stringLiterals
      .filter(str => str.length > 2 && str.match(/^[a-zA-Z]+$/))
      .map(str => str.toLowerCase());
    
    // Combine and find most common
    const allEntities = [...meaningfulIdentifiers, ...entityFromStrings];
    
    if (allEntities.length > 0) {
      // Return the longest meaningful entity
      return allEntities.reduce((a, b) => a.length > b.length ? a : b);
    }
    
    return 'data';
  }

  extractEventType(features) {
    // Look for event-related strings
    const eventStrings = features.stringLiterals
      .filter(str => str.includes('click') || str.includes('change') || 
                     str.includes('submit') || str.includes('load'));
    
    if (eventStrings.length > 0) {
      return eventStrings[0].replace(/[^a-zA-Z]/g, '');
    }
    
    // Look in parameters
    const eventParam = features.parameters.find(p => p.toLowerCase().includes('event'));
    if (eventParam) {
      return eventParam.replace('event', '').replace('Event', '');
    }
    
    return 'event';
  }

  extractMainOperation(features) {
    // Common operation verbs
    const operationVerbs = {
      'map': 'map',
      'filter': 'filter',
      'reduce': 'reduce',
      'find': 'find',
      'sort': 'sort',
      'split': 'split',
      'join': 'join',
      'parse': 'parse',
      'stringify': 'stringify',
      'format': 'format',
      'validate': 'validate',
      'calculate': 'calculate',
      'compute': 'compute'
    };
    
    for (const [key, verb] of Object.entries(operationVerbs)) {
      if (features.apiCalls.some(call => call.includes(key))) {
        return verb;
      }
    }
    
    return null;
  }

  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = FunctionAnalyzer;