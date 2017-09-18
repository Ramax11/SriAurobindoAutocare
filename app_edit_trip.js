var editapp = angular.module('editapp', ['angular.filter'], function($locationProvider){
	$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
});

editapp.controller('editMainController', ['$scope', '$location', '$http',
    function MainController($scope, $location, $http) {

	$scope.id = $location.search().id;

	var esdatetime, eedatetime;

	$scope.funcAdv = function(){
		$scope.balancetopay = $scope.tripcharges - $scope.advancepaid;
	}

	$http.get("http://54.179.185.66:8080/trip", {params:{"id": $scope.id}})
		.then( function(response){
		var edittripDetails = response.data;
			$scope.bookingno = edittripDetails.booking_no,
			$scope.bdate = edittripDetails.booking_date,
			$scope.bookingmode = edittripDetails.booking_mode,
			$scope.triptakenby = edittripDetails.trip_taken_by,
			$scope.tdate = edittripDetails.travel_date,
			$scope.rtime = edittripDetails.reporting_time,
			$scope.sdatetime = edittripDetails.start_date_time,
			$scope.edatetime = edittripDetails.end_date_time,
			$scope.vehicle = edittripDetails.vehicle,
			$scope.acnonac = edittripDetails.ac_nonac,
			$scope.tripdetails = edittripDetails.trip_details,
			$scope.party = edittripDetails.party,
			$scope.mobile = edittripDetails.mobile,
			$scope.email = edittripDetails.email,
			$scope.flighttrainno = edittripDetails.flight_train_no,
			$scope.pickupaddress = edittripDetails.pickup_address,
			$scope.dropaddress = edittripDetails.drop_address,
			$scope.remarks = edittripDetails.remarks,
			$scope.advancepaid = edittripDetails.advance_paid,
			$scope.balancetopay = edittripDetails.balance_to_pay,
			$scope.tripcharges = edittripDetails.trip_charges,
			$scope.hrsallowed = edittripDetails.hrs_allowed,
			$scope.kmsallowed = edittripDetails.kms_allowed,
			$scope.statusofpayment = edittripDetails.status_of_payment,
			$scope.extrahrrate = edittripDetails.extra_hr_rate,
			$scope.extrakmrate = edittripDetails.extra_km_rate,
			$scope.driver = edittripDetails.driver,
			$scope.vehicleno = edittripDetails.vehicle_no,
			$scope.totalhrsallowed = edittripDetails.total_hrs_allowed,
			$scope.totalkmsallowed = edittripDetails.total_kms_allowed,
			$scope.batacalextrahrrate = edittripDetails.bata_cal_extra_hr_rate,
			$scope.batacalextrakmrate = edittripDetails.bata_cal_extra_km_rate,
			$scope.batacaltripcharge = edittripDetails.bata_cal_trip_charge

		// start Date time
		var s = new Date(esdatetime);
		var day = s.getDate();
		day = day < 10 ? '0' + day : day;
		var month = s.getMonth()+1;
		month = month < 10 ? '0' + month : month;
		var date = day +'-'+ month +'-'+ s.getFullYear();

		var hrs = s.getHours();
		var mins = s.getMinutes();
		var ampm = hrs >=12 ? 'PM' : 'AM';
		hrs = hrs % 12;
		hrs = hrs ? hrs : 12;
		hrs = hrs < 10 ? '0' + hrs : hrs;
		mins = mins < 10 ? '0' + mins : mins;
		var time = hrs +':'+ mins +' '+ampm;

		s = date +' '+ time;
		//$scope.sdatetime = s;

		// End date time
		var e = new Date(eedatetime);
		var day = e.getDate();
		day = day < 10 ? '0' + day : day;
		var month = e.getMonth()+1;
		month = month < 10 ? '0' + month : month;
		var date = day +'-'+ month +'-'+ e.getFullYear();

		var hrs = e.getHours();
		var mins = e.getMinutes();
		var ampm = hrs >=12 ? 'PM' : 'AM';
		hrs = hrs % 12;
		hrs = hrs ? hrs : 12;
		hrs = hrs < 10 ? '0' + hrs : hrs;
		mins = mins < 10 ? '0' + mins : mins;
		var time = hrs +':'+ mins +' '+ampm;

		e = date +' '+ time;
		//$scope.edatetime = e;

	});


	$http.get("https://spreadsheets.google.com/feeds/list/1M5hAev_MVP958URJd3us5MMVUNklgu-kfcnIKeAOmL4/1/public/values?alt=json")
		.then(function(response){
			$scope.jsondata = response.data.feed.entry;

		});


	//get driver details from google spreadsheets
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/1/public/values?alt=json")
        .then(function(response) {
		$scope.driverDetails = response.data.feed.entry;
	});

	//get Vehicle details from google spreadsheets
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/2/public/values?alt=json")
        .then(function(response) {
		$scope.vehicleDetails = response.data.feed.entry;
	});

	//get Party details from google spreadsheets
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/3/public/values?alt=json")
        .then(function(response) {
		$scope.partyDetails = response.data.feed.entry;

	});

	//get Trip details from google spreadsheets
	$http.get("https://spreadsheets.google.com/feeds/list/1v3vM_9ioLk8xFraGfT6DsDsuk56qSHum-KLxi95q0z4/4/public/values?alt=json")
        .then(function(response) {
		$scope.tripDetails = response.data.feed.entry;
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
	console.log($scope.bdate);
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



        $scope.updateTrip = function () {

		$http.get("http://54.179.185.66:8080/trip", {params:{"id": $scope.id}})
			.then( function(response){
				var tripData = response.data;


				var s = new Date($scope.sdatetime);
				//console.log(s);
				var e = new Date($scope.edatetime);
				//console.log(e);

            			var data ={
					event : $scope.rtime +" "+ $scope.party ,
					where : $scope.bookingno +" "+ $scope.bdate +" "+ $scope.vehicle +" "+ $scope.vehicleno +" "+ $scope.driver ,
					calendar : '',
					description : $scope.address +" "+ $scope.flighttrainno +" "+ $scope.mobile +" "+ "Pl pay Rs."+$scope.tripcharges+"/-"+$scope.remarks+" For "+ $scope.hrsallowed +"&"+$scope.kmsallowed ,
					startdate : s,
					enddate : e,
					details : {
  						booking_no : $scope.bookingno,
						booking_date : $scope.bdate,
						booking_mode : $scope.bookingmode,
						trip_taken_by : $scope.triptakenby,
						travel_date : $scope.tdate,
	  					reporting_time : $scope.rtime,
						start_date_time : s,
						end_date_time : e,
						vehicle : $scope.vehicle,
						ac_nonac : $scope.acnonac,
						trip_details : $scope.tripdetails,
			  			party : $scope.party,
			  			mobile : $scope.mobile,
						email : $scope.email,
						flight_train_no : $scope.flighttrainno,
						pickup_address : $scope.pickupaddress,
						drop_address : $scope.dropaddress,
						remarks : $scope.remarks,
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
						bata_cal_trip_charge: $scope.batacaltripcharge,
						km_in : tripData.km_in,
						km_out : tripData.km_out,
						km_run : tripData.km_run,
						time_in : tripData.time_in,
						time_out : tripData.time_out,
			  			total_time : tripData.total_time,
						driver_bata : tripData.driver_bata,
						bata_percentage : tripData.bata_percentage,
						waiting_expenses : tripData.waiting_expenses,
						extra_hrs_amt : tripData.extra_hrs_amt,
  						extra_kms_amt : tripData.extra_kms_amt,
 					 	total_rs : tripData.total_rs
						}
					};
				    //$scope.data1 = data;

			        var config = {
                			headers : {
     				               'Content-Type': 'application/json'
     				           }
            				};

				$http.put("http://54.179.185.66:8080/trip", data, {params:{"id": $scope.id}})
				.then( function(response){
                			$scope.data = response.data;
					window.location = "booking_details.html?id="+$scope.id;

           			});

		});

        };

	$scope.goBack = function(){
		window.history.back();
	}


}
]);
