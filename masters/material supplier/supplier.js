'use strict';

var myApp = angular.module('myApp.materialsupplier', ['ngRoute', 'ui.bootstrap']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(tkn);
myApp.run(function ($http) {
    $http.defaults.headers.common.Authorization = tkn;
});

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/materialsupplier', {
        templateUrl: "masters/material supplier/supplier.html",
        controller: 'materialsupplierCtrl'
    });
}]);

myApp.controller('materialsupplierCtrl', ['$scope', 'supplierService', function ($scope, supplierService) {


    ////////////////pagination////////////////////


    $scope.pageSize = 2;
    $scope.pageIndex = 0;
    $scope.maxSize = "";
    $scope.totalItems = "";
    $scope.numPages = "";
    // $scope.pagesizeSelected="";
    getallSupply();
    $scope.supMat = [];
    function getallSupply() {
        $scope.supMat = [];
        supplierService.getallSupply($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.supMat.push({
                    supplierId: value.supplierId, supplierName: value.supplierName, 
                    mobileNumber:value.mobileNumber, address:value.address, bankAcNo:value.bankAcNo, ifsc:value.ifsc,
                    gstNo:value.gstNo, description: value.description,createdDate: value.insertedDate, updatedDate: 
                    value.updatedDate, createdBy: value.createdBy.userName, updatedBy: value.updatedBy.userName
                });
                $scope.totalItems = response.data.totalElements;
                $scope.numPages = response.data.totalPages;
            });
        });
    }


    $scope.matSup = {
        supplierId: "",
        supplierName: "",
        mobileNumber: "",
        address:"",
        bankAcNo:"",
        ifsc:"",
        gstNo:"",
        description: "",
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
        getallSupply();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallSupply($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    /////////////end of pagination///////////////////

    $scope.editSupply = function (x) {
        $scope.matSup.supplierId = x.supplierId;
        $scope.matSup.supplierName = x.supplierName;
        $scope.matSup.mobileNumber = x.mobileNumber;
        $scope.matSup.address = x.address;
        $scope.matSup.bankAcNo = x.bankAcNo;
        $scope.matSup.ifsc = x.ifsc;
        $scope.matSup.gstNo = x.gstNo;
        $scope.matSup.description = x.description;
        console.log($scope.matSup);
    }
    $scope.deleteSupply = function () {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                supplierService.deleteSupply($scope.matSup).then(function () {
                    $scope.pageChange();
                    Swal.fire("Material Supplier Deleted Successfully!");
                });
                $scope.loadSupplier();
            }
        });


    }
    $scope.clearSupply = function () {
        $scope.matSup.categoryId = "";
        $scope.matSup.categoryName = "";
        $scope.matSup.categoryCode = "";
        $scope.matSup.description = "";
        console.log($scope.matSup);
    }
    $scope.addSupply = function () {
        supplierService.addSupply($scope.matSup).then(function (response) {
            $scope.pageChange();
            if (response.data.responseCode == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Material Supplier Successfully Created!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                swal.fire("Material Supplier Already Exist!")
            }
            $scope.loadSupplier();
        });

    }

    $scope.tabShow = true;

    $scope.closeSup = function () {
        $scope.suppop = false;
    }

    $scope.addSup = function () {
        $scope.suppop = $scope.addsupbtn = true; $scope.supedit = $scope.tabShow = $scope.supdelete = false;
    }

    $scope.loadSupplier = function () {
        $scope.tabShow = true; $scope.suppop = false;
    }

}]);