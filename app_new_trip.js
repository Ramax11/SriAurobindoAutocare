var app = angular.module('app', ['autocomplete','angular.filter']);

app.controller('MainController', function($scope, $filter, $http){


	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/3/public/values?alt=json")
        .then(function(response) {
		var partyDetails = response.data.feed.entry;
		getpartyDetails(partyDetails);
	});

	var partyNames = [];
	function getpartyDetails(partyDetails){
	
		for (var i in partyDetails){
			var obj = partyDetails[i];
			partyNames.push(partyDetails[i].gsx$name.$t);
		
		}
	}
	console.log(partyNames);
	$scope.movies = partyNames;
	
  $scope.doSomething = function(typedParty){
      $scope.movies = partyNames;

	if(typedParty.length == 0){
		$scope.mobileno = "";
		$scope.email = ""; 
		$scope.pickupaddress = ""; 
		$scope.remarks = ""; 
	}
  }

  $scope.doSomethingElse = function(suggestion, $http){
    getDetails(suggestion);
   }

   function getDetails(suggestion){
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/3/public/values?alt=json")
        .then(function(response) {
		var partyDetails = response.data.feed.entry;
		var obj = $filter('filter')(partyDetails, function(d){return d.gsx$name.$t === suggestion;})[0];
		//console.log(obj);
		$scope.mobileno = obj.gsx$mobileno.$t;
		$scope.email = obj.gsx$email.$t; 
		$scope.pickupaddress = obj.gsx$address.$t; 
		$scope.remarks = obj.gsx$remarks.$t; 
	});

   }


    $http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/5/public/values?alt=json")
        .then(function(response) {
		var tripDetails = response.data.feed.entry;
		gettripDetails(tripDetails);
	});


    var trips = [];
    function gettripDetails(tripDetails){
	for (var i in tripDetails){
		var obj = tripDetails[i];
		trips.push(tripDetails[i].gsx$trip.$t);
	}
    }    
    console.log(trips);
    $scope.movies1= trips;

    $scope.doSomething1 = function(typedTrip){
  	$scope.movies1 = trips;
  
	if(typedTrip.length == 0){
		$scope.hrsallowed = "";
		$scope.kmsallowed = "";
	}
  }

  $scope.doSomethingElse1 = function(suggestion, $http){
    	getTrip(suggestion);
   }

   function getTrip(suggestion){
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/5/public/values?alt=json")
        .then(function(response) {
		var trip_Details = response.data.feed.entry;
		var obj = $filter('filter')(trip_Details, function(d){return d.gsx$trip.$t === suggestion;})[0];
		console.log(obj);

		$scope.hrsallowed = obj.gsx$hrsallowed.$t;
		$scope.kmsallowed = obj.gsx$kmsallowed.$t;

		//for Bata calculation
		$scope.totalhrsallowed = obj.gsx$totalhrsallowed.$t;
		$scope.totalkmsallowed = obj.gsx$totalkmsallowed.$t;
		$scope.batacalextrahrrate = obj.gsx$batacalextrahrrate.$t;
		$scope.batacalextrakmrate = obj.gsx$batacalextrakmrate.$t;
		$scope.batacaltripcharge = obj.gsx$batacaltripcharge.$t;

		var vehi = $scope.vehicle + $scope.acnonac;
		vehi = vehi.toLowerCase();
		vehi = vehi.replace(/\s/g,'');
		console.log(vehi);
		
		$scope.advancepaid = 0;
		switch(vehi){
			case "tataindigoac":
				$scope.tripcharges = obj.gsx$tataindigoac.$t;
				$scope.balancetopay = obj.gsx$tataindigoac.$t;
				break;
			case "tataindigononac":
				$scope.tripcharges = obj.gsx$tataindigononac.$t;
				$scope.balancetopay = obj.gsx$tataindigononac.$t;
				break;
			case "tatasumoac":
				$scope.tripcharges = obj.gsx$tatasumoac.$t;
				$scope.balancetopay = obj.gsx$tatasumoac.$t;
				break;
			case "tatasumononac":
				$scope.tripcharges = obj.gsx$tatasumononac.$t;
				$scope.balancetopay = obj.gsx$tatasumononac.$t;
				break;
			case "toyotaetiosac":
				$scope.tripcharges = obj.gsx$toyotaetiosac.$t;
				$scope.balancetopay = obj.gsx$toyotaetiosac.$t;
				break;
			case "toyotaetiosnonac":
				$scope.tripcharges = obj.gsx$toyotaetiosnonac.$t;
				$scope.balancetopay = obj.gsx$toyotaetiosnonac.$t;
				break;
			case "maruthidzireac":
				$scope.tripcharges = obj.gsx$maruthidzireac.$t;
				$scope.balancetopay = obj.gsx$maruthidzireac.$t;
				break;
			case "maruthidzirenonac":
				$scope.tripcharges = obj.gsx$maruthidzirenonac.$t;
				$scope.balancetopay = obj.gsx$maruthidzirenonac.$t;
				break;
			case "mazdatravellerac":
				$scope.tripcharges = obj.gsx$mazdatravellerac.$t;
				$scope.balancetopay = obj.gsx$mazdatravellerac.$t;
				break;
			case "mazdatravellernonac":
				$scope.tripcharges = obj.gsx$mazdatravellernonac.$t;
				$scope.balancetopay = obj.gsx$mazdatravellernonac.$t;
				break;
			default :
				$scope.tripcharges = "";
				break;

		}		

	});
   }


	$scope.funcAdv = function(){

		$scope.balancetopay = $scope.tripcharges - $scope.advancepaid;

	}

	//get Vehicle details from google spreadsheets
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/2/public/values?alt=json")
        .then(function(response) {
		$scope.vehicleDetails = response.data.feed.entry;
	});

	var vehi;
	$scope.vehicleCheck = function(){
		vehi = 	$scope.vehicle +" "+ $scope.acnonac;
		//vehi = vehi.toLowerCase();
		//vehi = vehi.replace(/\s/g,'');
		console.log(vehi);
		getExtraRates(vehi);
		if($scope.trip != null ){
			getTrip($scope.trip);
		}
	}

	$scope.acnonacCheck = function(){
		vehi = 	$scope.vehicle +" "+ $scope.acnonac;
		//vehi = vehi.toLowerCase();
		//vehi = vehi.replace(/\s/g,'');
		console.log(vehi);
		getExtraRates(vehi);
		if($scope.trip != null ){
			getTrip($scope.trip);
		}
	}
	
	function getExtraRates(vehiac){
		//get Trip details from google spreadsheets
		var extraRates;
		$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/7/public/values?alt=json")
        	.then(function(response) {
			extraRates = response.data.feed.entry;
			console.log(vehiac);
			console.log(extraRates);
			var obj = $filter('filter')(extraRates, function(d){return d.gsx$vehicle.$t === vehiac;})[0];
			console.log(obj);

			if(obj != null){
				$scope.extrahrrate = obj.gsx$extrahrrate.$t;
				$scope.extrakmrate = obj.gsx$extrakmrate.$t;
			}
		});

	}

	//get driver details from google spreadsheets
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/1/public/values?alt=json")
        .then(function(response) {
		$scope.driverDetails = response.data.feed.entry;
	});


	var reporttime;
	$('.form_time').datetimepicker()
	.on('changeDate', function(ev){
	$scope.reportingtime = ev.date.valueOf();
	var rtime = $scope.reportingtime;
	var d = new Date(rtime);
	var hrs = d.getHours();
	var mins = d.getMinutes();
	var ampm = hrs >=12 ? 'PM' : 'AM';
	hrs = hrs % 12;
	hrs = hrs ? hrs : 12;
	hrs = hrs < 10 ? '0' + hrs : hrs;
	mins = mins < 10 ? '0' + mins : mins;
	reporttime = hrs +':'+ mins +' '+ampm;
	console.log(reporttime);
	});

	var bookdate;
	$('.form_date').datetimepicker()
	.on('changeDate', function(ev){
	$scope.bookingdate = ev.date.valueOf();
	var bdate = $scope.bookingdate;
	var d = new Date(bdate);
	var day = d.getDate();
	day = day < 10 ? '0' + day : day;
	var month = d.getMonth()+1;
	month = month < 10 ? '0' + month : month;
	bookdate = day +'-'+ month +'-'+ d.getFullYear();
	console.log(bookdate);
	});


	var traveldate;
	$('.form_traveldate').datetimepicker()
	.on('changeDate', function(ev){
	$scope.traveldate = ev.date.valueOf();
	var tdate= $scope.traveldate;
	var d = new Date(tdate);
	var day = d.getDate();
	day = day < 10 ? '0' + day : day;
	var month = d.getMonth()+1;
	month = month < 10 ? '0' + month : month;
	traveldate = day +'-'+ month +'-'+ d.getFullYear();
	console.log(traveldate);
	});

	var startdatetime;
	$('.form_startdatetime').datetimepicker()
	.on('changeDate', function(ev){
	$scope.startdatetime = ev.date.valueOf();
	var sdate= $scope.startdatetime;
	startdatetime = new Date(sdate);
	console.log(startdatetime);
	});

	var enddatetime;
	$('.form_enddatetime').datetimepicker()
	.on('changeDate', function(ev){
	$scope.enddatetime = ev.date.valueOf();
	var sdate= $scope.enddatetime;
	enddatetime = new Date(sdate);
	console.log(enddatetime);
	});

   
	$scope.SendData = function () {

		var party = $scope.partyname;
		console.log(party);

		if(startdatetime == null){
			$scope.sDateTime_required = "Start DateTime is Required";
			return;
		}else if(enddatetime == null){
			$scope.sDateTime_required = "End DateTime is Required";
			return;
		}

		var party = $scope.partyname;
		var mobile = $scope.mobileno;
		var email = $scope.email;
		var address = $scope.pickupaddress;
		var remarks = $scope.remarks;
		var tripCharges = $scope.tripcharges;

            var data ={
		event : reporttime +" "+ party ,
		where : $scope.bookingno +" "+ bookdate +" "+ $scope.vehicle +" "+ $scope.vehicleno +" "+ $scope.driver ,
		calendar : '',
		description : "PickupAddress: "+address+" DropAddress: "+$scope.dropaddress+" "+ $scope.flightno +" "+ $scope.mobileno +" "+ "Pl pay Rs."+tripCharges+"/-"+remarks ,
		startdate : startdatetime,
		enddate : enddatetime,
		details : {
  			booking_no : $scope.bookingno,
			booking_date : bookdate,
			booking_mode : $scope.bookingmode,
			trip_taken_by : $scope.triptakenby,
			travel_date : traveldate,
  			reporting_time : reporttime,
			start_date_time : startdatetime,
			end_date_time : enddatetime,
			vehicle : $scope.vehicle,
			ac_nonac : $scope.acnonac,
			trip_details : $scope.trip,
  			party : party,
  			mobile : mobile,
			email : email,
			flight_train_no : $scope.flighttrainno,
			pickup_address : address,
			drop_address : $scope.dropaddress,
			remarks : remarks,
			advance_paid : $scope.advancepaid,
			balance_to_pay : $scope.balancetopay,
			trip_charges : $scope.tripcharges,
			hrs_allowed : $scope.hrsallowed,
			kms_allowed : $scope.kmsallowed,
			status_of_payment : $scope.statusofpayment,
			extra_hr_rate : $scope.extrahrrate,
			extra_km_rate : $scope.extrakmrate,
			driver : $scope.driver,
  			vehicle_no: $scope.vehicleno,
			total_hrs_allowed: $scope.totalhrsallowed,
			total_kms_allowed: $scope.totalkmsallowed,
			bata_cal_extra_hr_rate: $scope.batacalextrahrrate,
			bata_cal_extra_km_rate: $scope.batacalextrakmrate,
			bata_cal_trip_charge: $scope.batacaltripcharge
			}
		};


	    $scope.data1 = data;


            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };

            $http.post('http://54.179.185.66:8080/trip', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;

		window.location = "view_bookings.html";

            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };

	$scope.cancel = function(){
		window.location ="view_bookings.html";
	}




});
