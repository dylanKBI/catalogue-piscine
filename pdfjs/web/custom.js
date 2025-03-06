$(function () {
    PDFViewerApplication.preferences.set("externalLinkTarget", 2);
    $(document).on('click', 'a', function () {
        let url = $(this).attr('href');
        let e = url.split(':', 2);
        let protocol = e[0].toLowerCase();
        let content = e[1];
        if (['http', 'https', 'file', 'mailto', 'ftp'].indexOf(protocol) >= 0) {
            return true;
        }

        openCustomLink(protocol, content, url);
        return false;
    });
});

function openCustomLink(protocol, content, url) {
    var fluidbook = window.parent.fluidbook;
    if (protocol === 'cart') {
        window.parent.location.hash = '#/cart/add/' + content;
    }
}
