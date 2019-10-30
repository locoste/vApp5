var app = angular.module("app", ["ngTreant"]);

angular.module('ngTreant', [])
.directive('treantGraph', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        template: '<div class="chart" id="example-graph"></div>',
        link: linkFn
    };

    function linkFn(scope, element, attrs, ctrlFn) {
        var tree = new Treant(scope.data);
    }
});