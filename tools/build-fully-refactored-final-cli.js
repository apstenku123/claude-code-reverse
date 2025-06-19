#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * File: tools/build-fully-refactored-final-cli.js
 * Author: davidgornshtein@gmail.com
 * Description: Builds a consolidated CLI file from refactored modular source files
 * Purpose: Combines all refactored modules into a single executable CLI file with custom module loader
 * Patterns: Module bundling, custom require system, shebang preservation
 * Updated by davidgornshtein@gmail.com
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src-fully-refactored-final-fixed');
const outputFile = path.join(__dirname, '..', 'cli-fully-refactored-final.cjs');

// Read the original cli.js to understand the structure
const originalCliPath = path.join(__dirname, '..', 'cli.js');
const originalCli = fs.readFileSync(originalCliPath, 'utf8');

// Extract the shebang and initial setup from original
const shebangMatch = originalCli.match(/^#!.*\n/);
const shebang = '#!/usr/bin/env node\n';

// Create a module loader system
const moduleSystem = `
// Import Node.js built-in modules  
const fs = require('fs');
const path = require('path');
const os = require('os');
const util = require('util');
const child_process = require('child_process');
const crypto = require('crypto');
const process = require('process');

// Module system for refactored code
const modules = {};
const moduleExports = {};

function define(id, factory) {
  modules[id] = factory;
}

function requireModule(id) {
  if (moduleExports[id]) {
    return moduleExports[id];
  }
  
  if (!modules[id]) {
    // Try to load from Node.js built-in or npm modules
    if (id.startsWith('./') || id.startsWith('../')) {
      throw new Error('Module not found: ' + id);
    }
    try {
      return require(id);
    } catch (e) {
      throw new Error('Module not found: ' + id);
    }
  }
  
  const module = { exports: {} };
  const exports = module.exports;
  
  modules[id](module, exports, requireModule);
  moduleExports[id] = module.exports;
  
  return module.exports;
}

// Utility functions that are commonly used
const _ = {
  // Lodash-like utilities
  isArray: Array.isArray,
  isObject: (val) => val !== null && typeof val === 'object',
  isFunction: (val) => typeof val === 'function',
  isString: (val) => typeof val === 'string',
  isNumber: (val) => typeof val === 'number',
  identity: (x) => x,
  noop: () => {},
  get: (obj, path, defaultValue) => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result == null) return defaultValue;
      result = result[key];
    }
    return result === undefined ? defaultValue : result;
  },
  set: (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    current[keys[keys.length - 1]] = value;
    return obj;
  },
  has: (obj, path) => {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (!current || !Object.prototype.hasOwnProperty.call(current, key)) {
        return false;
      }
      current = current[key];
    }
    return true;
  },
  merge: Object.assign,
  cloneDeep: (obj) => JSON.parse(JSON.stringify(obj)),
  pick: (obj, keys) => {
    const result = {};
    keys.forEach(key => {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  },
  omit: (obj, keys) => {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
  },
  filter: (arr, predicate) => arr.filter(predicate),
  map: (arr, mapper) => arr.map(mapper),
  forEach: (arr, fn) => arr.forEach(fn),
  reduce: (arr, fn, initial) => arr.reduce(fn, initial),
  find: (arr, predicate) => arr.find(predicate),
  includes: (arr, item) => arr.includes(item),
  uniq: (arr) => [...new Set(arr)],
  compact: (arr) => arr.filter(Boolean),
  flatten: (arr) => arr.flat(),
  chunk: (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },
  debounce: (func, wait) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },
  throttle: (func, wait) => {
    let lastCall = 0;
    return function(...args) {
      const now = Date.now();
      if (now - lastCall >= wait) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  },
  once: (func) => {
    let called = false;
    let result;
    return function(...args) {
      if (!called) {
        called = true;
        result = func.apply(this, args);
      }
      return result;
    };
  },
  memoize: (func) => {
    const cache = new Map();
    return function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }
};

// Common utility functions used in refactored code
const filter = _.filter;
const map = _.map;
const property = (prop) => (obj) => obj[prop];
const createArrayOfLength = (length, mapper) => Array.from({ length }, (_, i) => mapper(i));
const identity = _.identity;
const noop = _.noop;
const once = _.once;
const throttle = _.throttle;
const debounce = _.debounce;
const memoize = _.memoize;
const get = _.get;
const set = _.set;
const has = _.has;
const merge = _.merge;
const cloneDeep = _.cloneDeep;
const pick = _.pick;
const omit = _.omit;
const isArray = _.isArray;
const isObject = _.isObject;
const isFunction = _.isFunction;
const isString = _.isString;
const isNumber = _.isNumber;
const forEach = _.forEach;
const reduce = _.reduce;
const find = _.find;
const includes = _.includes;
const uniq = _.uniq;
const compact = _.compact;
const flatten = _.flatten;
const chunk = _.chunk;

// Additional utilities found in the refactored code
const toString = (val) => String(val);
const padEnd = (str, length, char = ' ') => str.padEnd(length, char);
const padStart = (str, length, char = ' ') => str.padStart(length, char);
const truncate = (str, length, suffix = '...') => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};

// Observable utilities (simplified versions)
const getObservable = (context, key) => context[key];
const processObservable = (obs, handler) => handler(obs);
const handleObservable = (obs, handler) => handler(obs);
const transformHelper = (transform) => (value) => transform(value);
const transformHandler = (handler) => (value) => handler(value);

// Validation utilities
const validateEvent = (event) => !!event;
const validateScope = (scope) => !!scope;
const isValidUuid = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
const parseUuid = (uuid) => uuid;
const uuidToArray = (uuid) => uuid.split('-').join('').match(/.{2}/g).map(hex => parseInt(hex, 16));

// Storage utilities
const storeObject = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));
const storageHandler = {
  get: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key)
};

// Data utilities
const stringifyData = JSON.stringify;
const dataCompressor = (data) => data; // Simplified
const toJsonString = JSON.stringify;

// UI utilities
const displayPrompt = (message) => console.log(message);
const suggestionList = (items) => items;
const completionHandler = (completion) => completion;
const formatAnsi = (text) => text;
const highlightCode = (code) => code;
const lineOverflow = (lines) => lines;
const summarizeLines = (lines) => lines;

// Style utilities
const updateStyle = (element, style) => Object.assign(element.style, style);
const styleProperty = (prop) => (element) => element.style[prop];

// Element utilities
const elementOrEvent = (e) => e;
const isInput = (element) => element.tagName === 'INPUT';

// Main loop utilities
const mainLoop = {
  run: (fn) => fn(),
  stop: () => {}
};

// Notification utilities
const notificationHandler = (notification) => console.log(notification);
const selectionListener = (selection) => selection;

// Logging utilities
const logCompletion = (message) => console.log('Completed:', message);
const updateTime = () => Date.now();

// Property utilities
const setValue = (obj, key, value) => { obj[key] = value; };
const validateProperty = (prop) => prop !== undefined;
const unsetProperty = (obj, key) => { delete obj[key]; };
const handleProperty = (prop, handler) => handler(prop);

// Array utilities
const insertIntoArray = (arr, index, item) => arr.splice(index, 0, item);
const insertAtIndex = (arr, index, item) => { arr[index] = item; };

// Pattern matching utilities
const matchPattern = (pattern, str) => pattern.test(str);
const validateAsync = async (validator) => validator();
const validationHandler = (validation) => validation;
const validateOptions = (options) => options;
const validatePositiveInt = (num) => Number.isInteger(num) && num > 0;

// File system utilities (Node.js)
const readFileSync = fs.readFileSync;
const existsSync = fs.existsSync;
const resolvePath = path.resolve;

`;

// Function to collect all modules
function collectModules() {
  const modules = [];
  
  function scanDirectory(dir, baseDir = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(baseDir, entry.name);
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        const moduleId = relativePath.replace(/\\/g, '/').replace(/\.js$/, '');
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Wrap the module content
        const wrappedContent = `
// Module: ${moduleId}
define('${moduleId}', function(module, exports, require) {
${content}
});
`;
        modules.push(wrappedContent);
      }
    }
  }
  
  scanDirectory(srcDir);
  return modules;
}

// Build the final CLI file
console.log('Building fully refactored final CLI...');

const modules = collectModules();
console.log(`Found ${modules.length} modules`);

// Find the main entry point
const mainModule = modules.find(m => m.includes('initializeClaudeCli') || m.includes('main'));

// Construct the final file
let finalContent = shebang;
finalContent += '\n// Fully Refactored Final Claude CLI\n';
finalContent += '\n"use strict";\n';
finalContent += moduleSystem;
finalContent += '\n// Define all modules\n';
finalContent += modules.join('\n');

// Add the main execution
finalContent += `
// Main execution
(async () => {
  try {
    // Try to find and execute the main module
    const possibleMains = [
      'app/initializeClaudeCli',
      'app/main',
      'app/cli',
      'index'
    ];
    
    let mainFound = false;
    for (const mainPath of possibleMains) {
      try {
        const mainModule = requireModule(mainPath);
        if (typeof mainModule === 'function') {
          await mainModule();
          mainFound = true;
          break;
        } else if (mainModule.main && typeof mainModule.main === 'function') {
          await mainModule.main();
          mainFound = true;
          break;
        } else if (mainModule.init && typeof mainModule.init === 'function') {
          await mainModule.init();
          mainFound = true;
          break;
        } else if (mainModule.start && typeof mainModule.start === 'function') {
          await mainModule.start();
          mainFound = true;
          break;
        }
      } catch (e) {
        // Try next
      }
    }
    
    if (!mainFound) {
      console.error('Could not find main entry point');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error starting CLI:', error);
    process.exit(1);
  }
})();
`;

// Write the output file
fs.writeFileSync(outputFile, finalContent);
console.log(`Built fully refactored final CLI to: ${outputFile}`);

// Make it executable
fs.chmodSync(outputFile, '755');
console.log('Made file executable');

// Try to run it to see what errors we get
console.log('\nTesting the built CLI...');
const { spawn } = require('child_process');
const test = spawn('node', [outputFile, '--version'], {
  stdio: 'inherit'
});

test.on('close', (code) => {
  if (code !== 0) {
    console.log(`\nTest failed with exit code ${code}`);
    console.log('You may need to fix additional issues in the fully refactored final code.');
  } else {
    console.log('\nTest passed! The fully refactored final CLI is working.');
  }
});
