angular.module('starter.promises', [])
    .controller('PromisesCtrl', function ($scope, $q) {
        $scope.data = {
            n: 10
        };

        $scope.steps = [];

        var res = 0;

        $scope.calcular = function (iteracion) {
            if(iteracion == 1) {
                $scope.steps = [];
                res = 0;
            }

            sumarNumeros(res, iteracion).then(function () {
                $scope.steps.push({value: res});
                if (iteracion < $scope.data.n) {
                    $scope.calcular(iteracion + 1);
                }
            });
        };

        function sumarNumeros(a, b) {
            var defered = $q.defer();
            var promise = defered.promise;

            setTimeout(function () {
                res = a + b;
                defered.resolve();
            }, 0);

            return promise;
        }
    });