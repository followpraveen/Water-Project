myApp.service('supplierService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/WaterPlantWeb/";

    this.addcats = function (matSup) {
        if (matSup.supplierId == 0 || matSup.supplierId == null) {
            return $http({
                method: "POST",
                url: URL + "category/v1/createMaterialSupplier",
                data: JSON.stringify(matSup)
            })
        }

        else {
            return $http({
                method: "PUT",
                url: URL + "category/v1/updateMaterialSupplier",
                data: JSON.stringify(matSup)
            })
        }
    }

    this.getallCat = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "category/v1/getAllSuppliersByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }

    this.deletematSup = function (matSup) {
        return $http({
            method: "DELETE",
            url: URL + "category/v1/deleteSupplierById/" + matSup.supplierId
        })
    }                               

}]);