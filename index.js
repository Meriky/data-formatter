'use strict';

const cloneDeep = require('clone-deep'); // data: 输入的数据

// schema: 输入的数据schema
// debug: 调试模式
module.exports = function dataFormatter(data, schema, debug) {
    if (!schema instanceof Object || schema === {}) {
        return data;
    }
    const output = cloneDeep(data);
    return formatRecursion(output, schema, 0, debug);
};

function formatArray(currentTree, currentSchema, depth, debug) {
    const currentSchemaKey = Object.keys(currentSchema)[0];
    const arraySchema = currentSchema[currentSchemaKey];
    const arraySchemaKey = Object.keys(arraySchema);

    const { key, type, eleType } = keySplitInfo(currentSchemaKey, debug);

    let arrayElemNum = 0;
    if (keys.length !== 1) {
        // 非法输入，filterItem应为single key object
    } else {
        arrayElemNum = arraySchemaKey[0]; 
    }

    const currentTreeNode = currentTree[key];


    if (!currentTreeNode instanceof Array) {
        currentTreeNode = [];
    }
    if (currentTreeNode.length === 0) {
        for (let i = 0; i < arrayElemNum; i++) {
            currentTreeNode.push(createArrayElement(arraySchema[arraySchemaKey]), eleType);
        } // 正常Array情况下 1, array为空，2，array元素
    }
}

function createArrayElement(schema, eleType) {
    let element;
    if ()
    return element;
}

// currentTree: 递归树的当前子树
// currentSchema: 规则递归树的当前子树
// depth: 递归层级
// debug: 调试模式
function formatRecursion(currentTree, currentSchema, depth, debug) {
    const schemaKeys = Object.keys(currentSchema);
    schemaKeys.map((item) => {
        const { key, type } = keySplitInfo(item, debug);
        switch (type) {
            case 'number': currentTree[item] = checkingNumber(currentTree[item], currentSchema[item]); break;
            case 'string': currentTree[item] = checkingNumber(currentTree[item], currentSchema[item]) + ''; break;
            case 'undefined': currentTree[item] = undefined; break;
            case 'object':
                if (!currentTree[item] instanceof Object || !currentTree[item]) {
                    currentTree[item] = {};
                }
                formatRecursion(currentTree[item], currentSchema[item], depth + 1, debug);
                break;
            case 'array':
                formatArray(currentTree, item, currentSchema, depth, debug);
                break;
            default:
                // to do -- illegal param 
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
    } else if (keywords.length === 3) {
        return {
            key: keywords[0],
            type: keywords[1],
            eleType: keywords[2],
        };
    } else {
        const type = keywords.pop();
        return {
            key: keywords.join('|'),
            type: type,
        };
    }
}

function checkingNumber(currentItem, currentSchema) {
    return typeof currentItem === 'number' ? currentItem : parseInt(currentSchema, 10);
}

function checkingString(currentItem, currentSchema) {
    return typeof currentItem === 'string' ? currentItem : currentSchema + '';
}

