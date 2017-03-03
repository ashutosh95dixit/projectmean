sampleApp.controller('BookingController', function($scope, $http, $log){

    $scope.tagline = 'Assign Movies';

    $scope.booking = 'booking';

    var loadTheatre = function() {
            $http.get('/theatre/getTheatre').success(function(response) {
                console.log('READ IS SUCCESSFUL');
                $scope.theatreList = response;
                $scope.theatre = "";
            });
        };

    loadTheatre();

var loadCities = function() {
        $http.get('/city/getCity').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.cityList = response;
            $scope.city = "";
        });
    };

loadCities();

var loadMovies = function() {
        $http.get('/movie/getMovie').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.moviList = response;
            $scope.movi = "";
        });
    };

loadMovies();

var loadShow = function() {
        $http.get('/show/getShow').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.showList = response;
            $scope.show = "";
        });
    };

loadShow();

var refresh = function() {
        $http.get('/booking/getBooking').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.bookingList = response;
            console.log($scope.bookingList);
            $scope.booking = "";
        });
    };

refresh();

    $scope.addBooking = function(booking)
    {

        var  bookingObj ={
            TName:booking.theatre,
            TCity:booking.city,
            TMovie:booking.movi,
            TShow:booking.showNa
        };

            $http({
                    method: 'POST',
                    url: '/booking/addBooking',
                     headers: {'Content-Type': 'application/json'},
                    data: angular.fromJson(bookingObj)
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });

};


    $scope.removeBooking = function(booking) {
        $http.delete('/booking/deleteBooking/' + booking._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editBooking = function(booking) {
        $http.get('/booking/getBooking/' + booking._id).success(function(response) {
            $scope.booking = response[0];
        });
    };

    $scope.updateBooking = function(booking) {
        console.log("REACHED UPDATE");
        console.log($scope.booking._id);
        $http.put('/booking/updateBooking/' + $scope.booking._id, $scope.booking).success(function(response) {
            console.log(response);
            console.log("Booking Updated successfully");
            refresh();
        });
    };

});
