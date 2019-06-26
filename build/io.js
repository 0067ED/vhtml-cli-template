module.exports = function(server){
    let io = require('socket.io')(server, {
        path: '/call/websocket'
    });
    let path = require('path');
    let url = require('url');

    setInterval(function() {
        var requests = [];
        for (var i in io.sockets.sockets) {
            var socket = io.sockets.sockets[i];
            requests.push(socket)
        }
        if (requests.length > 0) {
            doRequest(requests);
        }
    }, 1000)

    io.on('connection', function(socket){
        socket.on('request', function(req){
            /*
                {
                    url: 'xxx',
                    param: 'xxxx'
                }
            */
            req = [].concat(req);
            socket._req = req;
            doRequest([socket]);
        });
    });

    let prefix = '/call'
    function doRequest(requestArray){
        requestArray.forEach(function(socket) {
            var reqs = socket._req;
            let data;
            try {
                data = {};
                reqs.forEach(function(req){
                    let pathname = req.url;
                    let filePath = path.normalize('../dev/mock/' + prefix + pathname);
                    delete require.cache[require.resolve(filePath)];
                    data[pathname] = require(filePath);
                    if (typeof data[pathname] === 'function') {
                        data[pathname] = data[pathname](req.param);
                    }
                })

            } catch (e) {
                data = {
                    msg: '缺少mock数据',
                }
            }
            socket.emit('response', data)
        })


    };
}
