let ajax = (data) => {
    var xhr = new XMLHttpRequest();

    if (data.url.indexOf('?') >= 0) {
        xhr.open(data.type, data.url + '&time=' + (new Date()).getTime());
    } else {
        xhr.open(data.type, data.url + '?time=' + (new Date()).getTime());
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 && data.done) {
                data.done(xhr.responseText);
            } else {
                console.error('Ajax Error: ', xhr.status);
            }
        }
    }

    if (data.before) {
        data.before();
        xhr.send();
    } else {
        xhr.send();
    }
}

export default ajax;