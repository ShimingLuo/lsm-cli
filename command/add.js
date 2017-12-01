/**
 * author: GavinLuo
 * site: https://gavinluo.cn/
 * date: 2017/11/30 15:57
 */
'use strict';
const { prompt } = require('inquirer');
const { writeFile } = require('fs');
const chalk = require('chalk');

let tpList = require(`${__dirname}/../templates`);

const question = [
    {
        type: 'input',
        name: 'name',
        message: 'Set the custom name of the template:',
        validate (val) {
            if (tpList[val]) {
                return 'Template is existed!';
            } else if (val === '') {
                return 'Name is required!';
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'place',
        message: 'Owner/name of the template:',
        validate (val) {
            if (val !== '') {
                return true;
            }
            return 'Link is required!';
        }
    },
    {
        type: 'input',
        name: 'branch',
        message: 'Branch of the template:',
        default: 'master'
    },
    {
        type: 'input',
        name: 'description',
        message: 'description:',
        default: '---'
    }
];

module.exports = prompt(question).then(({ name, place, branch, description }) => {
    tpList[name] = {};
    tpList[name]['owner/name'] = place;
    tpList[name]['branch'] = branch;
    tpList[name]['description'] = description;

    // JSON.stringify(tpList, null, 2) 序列化
    writeFile(`${__dirname}/../templates.json`, JSON.stringify(tpList, null, 2), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
        console.log(chalk.green('Add template successfully！'));
        console.log(tpList);
        process.exit();
    });
});
