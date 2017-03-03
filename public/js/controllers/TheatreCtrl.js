sampleApp.controller('TheatreController', function($scope, $http, $log){

    $scope.tagline = 'Select Theatre';

    $scope.booking = 'booking';

var loadCities = function() {
        $http.get('/city/getCity').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.cityList = response;
            $scope.city = "";
        });
    };

loadCities();

var refresh = function() {
        $http.get('/theatre/getTheatre').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.theatreList = response;
            console.log($scope.theatreList);
            $scope.theatre = "";
        });
    };

refresh();

    $scope.addTheatre = function(theatre)
    {

        var  theatreObj ={
            TName:theatre.theatreName,
            TCity:theatre.city
        };

            $http({
                    method: 'POST',
                    url: '/theatre/addTheatre',
                     headers: {'Content-Type': 'application/json'},
                    data: angular.fromJson(theatreObj)
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });

};


    $scope.removeTheatre = function(theatre) {
        $http.delete('/theatre/deleteTheatre/' + theatre._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editTheatre = function(theatre) {
        $http.get('/theatre/getTheatre/' + theatre._id).success(function(response) {
            $scope.theatre = response[0];
        });
    };

    $scope.updateTheatre = function(theatre) {
        console.log("REACHED UPDATE");
        console.log($scope.theatre._id);
        $http.put('/theatre/updateTheatre/' + $scope.theatre._id, $scope.theatre).success(function(response) {
            console.log(response);
            console.log("Theatre Updated successfully");
            refresh();
        });
    };

});
