importScripts('../../stand/axios.min.js', '../../polyfills/promise.min.js');

onmessage = function (e) {
    var data = e.data;

    var response = {'request': data};
    var callback = function () {
        postMessage(response);
    };

    switch (data.action) {
        case 'loadImage':
            response.return = loadImage('../../../../' + data.src, data.width, data.height, data.type, null, callback);
            break;
        default:
            break;
    }
};

loadImage = function (src, width, height, type, callback) {

    var callbackCalled = false;

    var callCallback = function () {
        setTimeout(function () {
            if (!callbackCalled) {
                callbackCalled = true;
                callback();
            }
        }, 10);
    };

    axios.get(src, {
        responseType: 'arraybuffer'
    }).then(function (response) {
        var res = '<img crossorigin="anonymous" ';
        if (width != undefined && width != null) {
            res += 'width="' + width + '" ';
        }
        if (height != undefined && height != null) {
            res += 'height="' + height + '" ';
        }
        if (type != undefined && type != null) {
            res += 'type="' + type + '" ';
        }
        res += 'src="data:image/png;base64,' + new Buffer(response.data, 'binary').toString('base64') + '">';
        response.img = res;
    }).catch(function (error) {
        // handle error
        console.log(error);
    }).then(function () {
        console.log('always executed');
        // always executed
    });

    // img.addEventListener('load', function () {
    //     callCallback();
    // });
    // img.addEventListener('error', function () {
    //     callCallback();
    // });
    // img.src = src;
    // if (width != undefined && width != null) {
    //     img.width = width;
    // }
    // if (height != undefined && height != null) {
    //     img.height = height;
    // }
    // if (type != undefined && type != null) {
    //     img.type = type;
    // }
    // if (img.complete || img.readyState === 'complete' || img.readyState === 4) {
    //     callCallback();
    // }
    // return img;
}