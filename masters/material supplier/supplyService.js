myApp.service('supplierService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/WaterPlantWeb/";

    this.addSupplier = function (sup) {
        if (sup.supplierId == 0 || sup.supplierId == null) {
            return $http({
                method: "POST",
                url: URL + "supplier/v1/createMaterialSupplier",
                data: JSON.stringify(sup)
            })
        }

        else {
            return $http({
                method: "PUT",
                url: URL + "supplier/v1/updateMaterialSupplier",
                data: JSON.stringify(sup)
            })
        }
    }

    this.getallSupplier = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "supplier/v1/getAllSuppliersByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }

    this.deleteSupplier = function (sup) {
        return $http({
            method: "DELETE",
            url: URL + "supplier/v1/deleteSupplierBySupplierId/" + sup.supplierId
        })
    }                               

}]);