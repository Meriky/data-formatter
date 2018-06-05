'use strict';

const cloneDeep = require('clone-deep');

// data: 输入的数据
// schema: 输入的数据schema
// debug: 调试模式
module.exports = function dataFormatter(data, schema, debug) {
    if (!schema instanceof Object || schema === {}) {
        return data;
    }
    const output = cloneDeep(data);
    return formatRecursion(output, schema, debug);
};

// currentTree: 递归树的当前子树
// currentSchema: 规则递归树的当前子树
// depth: 递归层级
// debug: 调试模式
function formatRecursion(currentTree, currentSchema, depth, debug) {
    const schemaKeys = Object.keys(currentSchema);
    schemaKeys.map((item) => {
        const { key, type } = keySplitInfo(item, debug);
        switch (type) {
            case 'number': currentTree[item] = parseInt(currentSchema[item]); break;
            case 'string': currentTree[item] = currentSchema[item] + ''; break;
            case 'undefined': currentTree[item] = undefined; break;
            case 'object':
                if (!currentTree[item] instanceof Object || !currentTree[item]) {
                    currentTree[item] = {}; 
                }
                formatRecursion(currentTree[item], currentSchema[item], depth + 1, debug);
                break;
            case 'array': 

        }
    });
}

function keySplitInfo(key, debug) {
    const keywords = key.split('|');
    if (keywords.length === 1) {
        // todo: assert no type
        return {
            key: keywords[0],
            type: '',
        };
    } else if (keywords.length === 2) {
        return {
            key: keywords[0],
            type: keywords[1],
        };
    } else {
        const type = keywords.pop();
        return {
            key: keywords.join('|'),
            type: type,
        };
    }
}
