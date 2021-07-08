'use strict';

var myApp = angular.module('myApp.rawmaterial', ['ngRoute', 'ui.bootstrap']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(tkn);
myApp.run(function ($http) {
    $http.defaults.headers.common.Authorization = tkn;
});

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/rawmaterial', {
        templateUrl: "masters/raw material/material.html",
        controller: 'rawMaterialCtrl'
    });
}]);

myApp.controller('rawMaterialCtrl', ['$scope', 'rawMaterialService', function ($scope, rawMaterialService) {


    ////////////////pagination////////////////////


    $scope.pageSize = 2;
    $scope.pageIndex = 0;
    $scope.maxSize = "";
    $scope.totalItems = "";
    $scope.numPages = "";
    // $scope.pagesizeSelected="";
    getallMat();
    $scope.raw = [];
    function getallMat() {
        $scope.raw = [];
        rawMaterialService.getallMat($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.raw.push({ rawmaterialId:value.rawmaterialId, rawMaterialName: value.rawMaterialName, barcode: value.barcode, 
                    rawMaterialCost: value.rawMaterialCost, discount:value.discount, gst:value.gst,
                    cgst:value.cgst, sgst:value.sgst, specification:value.specification,
                    createdDate: value.insertedDate, updatedDate: value.updatedDate, createdBy: value.createdBy.userName,
                    updatedBy: value.updatedBy.userName
                });
                $scope.totalItems = response.data.totalElements;
                $scope.numPages = response.data.totalPages;
            });
        });
    }


    $scope.mats = {
        rawmaterialId:"",
        rawMaterialName: "",
        barcode: "",
        rawMaterialCost: "",
        discount: "",
        gst: "",
        cgst: "",
        sgst: "",
        specification: "",
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
        getallMat();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallMat($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    /////////////end of pagination///////////////////

    $scope.editMats = function (x) {
        $scope.mats.rawmaterialId = x.rawmaterialId;
        $scope.mats.rawMaterialName = x.rawMaterialName;
        $scope.mats.barcode = x.barcode;
        $scope.mats.rawMaterialCost = x.rawMaterialCost;
        $scope.mats.discount = x.discount;
        $scope.mats.gst = x.gst;
        $scope.mats.specification = x.specification;
        console.log($scope.cats);
    }
    $scope.deleteMats = function () {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                rawMaterialService.deleteMats($scope.mats).then(function () {
                    $scope.pageChange();
                    Swal.fire("Raw Material Deleted Successfully!");
                });
                $scope.loadMaterial();
            }
        });


    }
    $scope.clearMats = function () {
        $scope.mats.rawmaterialId = "";
        $scope.mats.rawMaterialName = "";
        $scope.mats.barcode = "";
        $scope.mats.rawMaterialCost = "";
        $scope.mats.discount = "";
        $scope.mats.gst = "";
        $scope.mats.specification = "";
        console.log($scope.cats);
    }
    $scope.addMats = function () {
        rawMaterialService.addMats($scope.mats).then(function (response) {
            $scope.pageChange();
            if (response.data.responseCode == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Raw Material Successfully Created!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                swal.fire("Raw Material Already Exist!")
            }
            $scope.loadMaterial();
        });

    }

    $scope.tabMatShow = true;

    $scope.closeMat = function () {
        $scope.matpop = false;
    }

    $scope.matAdd = function () {
        $scope.matpop = $scope.addmatbtn = true; $scope.matedit = $scope.tabMatShow = $scope.matdelete = false;
    }

    $scope.loadMaterial = function () {
        $scope.tabMatShow = true; $scope.matpop = false;
    }

}]);