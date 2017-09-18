var app = angular.module('app', ['autocomplete']);

// the service that retrieves some movie title from an url
app.factory('MovieRetriever', function($http, $q, $timeout){
  var MovieRetriever = new Object();

  MovieRetriever.getmovies = function(i) {
    var moviedata = $q.defer();
    var movies = [];

    var someMovies = ["The Wolverine", "The Smurfs 2", "The Mortal Instruments: City of Bones", "Drinking Buddies", "All the Boys Love Mandy Lane", "The Act Of Killing", "Red 2", "Jobs", "Getaway", "Red Obsession", "2 Guns", "The World's End", "Planes", "Paranoia", "The To Do List", "Man of Steel"];

    var moreMovies = [{
    'name' : {
        '$t' : "Ramachandran"
     },
    'code' : {
        '$t' : "1234"
     }
},
{
    'name' : {
        '$t' : "Suresh"
     },
    'code' : {
        '$t' : "1234"
     }
},
{
    'name' : {
        '$t' : "Veera"
     },
    'code' : {
        '$t' : "1234"
     }
},
{
    'name' : {
        '$t' : "Satheesh"
     },
    'code' : {
        '$t' : "1234"
     }
}
];

$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/3/public/values?alt=json")
        .then(function(response) {
		var partyDetails = response.data.feed.entry;
		getpartyDetails(partyDetails);
	});



function getpartyDetails(moreMovies){
	var names = [];
	for (var i in moreMovies){
		var obj = moreMovies[i];
		names.push(moreMovies[i].gsx$name.$t);
		
	}
	
	console.log(names);
	movies = names;

	//movies = names;
}
//movies = moreMovies[3].name.$t;

    /*if(i && i.indexOf('T')!=-1)
      movies=moreMovies.code;
    else
      movies=moreMovies.code;*/

    $timeout(function(){
      moviedata.resolve(movies);
    },1000);

    return moviedata.promise
  }

  return MovieRetriever;
});

app.controller('MyCtrl', function($scope, MovieRetriever, $filter, $http){

	
  $scope.movies = MovieRetriever.getmovies("...");
  $scope.movies.then(function(data){
    $scope.movies = data;
  });

  $scope.getmovies = function(){
    return $scope.movies;
  }

  $scope.doSomething = function(typedthings){
    //console.log("Do something like reload data with this: " + typedthings );
    $scope.newmovies = MovieRetriever.getmovies(typedthings);
    $scope.newmovies.then(function(data){
      $scope.movies = data;
    });
	
	if(typedthings.length == 0){
		$scope.mobileno = "";
		$scope.email = ""; 
	}
  }

  $scope.doSomethingElse = function(suggestion, $http){
    //console.log("Suggestion selected: " + suggestion );
    getDetails(suggestion);
   }

   function getDetails(suggestion){
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/3/public/values?alt=json")
        .then(function(response) {
		var partyDetails = response.data.feed.entry;
		var obj = $filter('filter')(partyDetails, function(d){return d.gsx$name.$t === suggestion;})[0];
		console.log(obj);
		$scope.mobileno = obj.gsx$mobileno.$t;
		$scope.email = obj.gsx$email.$t; 
	});

   }

   







});
