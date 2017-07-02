angular.module('starter.http', [])
    .controller('HttpCtrl', function ($scope, $http, $q, utils, $httpParamSerializerJQLike) {
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
                        return sendHttpRequest(host + 'places/'
                            + $scope.places[0].id, {hola: 'hola'}, 'GET');
                    } else {
                        var defered = $q.defer();
                        defered.reject('No hay places');
                        return defered.promise;
                    }
                })
                .then(function (data) {
                    $scope.placeSelected = data;

                    utils.popupUrl('Place details',
                        'templates/place_detail_popup.html', $scope);
                })
                .catch(function (error) {
                    utils.popup('ERROR', error);
                })
                .finally(function () {
                    utils.hideLoading();
                });
        };

        $scope.insertPlace = function () {
            utils.showLoading();

            var placeData = {
                nombre: 'LABSOL',
                latitud: 22.00002,
                longitud: 22.00002
            };

            sendHttpRequest(host + 'places', placeData, 'POST')
                .then(function (data) {
                    utils.popup('OK', 'Place insertado correctamente')
                })
                .catch(function (error) {
                    utils.popup('ERROR', error);
                })
                .finally(function () {
                    utils.hideLoading();
                });
        };

        $scope.updatePlace = function () {
            utils.showLoading();

            sendHttpRequest(host + 'places', {}, 'GET')
                .then(function (data) {
                    $scope.places = data;

                    var placeData = {
                        nombre: 'COZCyT'
                    };

                    if ($scope.places.length > 0) {
                        return sendHttpRequest(host + 'places/'
                            + $scope.places[0].id, placeData, 'PUT');
                    } else {
                        var defered = $q.defer();
                        defered.reject('No hay places');
                        return defered.promise;
                    }
                })
                .then(function (data) {
                    utils.popup('Place', 'Place actualizado correctamente');
                })
                .catch(function (error) {
                    utils.popup('ERROR', error);
                })
                .finally(function () {
                    utils.hideLoading();
                });
        };

        $scope.deletePlace = function () {
            utils.showLoading();

            sendHttpRequest(host + 'places', {}, 'GET')
                .then(function (data) {
                    $scope.places = data;

                    if ($scope.places.length > 0) {
                        return sendHttpRequest(host + 'places/'
                            + $scope.places[0].id, {}, 'DELETE');
                    } else {
                        var defered = $q.defer();
                        defered.reject('No hay places');
                        return defered.promise;
                    }
                })
                .then(function (data) {
                    utils.popup('Place', 'Place eliminado correctamente');
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
                    }, 0);
                }, function errorCallback(response) {
                    setTimeout(function () {
                        if (response.status == -1) {
                            defered.reject('Error de conexión');
                        } else {
                            defered.reject('Error [' + response.status + ']');
                        }
                    }, 0);
                });

            return promise;
        }

        function createPostPutDelHttpRequest(url, data, method) {
            return {
                method: method,
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializerJQLike(data),
                timeout: 3000
            };
        }

        function createGetHttpRequest(url, data) {
            return {
                method: 'GET',
                url: url,
                headers: {'Content-Type': undefined},
                params: data,
                timeout: 3000
            };
        }
    });