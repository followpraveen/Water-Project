'use strict';

var myApp = angular.module('myApp.product', ['ngRoute', 'ui.bootstrap']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(tkn);
myApp.run(function ($http) {
    $http.defaults.headers.common.Authorization = tkn;
});

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/product', {
        templateUrl: "masters/product/product.html",
        controller: 'productCtrl'
    });
}]);

myApp.controller('productCtrl', ['$scope', 'productService', function ($scope, productService) {


    ////////////////pagination////////////////////


    $scope.pageSize = 2;
    $scope.pageIndex = 1;
    $scope.maxSize = "";
    $scope.totalItems = "";
    $scope.numPages = "";
    // $scope.pagesizeSelected="";
    getallProds();
    $scope.masPro = [];
   function getallProds() {
        
        $scope.masPro = [];
        productService.getallProds($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.masPro.push({
                    productId: value.productId, productName: value.productName, productBarcode:value.productBarcode,
                    batchNo:value.batchNo, productMrp:value.productMrp, sellingcost:value.sellingcost,
                    discount:value.discount, gst:value.gst, specification: value.specification,
                    createdDate: value.insertedDate, updatedDate: value.updatedDate, createdBy: value.createdBy.userName,
                    updatedBy: value.updatedBy.userName
                });
                $scope.totalItems = response.data.totalElements;
                $scope.numPages = response.data.totalPages;
            });
        });
    }


    $scope.prod = {
        productId:"",
        productName:"",
        productBarcode:"",
        batchNo:"",
        productMrp:"",
        sellingcost:"",
        discount:"",
        gst:"",
        speciication: "",
        createdBy:
        {
            userId: usId
        },
        updatedBy: {
            userId: usId
        }
    };

    $scope.changePageSize = function () {
        $scope.pageIndex = 0;
        getallProds();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallProds($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    /////////////end of pagination///////////////////

    $scope.editProds = function (x) {
        $scope.prod.productId = x.productId;
        $scope.prod.productName = x.productName;
        $scope.prod.productBarcode = x.productBarcode;
        $scope.prod.batchNo = x.batchNo;
        $scope.prod.productMrp = x.productMrp;
        $scope.prod.sellingcost = x.sellingcost;
        $scope.prod.discount = x.discount;
        $scope.prod.gst = x.gst;
        $scope.prod.specification = x.specification;
        console.log($scope.prod);
    }
    $scope.deleteProds = function () {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                productService.deleteProds($scope.prod).then(function () {
                    $scope.pageChange();
                    Swal.fire("Product Deleted Successfully!");
                });
                $scope.loadProucts();
            }
        });


    }
    $scope.clearProds = function () {
        $scope.prod.productId = "";
        $scope.prod.productName = "";
        $scope.prod.productBarcode = "";
        $scope.prod.batchNo = "";
        $scope.prod.productMrp = "";
        $scope.prod.sellingcost = "";
        $scope.prod.discount = "";
        $scope.prod.gst = "";
        $scope.prod.specification = "";
        console.log($scope.prod);
    }
    $scope.addProds = function () {
        productService.addProds($scope.prod).then(function (response) {
            $scope.pageChange();
            if (response.data.responseCode == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product Successfully Created!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                swal.fire("Product Already Exist!")
            }
            $scope.loadProucts();
        });

    }
    
    $scope.tabproduct = true;

    $scope.closeProd = function () {
        $scope.popproduc = false;
    }

    $scope.addprod = function () {
        $scope.popproduc = $scope.addbtnproduc = true; $scope.editproduc = $scope.tabproduct = $scope.deleteproduc = false;
    }

    $scope.loadProucts = function () {
        $scope.tabproduct = true; $scope.popproduc = false;
    }

}]);