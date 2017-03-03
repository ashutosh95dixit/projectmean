sampleApp.controller('AdminCtrl', []).controller('AdminController', function($scope,$http) {

	var refresh = function () {
        $http.get('/movie/getMovie').success(function (response) {
            console.log('READ IS SUCCESSFUL');
			
            $scope.moviList = response;
            $scope.movi = "";
        })
		$http.get('/theatre/getTheatre').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.theatreList = response;
            $scope.theatre = "";
        })
		
		 $http.get('/city/getCity').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.cityList = response;
            $scope.city = "";
        })
		
		 $http.get('/show/getShow').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.showList = response;
            $scope.show = "";
        })
		
        $http.get('/booking/getBooking').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.bookingList = response;
            $scope.booking = "";
        });
    };
		
    refresh();
	

   $scope.addMovie = function(movi) {
        $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function(response) {
            //console.log(response);
            var movieObj = {};
            for (var key in response) {
                if (key == 'Title' || key == 'Language' || key == 'Poster' || key == 'Genre' || key == 'Director' || key == 'Actors') {
                    movieObj[key] = response[key];

                }
            }

            $http({
                    method: 'POST',
                    url: '/movie/addMovie',
                     headers: {'Content-Type': 'application/json'},
                    data: movieObj
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    $log.info(response);
                    refresh();
                });



        });
        console.log($scope.contact);

    };

    $scope.removeMovie = function(movie) {
        //console.log(id);
        $http.delete('/movie/deleteMovie/' + movie._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editMovie = function(movie) {
        $http.get('/movie/getMovie/' + movie._id).success(function(response) {
            $scope.movi = response[0];
        });
    };

    $scope.updateMovie = function() {
        console.log("REACHED UPDATE");
        console.log($scope.movi._id);
        $http.put('/movie/updateMovie/' + $scope.movi._id, $scope.movi).success(function(response) {
            console.log(response);
            refresh();
        })
    }
	//theatre
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
	//show timing
	
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
    $scope.addCity = function(city) {


            $http({
                    method: 'POST',
                    url: '/city/addCity',
                     headers: {'Content-Type': 'application/json'},
                    data: city
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
                });


        console.log($scope.contact);

    };

    $scope.removeCity = function(city) {
        //console.log(id);
        $http.delete('/city/deleteCity/' + city._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editCity = function(city) {
        $http.get('/city/getCity/' + city._id).success(function(response) {
            $scope.city = response[0];
        });
    };

    $scope.updateCity = function(city) {
        console.log("REACHED UPDATE");
        console.log($scope.city._id);
        $http.put('/city/updateCity/' + $scope.city._id, $scope.city).success(function(response) {
            console.log(response);
            refresh();
        })
    }

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