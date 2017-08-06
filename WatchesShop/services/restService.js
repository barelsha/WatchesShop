angular.module('myApp')
    .service('restService', restService);

restService.$inject = ['$http'];

function restService ($http) {
    this.Get = function (url, callback) {
        return $http.get(url).then(function (res) {
            var data =  res.data;
            return callback(data);
        },
            handleError('Error get'));
    };
    //--------------------------------------------------------------------------------------------------
    this.Create = function(url, data) {
        var jsonObj = angular.toJson(data);
        return $http.post(url, data).then(handleSuccess, handleError('Error creating'));
    };
    //--------------------------------------------------------------------------------------------------
    this.Post = function(url, data, callback) {
        return $http.post(url, data).then(function (res) {
                var data =  res.data;
                return callback(data);
            },
            handleError('Error get'));
    };
    //--------------------------------------------------------------------------------------------------
    this.Update = function(url, data) {
        return $http.put(url, data).then(handleSuccess, handleError('Error updating'));
    };
    //--------------------------------------------------------------------------------------------------
    this.Delete = function(url) {
        return $http.delete(url).then(handleSuccess, handleError('Error deleting'));
    };
    //--------------------------------------------------------------------------------------------------
    function handleSuccess(res) {
        var data =  res.data;
        return data;
    };
    //--------------------------------------------------------------------------------------------------
    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    };
    //--------------------------------------------------------------------------------------------------
}