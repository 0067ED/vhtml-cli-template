let route = [];
/*eslint-disable */

let components = {
    "back": "http://localhost:8964/examples/pages/index/back",
    "export": "http://localhost:8964/examples/pages/index/export",
    "grid": "http://localhost:8964/examples/pages/index/grid",
    "column-filter": "http://localhost:8964/examples/pages/index/column-filter",
    "chart-tab": "http://localhost:8964/examples/pages/index/chart-tab",
    "domain-select": "http://localhost:8964/examples/pages/index/domain-select",
    "action": "http://localhost:8964/examples/pages/index/action",
    "action-column": "http://localhost:8964/examples/pages/index/action-column",
    "common-select": "http://localhost:8964/examples/pages/index/common-select",
    "report": "http://localhost:8964/examples/pages/index/report",
    "editor": "http://localhost:8964/examples/pages/index/editor",
    "img-item": "http://localhost:8964/examples/pages/index/img-item",
};

/*eslint-enable */

for (let component in components) {
    if (!components.hasOwnProperty(component)) {
        continue;
    }
    route.push({
        path: '/' + component,
        name: '',
        component: require('../../../components/' + component + '/example')
    });
}

export default route;
