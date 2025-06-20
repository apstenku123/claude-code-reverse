#!/usr/bin/env node
/**
 * Copyright (c) 2025 davidgornshtein@gmail.com
 * Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com
 * 
 * File: tools/reorganize-functions.js
 * File name: reorganize-functions.js
 * Author: davidgornshtein@gmail.com
 * Description: Reorganizes functions into a better directory structure based on their purpose
 * Purpose: Creates a logical project structure with proper categorization
 * Patterns: Pattern matching, AST analysis, directory organization
 */

const fs = require('fs').promises;
const path = require('path');
const { parse } = require('@babel/parser');
const glob = require('glob');
const chalk = require('chalk').default || require('chalk');

// Directory structure mapping
const DIRECTORY_STRUCTURE = {
    'ui': {
        'components': { maxFiles: 100, patterns: ['createElement', 'useState', 'useEffect', 'Component', 'render', 'props', 'JSX'] },
        'hooks': { maxFiles: 100, patterns: ['use[A-Z]', 'useState', 'useCallback', 'useMemo', 'useRef'] },
        'styles': { maxFiles: 100, patterns: ['style', 'css', 'className', 'styled'] }
    },
    'observables': {
        'operators': { maxFiles: 100, patterns: ['operator', 'pipe', 'map', 'filter', 'merge'] },
        'core': { maxFiles: 100, patterns: ['Observable', 'Subject', 'BehaviorSubject'] },
        'utilities': { maxFiles: 100, patterns: ['subscribe', 'unsubscribe', 'combineLatest'] }
    },
    'utils': {
        'array': { maxFiles: 100, patterns: ['array', 'forEach', 'map', 'filter', 'reduce', 'slice', 'splice'] },
        'string': { maxFiles: 100, patterns: ['string', 'charAt', 'substring', 'toLowerCase', 'toUpperCase', 'split'] },
        'object': { maxFiles: 100, patterns: ['Object\\.', 'hasOwnProperty', 'defineProperty', 'keys', 'values'] },
        'type': { maxFiles: 100, patterns: ['typeof', 'instanceof', '^is[A-Z]', '^has[A-Z]', 'check'] },
        'math': { maxFiles: 100, patterns: ['Math\\.', 'random', 'floor', 'ceil', 'round', 'max', 'min'] },
        'date': { maxFiles: 100, patterns: ['Date', 'getTime', 'toISOString', 'timestamp'] },
        'general': { maxFiles: 100, patterns: [] } // Catch-all
    },
    'dom': {
        'manipulation': { maxFiles: 100, patterns: ['createElement', 'appendChild', 'removeChild', 'innerHTML'] },
        'events': { maxFiles: 100, patterns: ['addEventListener', 'removeEventListener', 'Event', 'dispatch'] },
        'traversal': { maxFiles: 100, patterns: ['querySelector', 'getElementById', 'parentNode', 'childNodes'] },
        'attributes': { maxFiles: 100, patterns: ['getAttribute', 'setAttribute', 'classList', 'style\\.'] }
    },
    'api': {
        'http': { maxFiles: 100, patterns: ['fetch', 'XMLHttpRequest', 'axios', 'request', 'response'] },
        'graphql': { maxFiles: 100, patterns: ['graphql', 'query', 'mutation', 'subscription', 'apollo'] },
        'rest': { maxFiles: 100, patterns: ['REST', 'endpoint', 'api/', 'GET', 'POST', 'PUT', 'DELETE'] },
        'websocket': { maxFiles: 100, patterns: ['WebSocket', 'socket', 'io\\.', 'emit', 'on\\('] }
    },
    'crypto': {
        'hashing': { maxFiles: 100, patterns: ['hash', 'sha', 'md5', 'digest', 'crypto'] },
        'encoding': { maxFiles: 100, patterns: ['encode', 'decode', 'base64', 'btoa', 'atob'] },
        'keys': { maxFiles: 100, patterns: ['key', 'secret', 'token', 'jwt', 'sign', 'verify'] }
    },
    'data': {
        'processing': { maxFiles: 100, patterns: ['process', 'transform', 'convert', 'parse', 'serialize'] },
        'validation': { maxFiles: 100, patterns: ['validate', 'valid', 'check', 'verify', 'ensure'] },
        'storage': { maxFiles: 100, patterns: ['storage', 'localStorage', 'sessionStorage', 'cookie', 'cache'] },
        'models': { maxFiles: 100, patterns: ['model', 'schema', 'entity', 'dto', 'record'] }
    },
    'config': {
        'settings': { maxFiles: 100, patterns: ['config', 'setting', 'option', 'preference', 'env'] },
        'initialization': { maxFiles: 100, patterns: ['init', 'setup', 'bootstrap', 'configure', 'register'] },
        'providers': { maxFiles: 100, patterns: ['provider', 'service', 'factory', 'singleton'] }
    },
    'testing': {
        'mocks': { maxFiles: 100, patterns: ['mock', 'stub', 'spy', 'fake', 'jest\\.'] },
        'fixtures': { maxFiles: 100, patterns: ['fixture', 'testData', 'sample', 'example'] },
        'assertions': { maxFiles: 100, patterns: ['assert', 'expect', 'should', 'toBe', 'toEqual'] }
    },
    'errors': {
        'handlers': { maxFiles: 100, patterns: ['catch', 'error', 'exception', 'throw', 'try'] },
        'types': { maxFiles: 100, patterns: ['Error', 'Exception', 'Fault', 'Failure'] },
        'logging': { maxFiles: 100, patterns: ['log', 'console', 'debug', 'warn', 'trace'] }
    },
    'async': {
        'promises': { maxFiles: 100, patterns: ['Promise', 'then', 'catch', 'finally', 'resolve', 'reject'] },
        'generators': { maxFiles: 100, patterns: ['function\\*', 'yield', 'generator', 'next'] },
        'async-await': { maxFiles: 100, patterns: ['async', 'await', 'asyncFunction'] }
    },
    'patterns': {
        'factories': { maxFiles: 100, patterns: ['^create[A-Z]', 'factory', 'builder', 'make'] },
        'accessors': { maxFiles: 100, patterns: ['^get[A-Z]', '^set[A-Z]', 'accessor', 'getter', 'setter'] },
        'handlers': { maxFiles: 100, patterns: ['^handle[A-Z]', '^on[A-Z]', 'handler', 'listener'] },
        'processors': { maxFiles: 100, patterns: ['^process[A-Z]', 'processor', 'transform', 'convert'] }
    },
    'browser': {
        'performance': { maxFiles: 100, patterns: ['performance', 'timing', 'measure', 'mark'] },
        'navigation': { maxFiles: 100, patterns: ['location', 'history', 'pushState', 'navigate'] },
        'window': { maxFiles: 100, patterns: ['window\\.', 'screen', 'viewport', 'resize'] }
    },
    'editor': {
        'core': { maxFiles: 100, patterns: ['editor', 'cursor', 'selection', 'range'] },
        'commands': { maxFiles: 100, patterns: ['command', 'action', 'execute', 'undo', 'redo'] },
        'syntax': { maxFiles: 100, patterns: ['highlight', 'syntax', 'token', 'lexer', 'parser'] }
    }
};

// Analyze function content to determine category
async function analyzeFunction(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const fileName = path.basename(filePath);
        
        // Parse the AST for better analysis
        let ast;
        try {
            ast = parse(content, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript', 'decorators-legacy'],
                errorRecovery: true
            });
        } catch (e) {
            // If parsing fails, fall back to string analysis
        }
        
        // Check each category and subcategory
        let bestMatch = { category: 'utils', subcategory: 'general', score: 0 };
        
        for (const [category, subcategories] of Object.entries(DIRECTORY_STRUCTURE)) {
            for (const [subcategory, config] of Object.entries(subcategories)) {
                let score = 0;
                
                // Check patterns
                for (const pattern of config.patterns) {
                    const regex = new RegExp(pattern, 'gm');
                    const matches = content.match(regex);
                    if (matches) {
                        score += matches.length * 2;
                    }
                    
                    // Extra points for filename match
                    const baseFileName = path.basename(fileName, '.js');
                    if (baseFileName.match(new RegExp(pattern))) {
                        score += 5;
                    }
                }
                
                // Special checks for specific categories
                if (category === 'ui' && subcategory === 'components') {
                    if (content.includes('React.createElement') || content.includes('jsx')) {
                        score += 10;
                    }
                }
                
                if (category === 'observables' && content.includes('rxjs')) {
                    score += 10;
                }
                
                if (score > bestMatch.score) {
                    bestMatch = { category, subcategory, score };
                }
            }
        }
        
        return {
            filePath,
            fileName,
            category: bestMatch.category,
            subcategory: bestMatch.subcategory,
            score: bestMatch.score
        };
    } catch (error) {
        console.error(chalk.red(`Error analyzing ${filePath}:`), error.message);
        return {
            filePath,
            fileName: path.basename(filePath),
            category: 'utils',
            subcategory: 'general',
            score: 0
        };
    }
}

// Create directory structure
async function createDirectoryStructure(baseDir) {
    for (const [category, subcategories] of Object.entries(DIRECTORY_STRUCTURE)) {
        for (const subcategory of Object.keys(subcategories)) {
            const dirPath = path.join(baseDir, category, subcategory);
            await fs.mkdir(dirPath, { recursive: true });
        }
    }
}

// Get file counts per directory
function getFileCounts() {
    const counts = {};
    for (const [category, subcategories] of Object.entries(DIRECTORY_STRUCTURE)) {
        counts[category] = {};
        for (const subcategory of Object.keys(subcategories)) {
            counts[category][subcategory] = 0;
        }
    }
    return counts;
}

// Main reorganization function
async function reorganizeFunctions(sourceDir, targetDir) {
    console.log(chalk.blue('Starting function reorganization...'));
    
    // Create directory structure
    await createDirectoryStructure(targetDir);
    
    // Get all JavaScript files
    const files = glob.sync(path.join(sourceDir, '**/*.js'), {
        ignore: ['**/node_modules/**']
    });
    
    console.log(chalk.blue(`Found ${files.length} JavaScript files to reorganize`));
    
    // Analyze and categorize files
    const categorizedFiles = [];
    const fileCounts = getFileCounts();
    
    // Process in batches for better performance
    const batchSize = 100;
    for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize);
        const results = await Promise.all(batch.map(analyzeFunction));
        categorizedFiles.push(...results);
        
        console.log(chalk.gray(`Analyzed ${Math.min(i + batchSize, files.length)}/${files.length} files...`));
    }
    
    // Copy files to new structure
    console.log(chalk.blue('\nCopying files to new structure...'));
    
    const summary = {
        total: files.length,
        categorized: 0,
        errors: 0,
        categoryBreakdown: {}
    };
    
    for (const fileInfo of categorizedFiles) {
        try {
            const { category, subcategory } = fileInfo;
            const config = DIRECTORY_STRUCTURE[category][subcategory];
            
            // Check if directory is full
            if (fileCounts[category][subcategory] >= config.maxFiles) {
                // Create overflow directory
                const overflowNum = Math.floor(fileCounts[category][subcategory] / config.maxFiles) + 1;
                const targetPath = path.join(targetDir, category, `${subcategory}_${overflowNum}`, fileInfo.fileName);
                await fs.mkdir(path.dirname(targetPath), { recursive: true });
                await fs.copyFile(fileInfo.filePath, targetPath);
            } else {
                const targetPath = path.join(targetDir, category, subcategory, fileInfo.fileName);
                await fs.copyFile(fileInfo.filePath, targetPath);
            }
            
            fileCounts[category][subcategory]++;
            summary.categorized++;
            
            // Track category breakdown
            const categoryKey = `${category}/${subcategory}`;
            summary.categoryBreakdown[categoryKey] = (summary.categoryBreakdown[categoryKey] || 0) + 1;
            
        } catch (error) {
            console.error(chalk.red(`Error copying ${fileInfo.fileName}:`), error.message);
            summary.errors++;
        }
    }
    
    // Generate summary report
    console.log(chalk.green('\n✓ Reorganization complete!'));
    console.log('\nSummary:');
    console.log(`Total files: ${summary.total}`);
    console.log(`Successfully categorized: ${summary.categorized}`);
    console.log(`Errors: ${summary.errors}`);
    console.log('\nCategory breakdown:');
    
    // Sort categories by count
    const sortedCategories = Object.entries(summary.categoryBreakdown)
        .sort(([, a], [, b]) => b - a);
    
    for (const [category, count] of sortedCategories) {
        console.log(`  ${category}: ${count} files`);
    }
    
    // Save categorization report
    const reportPath = path.join(targetDir, 'reorganization-report.json');
    await fs.writeFile(reportPath, JSON.stringify({
        timestamp: new Date().toISOString(),
        summary,
        categorizedFiles: categorizedFiles.map(f => ({
            fileName: f.fileName,
            category: f.category,
            subcategory: f.subcategory,
            score: f.score
        }))
    }, null, 2));
    
    console.log(chalk.gray(`\nDetailed report saved to: ${reportPath}`));
}

// Main execution
if (require.main === module) {
    const args = process.argv.slice(2);
    const sourceDir = args[0] || path.join(__dirname, '../src-fully-refactored-final');
    const targetDir = args[1] || path.join(__dirname, '../src-organized');
    
    reorganizeFunctions(sourceDir, targetDir)
        .then(() => {
            console.log(chalk.green('\n✓ All done!'));
            process.exit(0);
        })
        .catch(error => {
            console.error('Fatal error:', error);
            process.exit(1);
        });
}

module.exports = { analyzeFunction, reorganizeFunctions };