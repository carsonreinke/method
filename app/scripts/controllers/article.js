/*global angular */

/**
 * @ngdoc function
 * @name methodApp.controller:ArticleCtrl
 * @description
 * # ArticleCtrl
 * Controller of the methodApp
 */

angular.module('Volusion.controllers')
    .controller('ArticleCtrl', ['$rootScope', '$scope', '$templateCache', '$routeParams', 'vnApi',
        function ($rootScope, $scope, $templateCache, $routeParams, vnApi) {

            'use strict';

            var article;

            //TODO: unknown slug will return 404 ... need to figure out how to deal with it
//            vnApi.Article().get({ slug: $routeParams.slug }).$promise
            vnApi.Article().get({ slug: 'how-do-i-return-an-item' }).$promise
                .then(function (response) {
                    $scope.article = response.data;

                    $rootScope.seo = angular.extend($rootScope.seo || {}, article.seo);
                });
        }
    ]);