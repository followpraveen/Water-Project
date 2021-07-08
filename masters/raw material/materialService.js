myApp.service('rawMaterialService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/WaterPlantWeb/";

    this.addMats = function (mats) {
        if (mats.rawmaterialId == 0 || mats.rawmaterialId == null) {
            return $http({
                method: "POST",
                url: URL + "rawmaterial/v1/createRawMaterial",
                data: JSON.stringify(mats)
            })
        }
        else {
            return $http({
                method: "PUT",
                url: URL + "rawmaterial/v1/updateRawMaterial",
                data: JSON.stringify(mats)
            })
        }
    }

    this.getallMat = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "rawmaterial/v1/getAllRawMaterialsByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }
    
    this.deleteMats = function (mats) {
        return $http({
            method: "DELETE",
            url: URL + "rawmaterial/v1/deleteRawMaterialById/" + mats.rawmaterialId
        })
    }                           
}]);