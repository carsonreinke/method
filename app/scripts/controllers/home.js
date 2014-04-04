'use strict';

module.exports = [
  '$scope',
  'api',
  function ($scope, api) {
    // Slider
    api.slider.get().then(function(response){
        $scope.slider = response.data;
      });

    $scope.interval = 4000;

    $scope.featuredHomeItems = {
      product1: {
        linkTo: 'product1/p/1'
      },
      product2: {
        linkTo: 'product2/p/2'
      },
      category1: {
        linkTo: 'category1/c/1'
      },
      category2: {
        linkTo: 'category2/c/2'
      },
      category3: {
        linkTo: 'category3/c/3'
      },
      category4: {
        linkTo: 'category4/c/4'
      }
    };

    api.relatedproducts.get({ productCode: 123, filter: 'relatedProducts', pageNumber: 1, pageSize: 10 }).then(function (response) {
      $scope.relatedProducts = response.data;
    });
  }
];