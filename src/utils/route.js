export default {
    validateNamespace(path, namespace) {
        let baseUrl = path.substring(0, path.lastIndexOf('/'));
        let nameReg = new RegExp(namespace + '$', 'g');
        return nameReg.test(baseUrl);
    },
    getRouteFromPath(path) {
        let start = path.lastIndexOf('/');
        let end = path.lastIndexOf('.html');
        end = end > 0 ? end : path.length;
        let route = path.substring(start, end);
        return route.replace(/\.html$/, '');    // compatible with old url which end with .html
    },

    parseQuery(search) {
        let query = {};
        if (search.indexOf('?') > -1) {
            const paramsArray = search.substring(1).split('&');
            paramsArray.forEach(item => {
                let data = item.split('=');
                query[data[0]] = data[1];
            });
        }
        return query;
    }
};
