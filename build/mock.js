"use strict";
let path = require('path');
let url = require('url');
let Validator = require('jsonschema').Validator;
let Mock = require('mockjs');
const os = require('os');
const isWindows = os.type().indexOf('Windows') >= 0;
const pathSep = isWindows ? '\\' : '/';

module.exports = function (req, res, next) {
    let regTest = /^\/(ea|call|cl|examples|mng|cc|tp|coupon|mobile|partner)\//;
    let pathname = url.parse(req.url).pathname;
    // let filePath = path.resolve('../mock', pathname);


    function response(data, body) {
        // console.log(data);
        try {
            res.status(data.statusCode).set({
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'application/json'
            })
            // res.setHeader(''+data.statusCode, {
            //     'Content-Length': Buffer.byteLength(body),
            //     'Content-Type': 'application/json'
            // });
            res.end(body);
        } catch (e) {
            console.log(e);
            return;
        }
    }

    function getDataByBid(bid, cid) {
        var filePath = path.normalize('../dev/mock/reportapi/' + bid + (cid ? '_' + cid : ''));
        // console.log('testing2:' + filePath);
        delete require.cache[require.resolve(filePath)];
        return Mock.mock(require(filePath));
    }

    console.log("file:",pathname);
    // console.log(pathname);
    if (regTest.test(pathname)) {

        // pathname = pathname.replace(regTest, '');
        let filePath = path.normalize('../dev/mock/' + pathname);
        // let filePath = path.normalize('../mock/' + pathname);
        try {
            if (pathname.indexOf('/report/pc/ajax') > 0) {
                // console.log(pathname);
                // console.log(req);
                var list = req.body.req;
                list = typeof list === 'string' ? JSON.parse(list) : list;
                var resultList = [];
                var bodydata = getDataByBid(list[0].bid);
                // console.log(bodydata)
                for (var i = 0; i < list.length; i++) {
                    let cidData = getDataByBid(list[i].bid, list[i].cid);
                    if (typeof cidData === 'function') {
                        cidData = cidData(list[i]);
                    }
                    resultList.push(cidData);
                }
                bodydata.body = bodydata.body || {};
                bodydata.body.rsp = resultList;
                setTimeout(function () {
                    response(bodydata, JSON.stringify(bodydata.body));
                }, 300);
                return ;
            }

            const fs = require('fs');
            const path = require('path');
            let resolvedPath = path.resolve(__dirname, filePath);
            let id;
            let schemaValidation = false;
            if ((filePath.indexOf(`${pathSep}call`) >= 0) && !(fs.existsSync(resolvedPath)
                || fs.existsSync(resolvedPath + '.js')
                || fs.existsSync(resolvedPath + '.json'))) {
                id = filePath.substring(filePath.lastIndexOf(`${pathSep}`) + 1);
                filePath = filePath.substring(0, filePath.lastIndexOf(`${pathSep}`));
                resolvedPath = path.resolve(__dirname, filePath);
            }
            if (fs.existsSync(resolvedPath)
                && fs.statSync(resolvedPath).isDirectory()) {
                schemaValidation = true;
                if (req.method === 'GET') {
                    filePath += '/read';
                }
                else if (req.method === 'POST') {
                    filePath += '/create';
                }
                else if (req.method === 'PUT') {
                    filePath += '/update';
                }
                else if (req.method === 'DELETE') {
                    filePath += '/delete';
                }
            }
            delete require.cache[require.resolve(filePath)];
            let data = require(filePath);
            // if(typeof data === "function"){
            //     data=data(req);
            // }
            // console.log('mocking:' + filePath);
            if (typeof data === 'function') {
                if (req.method === 'GET' || req.method === 'DELETE') {
                    if (id !== undefined) {
                        req.url += '&id=' + id;
                    }
                    data = data(url.parse(req.url, true).query);
                    // Mock.mock('/\/call\/metketing\/boardmsgs/', 'get', data(url.parse(req.url, true).query));
                }
                else if (req.method === 'POST' || req.method === 'PUT') {
                    if (id !== undefined) {
                        req.body.id = id;
                    }
                    data = data(req.body);
                }
            }

            if (data.useMock !== false) {
                data = Mock.mock(data);
            }
            // console.log('mocking:' + JSON.stringify(data));
            // console.log('schemaValidation: ' + schemaValidation);
            if (schemaValidation) {
                const v = new Validator();
                let dataSchema = {
                    "id": "/ResponseData",
                    "type": "object",
                    "properties": {
                        "startDate": {"type": "integer"},
                        "endDate": {"type": "integer"},
                        "appid": {"type": "string"},
                        "domain": {"type": "string"},
                        "index": {"type": "integer"},
                        "count": {"type": "integer"},
                        "total": {"type": "integer"},
                        "pv": {"type": "integer"},
                        "uv": {"type": "integer"},
                        "vv": {"type": "integer"},
                    }
                };
                let bodySchema = {
                    "id": "/ResponseBody",
                    "type": "object",
                    "properties": {
                        "code": {"type": "integer"},
                        "msg": {"type": "string"},
                        "data": {"$ref": "/ResponseData"},
                        "extra": {"type": "object"}
                    },
                    "additionalProperties": false
                };
                let responseSchema = {
                    "id": "/Response",
                    "type": "object",
                    "properties": {
                        "statusCode": {"type": "integer"},
                        "body": {"$ref": "/ResponseBody"}
                    }
                };
                v.addSchema(dataSchema, '/ResponseData');
                v.addSchema(bodySchema, '/ResponseBody');
                let validation = v.validate(data, responseSchema);
                if (validation && validation.errors && validation.errors.length > 0) {
                    console.log('\n****************************** validation error *******************************:\n'
                        + 'error file: ' + filePath + '\n'
                        + 'error message: ' + validation.errors + '\n');
                }
                else {
                    let body = JSON.stringify(data.body);
                    setTimeout(function () {
                        response(data, body);
                    }, 300);
                }
            }
            else {
                let body = JSON.stringify(data.body);
                setTimeout(function () {
                    response(data, body);
                }, 300);
            }
        } catch (e) {
            console.log(e);
            let data = {
                statusCode: 500,
                msg: '缺少mock数据',
                body: ''
            }
            response(data, data.body);
        }
    }
    else {
        next();
    }
};
