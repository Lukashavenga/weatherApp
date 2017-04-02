const Api = {
    call: function (url,callbackSuccess,callbackError) {
        fetch(url, {
            method: 'GET'
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            callbackSuccess(json);
        }).catch(function(ex) {
            callbackError(ex);
        })
    }
};

export default Api;
