angular.module('starter.desorden', [])
    .controller('DesordenCtrl', function ($scope) {
        $scope.data = {
            n: 10
        };

        $scope.steps = [];

        $scope.calcular = function () {
            $scope.steps = [];

            var res = 0;

            for (var i = 1; i <= $scope.data.n; i++) {
                res = sumarNumeros(res, i);
                $scope.steps.push({value: res});
            }
        };

        function sumarNumeros(a, b) {
            var suma = 0;

            setTimeout(function () {
                suma = a + b;
            }, 1000);

            return suma;
        }
    });