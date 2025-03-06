importScripts('../../stand/axios.min.js', '../../polyfills/promise.min.js');

onmessage = function (e) {
    var time = new Date().getTime();
    e.data.matomo='4';
    e.data.offset = Math.round((time - e.data.time) / 1000);
    var url = 'https://stats.fluidbook.com/stats2.php?' + Object.keys(e.data).reduce(function (a, k) {
        a.push(k + '=' + encodeURIComponent(e.data[k]));
        return a
    }, []).join('&');
    axios.get(url);
    postMessage('');
}