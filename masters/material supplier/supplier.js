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
    $scope.pageIndex = 1;
    $scope.maxSize = 6;
    $scope.totalItems = "";
    $scope.numPages = "";
    // $scope.pagesizeSelected="";    

    $scope.msup = [];
    getallSupplier();
    function getallSupplier() {
      $scope.msup = [];
        supplierService.getallSupplier($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.msup.push({
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


    $scope.sup = {
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
        getallSupplier();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallSupplier($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    /////////////end of pagination///////////////////
    

    $scope.editSupplier = function (x) {
        $scope.sup.supplierId = x.supplierId;
        $scope.sup.supplierName = x.supplierName;
        $scope.sup.mobileNumber = x.mobileNumber;
        $scope.sup.address = x.address;
        $scope.sup.bankAcNo = x.bankAcNo;
        $scope.sup.ifsc = x.ifsc;
        $scope.sup.gstNo = x.gstNo;
        $scope.sup.description = x.description;
        console.log($scope.sup);
    }
    $scope.deleteSupplier = function () {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                supplierService.deleteSupplier($scope.sup).then(function () {
                    $scope.pageChange();
                    Swal.fire("Material Supplier Deleted Successfully!");
                });
                $scope.loadSupplier();
            }
        });


    }
    $scope.clearSupplier = function () {
        $scope.sup.supplierId = "";
        $scope.sup.supplierName = "";
        $scope.sup.mobileNumber = "";
        $scope.sup.address = "";
        $scope.sup.bankAcNo = "";
        $scope.sup.ifsc = "";
        $scope.sup.gstNo = "";
        $scope.sup.description = "";
        console.log($scope.sup);
    }
    $scope.addSupplier = function () {
        supplierService.addSupplier($scope.sup).then(function (response) {
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

    $scope.supTable = true;

    $scope.closeSupply = function () {
        $scope.lierpop = false;
    }

    $scope.addSupply = function () {
        $scope.lierpop = $scope.addlierbtn = true; $scope.lieredit = $scope.supTable = $scope.lierdelete = false;
    }

    $scope.loadSupplier = function () {
        $scope.supTable = true; $scope.lierpop = false;
    }

}]);