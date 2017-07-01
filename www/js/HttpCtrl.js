angular.module('starter.http', [])
    .controller('HttpCtrl', function ($scope, $http, $q, utils) {
        var host = 'http://192.168.0.15:8000/';

        $scope.places = [];
        $scope.placeSelected = {};

        $scope.getAllPlaces = function () {
            utils.showLoading();

            sendHttpRequest(host + 'places', {}, 'GET')
                .then(function (data) {
                    $scope.places = data;
                    utils.popupUrl('Places', 'templates/places_popup.html',
                        $scope);
                })
                .catch(function (error) {
                    utils.popup('ERROR', error);
                })
                .finally(function () {
                    utils.hideLoading();
                });
        };

        $scope.getPlaceById = function () {
            utils.showLoading();

            sendHttpRequest(host + 'places', {}, 'GET')
                .then(function (data) {
                    $scope.places = data;

                    if ($scope.places.length > 0) {
                        $scope.placeSelected = $scope.places[0];
                        utils.popupUrl('Place details',
                            'templates/place_detail_popup.html', $scope);
                    } else {
                        utils.popup('ERROR', 'No hay places');
                    }
                })
                .catch(function (error) {
                    utils.popup('ERROR', error);
                })
                .finally(function () {
                    utils.hideLoading();
                });
        };

        function sendHttpRequest(url, data, method) {
            var defered = $q.defer();
            var promise = defered.promise;

            var httpRequest = {};

            if (method == 'POST' || method == 'PUT' || method == 'DELETE') {
                httpRequest = createPostPutDelHttpRequest(url, data, method);
            } else if (method == 'GET') {
                httpRequest = createGetHttpRequest(url, data);
            }

            $http(httpRequest)
                .then(function successCallback(response) {
                    setTimeout(function () {
                        defered.resolve(response.data);
                    }, 1000);
                }, function errorCallback(response) {
                    setTimeout(function () {
                        if (response.status == -1) {
                            defered.reject('Error de conexión');
                        } else {
                            defered.reject('Error [' + response.status + ']');
                        }
                    }, 1000);
                });

            return promise;
        }

        function createPostPutDelHttpRequest(url, data, method) {
            return {
                method: method,
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "="
                            + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: data,
                timeout: 3000
            };
        }

        function createGetHttpRequest(url, data) {
            return {
                method: 'GET',
                url: url,
                headers: {'Content-Type': undefined},
                data: data,
                timeout: 3000
            };
        }
    });