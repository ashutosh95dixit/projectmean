sampleApp.controller('ShowController', function($scope, $http, $log) {

    $scope.tagline = 'Select your show time here!';
    $scope.booking = 'booking';

    var refresh = function() {
        $http.get('/show/getShow').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.showList = response;
            $scope.show = "";
        });
    };

    refresh();

    $scope.addShow = function(show) {


            $http({
                    method: 'POST',
                    url: '/show/addShow',
                     headers: {'Content-Type': 'application/json'},
                    data: show
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });


        console.log($scope.contact);

    };

    $scope.removeShow = function(show) {
        //console.log(id);
        $http.delete('/show/deleteShow/' + show._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editShow = function(show) {
        $http.get('/show/getShow/' + show._id).success(function(response) {
            $scope.show = response[0];
        });
    };

    $scope.updateShow = function(show) {
        console.log("REACHED UPDATE");
        console.log($scope.show._id);
        $http.put('/show/updateShow/' + $scope.show._id, $scope.show).success(function(response) {
            console.log(response);
            refresh();
        })
    }

});
