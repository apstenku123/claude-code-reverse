#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: fix-cli-duplicates.js
 * Location: /Volumes/external/faiss/test22/1.0.19/claude-code-reverse/fix-cli-duplicates.js
 * Author: davidgornshtein@gmail.com
 * Description: Fixes duplicate declarations in the built CLI file
 * Purpose: Remove duplicate const declarations that prevent the CLI from starting
 * Patterns: Regex-based duplicate detection and removal
 */

const fs = require('fs');
const path = require('path');

const cliPath = path.join(__dirname, 'claude');

console.log('Fixing duplicate declarations in CLI...');

let content = fs.readFileSync(cliPath, 'utf-8');
const lines = content.split('\n');
const seen = new Set();
const fixedLines = [];
let duplicatesFixed = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for const declarations
    const constMatch = line.match(/^const (\w+) = /);
    
    if (constMatch) {
        const varName = constMatch[1];
        
        // Skip if it's a duplicate declaration
        if (seen.has(varName)) {
            fixedLines.push(`// Removed duplicate: ${line}`);
            duplicatesFixed++;
            continue;
        }
        
        seen.add(varName);
    }
    
    fixedLines.push(line);
}

// Write the fixed content
fs.writeFileSync(cliPath, fixedLines.join('\n'));

console.log(`Fixed ${duplicatesFixed} duplicate declarations`);
console.log('CLI should now start properly');