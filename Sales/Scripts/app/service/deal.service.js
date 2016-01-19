'use strict';
angular.module('AdminApp').factory('DealService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var urlBase = serviceBase + 'api/deal/';
        var dataFactory = {};
        dataFactory.addNewDeal = function (deal) {
            return $http.post(urlBase, deal );
        };

         
        dataFactory.getDeals = function () {
            return $http.get(urlBase);
        };
         
        dataFactory.updateDeal = function (deal) {
            return $http.put(urlBase,  deal);
        };

        dataFactory.deleteDeal = function (deal_id) {
            return $http.delete(urlBase + deal_id + '/');
        };
    //file upload reference
    //https://jsfiddle.net/JeJenny/ZG9re/

        dataFactory.uploadFile = function (file) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post('api/file', fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
            .success(function () {
            })
            .error(function () {
            });
        }
        return dataFactory;
    }
]);
