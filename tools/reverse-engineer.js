const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const espree = require('espree');

const cliFilePath = path.join(__dirname, 'cli.js');
const srcDir = path.join(__dirname, 'src');

const keywordToSubModuleMap = {
    'app': {
        'error': 'errors',
        'warning': 'errors',
        'exception': 'errors',
        'database': 'database',
        'network': 'network',
        'http': 'http',
        'graphql': 'graphql',
        'mongo': 'mongo',
        'mysql': 'mysql',
        'postgres': 'postgres',
        'prisma': 'prisma',
        'trpc': 'trpc',
        'anr': 'anr',
        'stacktrace': 'stacktrace',
        'frame': 'stacktrace',
        'debug': 'debug',
        'warn': 'logger',
        'info': 'logger',
        'log': 'logger',
        'util': 'utils',
        'path': 'path',
        'url': 'url',
        'dom': 'dom',
        'fetch': 'fetch',
        'xhr': 'xhr',
        'history': 'history',
        'instrument': 'instrumentation',
        'report': 'reporting',
        'envelope': 'envelope',
        'rate': 'ratelimit',
        'limit': 'ratelimit',
        'baggage': 'baggage',
        'cookie': 'cookie',
        'context': 'context',
        'module': 'modules',
        'node': 'node',
        'express': 'express',
        'hapi': 'hapi',
        'local': 'local',
        'variables': 'variables',
        'fifo': 'cache',
        'cache': 'cache',
        'promise': 'promise',
        'buffer': 'buffer',
        'wasm': 'wasm',
        'yoga': 'yoga',
    },
    'core': {
        'database': 'database',
        'network': 'network',
        'http': 'http',
        'graphql': 'graphql',
        'mongo': 'mongo',
        'mysql': 'mysql',
        'postgres': 'postgres',
        'prisma': 'prisma',
        'trpc': 'trpc',
        'anr': 'anr',
        'stacktrace': 'stacktrace',
        'frame': 'stacktrace',
        'debug': 'debug',
        'warn': 'logger',
        'info': 'logger',
        'log': 'logger',
        'util': 'utils',
        'path': 'path',
        'url': 'url',
        'dom': 'dom',
        'fetch': 'fetch',
        'xhr': 'xhr',
        'history': 'history',
        'instrument': 'instrumentation',
        'report': 'reporting',
        'envelope': 'envelope',
        'rate': 'ratelimit',
        'limit': 'ratelimit',
        'baggage': 'baggage',
        'cookie': 'cookie',
        'context': 'context',
        'module': 'modules',
        'node': 'node',
        'express': 'express',
        'hapi': 'hapi',
        'local': 'local',
        'variables': 'variables',
        'fifo': 'cache',
        'cache': 'cache',
        'promise': 'promise',
        'buffer': 'buffer',
        'wasm': 'wasm',
        'yoga': 'yoga',
    }
};

function getSubModuleName(functionCode) {
    for (const moduleName in keywordToSubModuleMap) {
        const subMap = keywordToSubModuleMap[moduleName];
        for (const keyword in subMap) {
            if (functionCode.toLowerCase().includes(keyword)) {
                return { module: moduleName, submodule: subMap[keyword] };
            }
        }
    }
    return { module: 'unknown', submodule: 'general' };
}

function processCliFile() {
    const cliContent = fs.readFileSync(cliFilePath, 'utf-8');
    const ast = parser.parse(cliContent, {
        sourceType: 'module',
        plugins: ['jsx', 'topLevelAwait'],
        errorRecovery: true,
    });

    traverse(ast, {
        enter(nodePath) {
            let functionNode;
            let functionName;

            if (nodePath.isFunctionDeclaration()) {
                functionNode = nodePath.node;
                functionName = functionNode.id ? functionNode.id.name : null;
            } else if (nodePath.isVariableDeclarator() && nodePath.node.init && (nodePath.node.init.type === 'FunctionExpression' || nodePath.node.init.type === 'ArrowFunctionExpression')) {
                functionNode = nodePath.node.init;
                functionName = nodePath.node.id.name;
            }

            if (functionName && functionNode) {
                const functionCode = generate(functionNode).code;
                
                try {
                    espree.parse(functionCode, { ecmaVersion: 'latest', sourceType: 'module' });
                    const { module, submodule } = getSubModuleName(functionCode);
                    
                    const subModuleDir = path.join(srcDir, module);
                    if (!fs.existsSync(subModuleDir)) {
                        fs.mkdirSync(subModuleDir, { recursive: true });
                    }

                    const functionFilePath = path.join(subModuleDir, `${functionName}.js`);
                    if (!fs.existsSync(functionFilePath)) {
                        const startLine = functionNode.loc.start.line;
                        const endLine = functionNode.loc.end.line;
                        const params = functionNode.params.map(p => p.name).join(', ');

                        const jsdoc = `/**
 * @description Extracted from cli.js, lines ${startLine}-${endLine}.
 * @param {${params}}
 * @returns {any}
 * Original name: ${functionName}
 */`;

                        const codeToSave = `${jsdoc}\n${functionCode}\n`;
                        fs.writeFileSync(functionFilePath, codeToSave);
                        console.log(`Extracted function ${functionName} to ${functionFilePath}`);
                    }
                } catch (e) {
                    // Not a valid function, skip it
                }
            }
        }
    });
}

processCliFile();
console.log('Reverse engineering complete.');
