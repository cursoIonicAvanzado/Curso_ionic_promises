angular.module('starter.services', [])
    .service('utils', function ($ionicPopup, $ionicLoading) {
        this.popup = function (title, template) {
            $ionicPopup.alert({
                title: title,
                template: template
            });
        };

        this.popupUrl = function (title, templateUrl, myScope) {
            $ionicPopup.alert({
                title: title,
                templateUrl: templateUrl,
                scope: myScope
            });
        };

        this.showLoading = function () {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>' +
                '<p>Cargando</p>',
                animation: 'fade-in'
            });
        };

        this.hideLoading = function () {
            $ionicLoading.hide();
        }
    });