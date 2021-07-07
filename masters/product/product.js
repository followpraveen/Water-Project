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
    $scope.maxSize = 6;
    $scope.totalItems = 0;
    $scope.numPages = "";
    // $scope.pagesizeSelected="";

    $scope.prods = [];
    getallProduct();
    function getallProduct() {
        $scope.prods = [];
        productService.getallProduct($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.prods.push({
                    batchNo: value.batchNo, cgst: value.cgst, discount:value.discount, gst:value.gst,
                    productBarcode: value.productBarcode, productMrp:value.productMrp, 
                    productName: value.productName, sellingcost:value.sellingcost, sgst: value.sgst,
                    specification: value.specification,
                });
                $scope.totalItems = response.data.totalElements;
                $scope.numPages = response.data.totalPages;
            });
        });
    }


    $scope.pro = {
        productId: "",
        productName: "",
        batchNo: "",
        productBarcode: "",
        specification: "",
        cgst:"",
        sgst:"",
        gst:"",
        productMrp:"",
        sellingcost:"",
        discount:"",
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
        getallProduct();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallProduct($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    ///////////////end of pagination///////////////////

    $scope.editProduct = function (x) {
        $scope.pro.productId = x.productId;    
        $scope.pro.productName = x.productName;
        $scope.pro.batchNo = x.batchNo;
        $scope.pro.productBarcode = x.productBarcode;
        $scope.pro.specification = x.specification;
        // $scope.pro.cgst = x.cgst;
        // $scope.pro.sgst = x.sgst;
        // $scope.pro.gst = x.gst;
        $scope.pro.productMrp = x.productMrp;
        $scope.pro.sellingcost = x.sellingcost;
        $scope.pro.discount = x.discount;
        console.log($scope.pro);
    }
    $scope.deleteProduct = function () {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                productService.deleteProduct($scope.pro).then(function () {
                    $scope.pageChange();
                    Swal.fire("Product Deleted Successfully");
                });
                $scope.loadProduct();
            }
        });
    }
    $scope.clearProduct = function () {
        $scope.pro.productId = "",
        $scope.pro.productName = "";
        $scope.pro.batchNo = "";
        $scope.pro.productBarcode = "";
        $scope.pro.specification = "";
        // $scope.pro.cgst = "";
        // $scope.pro.sgst = "";
        // $scope.pro.gst = "";
        $scope.pro.productMrp = "";
        $scope.pro.sellingcost = "";
        $scope.pro.discount = "";
        console.log($scope.pro);
    }
    $scope.addProduct = function () {
        productService.addProduct($scope.pro).then(function (response) {
            $scope.pageChange();
            if (response.data.responseCode == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product Successfully Created!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }  else {
                swal.fire("Product Already Exist");
            }
            $scope.loadProduct();
        });

    }


    $scope.proShow = true;

    $scope.closeDuct = function () {
        $scope.propop = false;
    }

    $scope.addDuct = function () {
        $scope.propop = $scope.addprobtn = true; $scope.proedit = $scope.proShow = $scope.prodelete = false;
    }

    $scope.loadProduct = function () {
        $scope.proShow = true; $scope.propop = false;
    }

}]);