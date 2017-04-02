import 'whatwg-fetch';

const Api = {
    call: function (url,key,lat,lon,metric,callbackSuccess,callbackError) {
        let fullUrl = url + 'lat=' + lat + '&lon=' + lon + '&apikey=' + key +'&units=' + metric;
        fetch(fullUrl, {
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
