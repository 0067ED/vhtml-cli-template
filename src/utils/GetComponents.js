/**
 * 本方法用于从 src/components 中读取所有组件的信息，组织为列表
 */
const fs = require('fs');
const path = require('path');

module.exports = () => {
    let list = [];
    let basePath = path.resolve(__dirname, '../components');
    let dirs = fs.readdirSync(basePath);
    dirs.map(dn => {
        let cmptp = path.resolve(basePath, dn);
        let stat = fs.statSync(cmptp);

        if (stat.isDirectory) {
            // 检查 package.json
            let packagePath = path.resolve(cmptp, 'package.json');
            let hasExample = fs.existsSync(packagePath);
            let packageJson = {};
            let description = '';
            let version = '';

            if (hasExample) {
                packageJson = require(packagePath);
                description = packageJson.description || '无说明';
                version = packageJson.version || '';
            }
            else {
                description = '缺少 package.json';
            }
            list.push({
                name: dn,
                hasExample,
                version,
                package: packageJson,
                description
            });
        }
    });
    return list;
};
