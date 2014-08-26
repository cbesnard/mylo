//function onLoad() {
//	document.addEventListener("deviceready", onDeviceReady, false);
//}
// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//function onDeviceReady(){

//document.addEventListener("pause", onPause, false);
//document.addEventListener("resume", onResume, false);
//document.addEventListener("backbutton", onBackKeyDown, false);
/*
* FILE SYSTEM initialisation
*/


/*
* GA initialisation
*/
//analytics.startTrackerWithId('UA-51649868-1');

$(document).ready(function(){
	init();
	/* * * * * * * * * * * * * * * * * * * * * * * * * *
	*	INITIALIZE UI ELEMENTS
	* * * * * * * * * * * * * * * * * * * * * * * * * */
	setUI(function(){
		$('#groupsDivContainer').css({
			opacity: '1', 
			filter: 'alpha(opacity=100)',
		});
		$('#locContainer').css({
			opacity: '1', 
			filter: 'alpha(opacity=100)',
		});
	});
	/* * * * * * * * * * * * * * * * * *  * * * *  * * * * * * * * * * * * *
	*	INITILIZE USER DATA
	* * * * * * * * * * * * * * * * *  * * * *  * * * * * * * * * * * * */
	/*initUserDatas(function(){
		$('body').anima({
			opacity: '1', 
			filter: 'alpha(opacity=100)',
		}, 350, "linear");
		//navigator.splashscreen.hide();
	});*/
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*	SET UI ELEMENTS BEHAVIOR
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$("#locsDiv").on("scroll", function () {
        var cur = $(this).scrollTop();
        if (cur == 0) {
            $('#shadow').css({
				'opacity': '0', 
				'filter': 'alpha(opacity=0)',
			});
        } 
        else {
        	$('#shadow').css({
				'opacity': '1', 
				'filter': 'alpha(opacity=100)',
			});
        }
    });
    $("#locsDiv").trigger("scroll");

	$('body').mousemove(function(e){
		if(isDragging){
			drag(e.pageX, e.pageY);
		}
	});

	window.onresize=function(){
	    //alert('window resized dude !');
	    screenHeight = $(window).height();
		screenWidth = $(window).width();
	    $('body').css({
	    	width:$(window).width()+'px',
	    	height:$(window).height()+'px',
	    });
	}

	/*
	* BEHAVIOR OF FORMS
	*/
	validate();
    
	$('#nameField, #addressField').focusout(validate);

    $('#nameField').on('change keypress paste textInput input',function(){
    	validate();
    });
    //LIMIT GROUP NAME FIELD IN LENGTH
    $('#nameField').attr('onkeypress','if(this.value.length >= mylo_UI_init_variables[0].nameLimitLength) return false;');
    $('#nameField').bind('change keyup', function () {
        if ($(this).val().length > mylo_UI_init_variables[0].nameLimitLength) {
            //remove extra text which is more then maxlength
            $(this).val($(this).val().slice(0, mylo_UI_init_variables[0].nameLimitLength));
        }
    });

    $('#addressField').on('change keypress paste textInput input',function(){
    	if($('#nameField').val()){
	    	$('#validateButton').css({
				'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
				border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
	        });
	    }else{
	    	$('#validateButton').css({
				'background-color': '#'+mylo_UI_init_variables[0].formInactiveColor,
				border: '1px solid #'+mylo_UI_init_variables[0].formInactiveColor,
	        });
		}
    });
    //MAPS API
    //searchbox
    try{
    	//options of google searchbox
    	var defaultBounds = new google.maps.LatLngBounds(
		  new google.maps.LatLng(mylo_UI_init_variables[0].userpos.lat-mylo_UI_init_variables[0].searchbox_bounds, mylo_UI_init_variables[0].userpos.lon-mylo_UI_init_variables[0].searchbox_bounds),
		  new google.maps.LatLng(mylo_UI_init_variables[0].userpos.lat+mylo_UI_init_variables[0].searchbox_bounds, mylo_UI_init_variables[0].userpos.lon+mylo_UI_init_variables[0].searchbox_bounds));

		var options = {
		  bounds: defaultBounds
		};
    	//searchBox powered by google
		var searchBox = new google.maps.places.SearchBox(document.getElementById('addressField'),options);
		
		google.maps.event.addListener(searchBox, 'places_changed', function() {
		  	try{
			  	var place = searchBox.getPlaces()[0];
				if(!place.geometry){}else{
					
			   		if(!$('#nameField').val()){
			  			$('#nameField').val(place.name);
			  		}
			   
					$('#addressField').val(place.formatted_address);
					mylo_UI_init_variables[0].addingGPS=null;
				
					if(place.formatted_address.substring(0,8) != place.name.substring(0,8)){
			    		mylo_UI_init_variables[0].addingPublicName=place.name;
			  		}else{
			  			mylo_UI_init_variables[0].addingPublicName="";
			  		}
					validate();
			  	}
		  	}catch(err){
		    	//analytics.trackEvent("SearchBox_fail", "searchBoxError", err.message, 1);
		    }
		});
    }catch(err){
    	mylo_UI_init_variables[0].searchBoxInitError=1;
    	//analytics.trackEvent("Init_fail", "searchBoxInitError", err.message, 1);
    }
    
    /*
    * ADD GROUP FORM BEHAVIOR
    */
    $('#validateGroup').text(mylo_textes[0].add_group_form_validate_button);
    $('#groupnameField').attr("placeholder",mylo_textes[0].add_group_form_name_field_helper);
    $('#groupnameField').focusout(validateGroupNameField);
    $('#groupnameField').on('keypress change paste focus textInput input', function(){
    	validateGroupNameField();
    	//checkGroupNameFieldLength();
    });
    //LIMIT GROUP NAME FIELD IN LENGTH
    $('#groupnameField').attr('onkeypress','if(this.value.length >= mylo_UI_init_variables[0].groupNameLimitLength) return false;');
    $('#groupnameField').bind('change keyup', function () {
        if ($(this).val().length > mylo_UI_init_variables[0].groupNameLimitLength) {
            //remove extra text which is more then maxlength
            $(this).val($(this).val().slice(0, mylo_UI_init_variables[0].groupNameLimitLength));
        }
    });
    

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    *	LOADER
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    var canvas = document.getElementById("loader");
    canvas.width=200;
    canvas.height=200;
    canvas.style.width=100;
    canvas.style.height=100;
	var ctx = canvas.getContext("2d");
	// set context styles
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#2FBA90';
	ctx.shadowColor = "black"
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 0;
	
	var quart = Math.PI / 2;
	var PI2 = Math.PI * 2;
	var complete = Math.PI*1.5;
	var step = 0;

	var circle = {
    x: 100,
    y: 100,
    radius: 88,
    start: 0,
    end: 30,
    color: "#2FBA90"
	}

	function easeInOutCirc(t, b, c, d){
		t /= d/2;
		if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		t -= 2;
		return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
	};
	function easeOutCirc(t, b, c, d){
		t /= d;
		t--;
		return c * Math.sqrt(1 - t*t) + b;
	};

	function render(guage, step){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.beginPath();
	    if(step<=guage.end){
			var current = easeOutCirc(step, -quart, PI2, guage.end);
	    	ctx.arc(guage.x, guage.y, guage.radius, -quart, current);
		}else{
			var current = easeOutCirc(step-guage.end, -quart, PI2, guage.end);
	    	ctx.arc(guage.x, guage.y, guage.radius, current, complete);
		}
	    ctx.strokeStyle = guage.color;
	    ctx.stroke();
	}

	function animateLoader(){
	    //if loading's not finished: request another frame
	    if(mylo_UI_init_variables[0].loading){
		    // if animation finished : back to the beggining step=0
		    if(step<circle.end*2){
		        requestAnimationFrame(animateLoader);
		    }else{
		    	step=0;
		    	requestAnimationFrame(animateLoader);
			}
			render(circle, step);
	    	step+=1;
		}
	}
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*	BEHAVIOR : Bind droppable & Click behavior of groups !
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$( ".group" ).click(function() {
		//GA
        GATrackerEvent("Button_click", "group", $(this).attr('name'));
        //
		//showAndroidToast('group click!!!');
		if(mylo_UI_init_variables[0].loading){return 0;}
	  	var groupToDisplay = $(this).attr('name');
		if(groupToDisplay==$('.currentGroup').attr('name') || groupToDisplay==$('.addGroup').attr('name') || mylo_UI_init_variables[0].isAddingPlace || mylo_UI_init_variables[0].isAddingGroup){
			//innactive
		}else{
			//alert(groupToDisplay);
			var idGroupToDisplay = parseInt(groupToDisplay);
			//getUserPosition(function(){
			var locToDisplay = getPositions(idGroupToDisplay);
			printUserLocation(idGroupToDisplay,locToDisplay,fadeIN2);
			//});
			var nameCurrent = $('.currentGroup').attr('name');
			$('[name="'+nameCurrent+'"]').removeClass('currentGroup');
			$(this).addClass('currentGroup');
		}
		//analytics.trackEvent("Button_click", "group", groupToDisplay, 1);
	});
	$( "#add_place" ).click(function(){
		//GA
        GATrackerEvent("Button_click", "add_place", "open");
        //
		if(mylo_UI_init_variables[0].isAddingGroup || mylo_UI_init_variables[0].loading){}else{
			//STOP ANY POSSIBLE ONGOING AND AWAITING ANIMATIONS
			$('#locsWraper').stopAnima(true);

			if(mylo_UI_init_variables[0].isAddingPlace){//already adding place=> close addingPlace
				//hideAddPlaceScreen(0);
				//analytics.trackEvent("Button_click", "add_place", "close", 1);
			}else{//Not already adding place => OPEN add place
				//cleaning fields
				$('#addressField').blur();
				$('#nameField').blur();
				step=0;
				//DISPLAY ADD PLACE SCREEN
				displayAddPlaceScreen();
				//analytics.trackEvent("Button_click", "add_place", "open", 1);
			}
		}
		
	});
	$('#close_add_loc').click(function(){
		//GA
        GATrackerEvent("Button_click", "close_add_loc", "close");
        //
		if(mylo_UI_init_variables[0].isAddingPlace){
			//CLOSE ADDING PLACE
			hideAddPlaceScreen(0);
			//analytics
			//analytics.trackEvent("Button_click", "close_add_loc", "close", 1);	
		}
	});
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	function positionLoad(delay){
		var todelay=0;
		if(delay){
			todelay=delay;
		}
		if(mylo_UI_init_variables[0].searching_position==1){
			$('#location_loader').delayAnima(todelay).anima({
				opacity: '0',
				filter: 'alpha(opacity=0)',
		  	}, 350, '0.55, 0.055, 0.675, 0.19',{complete:function(){
	  				$('#location_loader').anima({
						opacity: '1',
						filter: 'alpha(opacity=100)',
				  	}, 350, '0.215, 0.61, 0.355, 1',{complete: positionLoad});
		  		}
			});
		}
	}*/
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$('#add_gps').click(function(){
		//GA
        GATrackerEvent("Button_click", "add_gps", "open");
        //
		if(mylo_UI_init_variables[0].loading){return 0;}
		if(mylo_UI_init_variables[0].isAddingPlace){
			//hideAddPlaceScreen(0);
			//analytics.trackEvent("Button_click", "add_gps", "close", 1);
		}else{//Not already adding place => OPEN add place
			//LOADER: launch loader
			$('#loader_container').css({display:'block'});
			mylo_UI_init_variables[0].loading=1;
			animateLoader();
			mylo_UI_init_variables[0].searching_position=1;
			//GET USER LOCATION in lat lng
			//var p = {lat:0,lon:0};
			mylo_UI_init_variables[0].addingGPS=mylo_UI_init_variables[0].userpos;
			//GET ADR of lat & lng
	        var latlng = new google.maps.LatLng(mylo_UI_init_variables[0].userpos.lat,mylo_UI_init_variables[0].userpos.lon);
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( {'location': latlng}, function(results, status){
			    if (status == google.maps.GeocoderStatus.OK) {
			        //FILL the fields with data
			  		var address = results[0].formatted_address;
			   		//$('#gps_txt').text(address);
					$('#gps_txt').html('<span class="gpsTxt">'+mylo_textes[0].location_gps_addr_txt+'</span>'+address);
			   		$('#gps_txt').css('display','block');
			   		$('#gps_img').css('display','block');
			   		//hide search field
			   		$('#input_container').css('display','none');
			   		validate();
			   		//OPEN ADD PLACE SCREEN
			   		step=0;
					displayAddPlaceScreen();
			    }else{
			        //TOAST NOTIF ERROR LOCATION NOT FOUND
			        //shortToast(function(){},function(err){},mylo_textes[0].error_add_place_form_location_not_found);
					showAndroidToast(mylo_textes[0].error_add_place_form_location_not_found);
					//analytics.trackEvent("Action_fail", "find_location_err", status, 1);
					//GA
			        GATrackerEvent("Action_fail", "find_location_err", status);
			        //

			    }
			  	//LOADER: hide loader
			    mylo_UI_init_variables[0].searching_position=0;
			    $('#loader_container').css({display:'none'});
				$('#loader').css({display:'block'});
				$('#loader_end').css({display:'none'});
				mylo_UI_init_variables[0].loading=0;
				step=0;
			});
			
		}
		return 1;
	});

	/*
	*	Validate the form, add the place to loc Array, display current group with new loc
	*/
	$('#validateButton').click(function() {
		//GA
        GATrackerEvent("Button_click", "Validate_place", "");
        //
		if(checkFields()){
			//LOADER: launch the loader
			$('#loader_container').css({display:'block'});
			mylo_UI_init_variables[0].loading=1;
			animateLoader();
			//ADD NEW LOC TO STORAGE AND LOC ARRAY
			var name = $('#nameField').val();
			var adr = $('#addressField').val();
			var latlon = {lat:0,lon:0,adr:"",country:""};
			var country ="";
			var idGroup = parseInt($('.currentGroup').attr('name'));
			
			if(mylo_UI_init_variables[0].addingGPS!=null){//specific gps position asked
				addLocation(name, $('#gps_txt').text(), idGroup, mylo_UI_init_variables[0].addingGPS.lat, mylo_UI_init_variables[0].addingGPS.lon, country,mylo_UI_init_variables[0].addingPublicName, 1);
				//LOADER: Display end of load
				$('#loader').css({display:'none'});
				$('#loader_end').css({display:'block'});
				mylo_UI_init_variables[0].loading=0;
				step=0;

				// CLOSE ADDING PLACE AND DISPLAY CURRENT GROUP WITH NEW LOC
				var locsToPrint = getPositions(idGroup);
				printUserLocation(idGroup,locsToPrint,fadeIn1);
				//CLOSE ADDING PLACE
				hideAddPlaceScreen(400);	//in hideAddPlaceScreen => hide LOADER
			}else{
				//check addr and get lat & lon of addr
				try {
			    	var geocoder = new google.maps.Geocoder();
					geocoder.geocode( {'address': adr}, function(results, status){
					    if (status == google.maps.GeocoderStatus.OK) {
					        latlon.lat = results[0].geometry.location.lat();
					        latlon.lon = results[0].geometry.location.lng();
					        latlon.adr = results[0].formatted_address;
					        // adress and location found => add location
							addLocation(name, latlon.adr, idGroup, latlon.lat, latlon.lon, country,mylo_UI_init_variables[0].addingPublicName, 0);
							//LOADER: Display end of load
							$('#loader').css({display:'none'});
							$('#loader_end').css({display:'block'});
							mylo_UI_init_variables[0].loading=0;
							step=0;

							// CLOSE ADDING PLACE AND DISPLAY CURRENT GROUP WITH NEW LOC
							var locsToPrint = getPositions(idGroup);
							printUserLocation(idGroup,locsToPrint,fadeIn1);
							//CLOSE ADDING PLACE
							hideAddPlaceScreen(400);	//in hideAddPlaceScreen => hide LOADER
					    }else{
					        //TOAST NOTIF ERROR ADDRESS NOT FOUND
							//alert(mylo_textes[0].error_add_place_form_addr_not_found+' 1');
							//shortToast(function(){},function(err){
							//	alert(err);
							//},mylo_textes[0].error_add_place_form_addr_not_found);
					        showAndroidToast(mylo_textes[0].error_add_place_form_addr_not_found);
					        //LOADER: Hide loader
							$('#loader_container').css({display:'none'});
							$('#loader').css({display:'block'});
							$('#loader_end').css({display:'none'});
							mylo_UI_init_variables[0].loading=0;
							step=0;
							//GA
					        GATrackerEvent("Action_fail", "add_location_err", status);
					        //
					    }
					});    
			    }catch(err){
			    	//TOAST NOTIF ERROR CONNEXION PB
					//alert(mylo_textes[0].error_add_place_form_connexion_pb);
					//shortToast(function(){},function(err){
					//	alert(err);
					//},mylo_textes[0].error_add_place_form_connexion_pb);
			        //alert(err.message);	//connexion pb
			        showAndroidToast(mylo_textes[0].error_add_place_form_connexion_pb);
			        //LOADER: Hide loader
					$('#loader_container').css({display:'none'});
					$('#loader').css({display:'block'});
					$('#loader_end').css({display:'none'});
					mylo_UI_init_variables[0].loading=0;
					step=0;
					//GA
			        GATrackerEvent("Action_fail", "add_location_err", err.message);
			        //
			    }
			}
		}else{
			//TOAST NOTIF ERROR MISSING FIELDS
			//alert(mylo_textes[0].error_add_place_form_empty_fields);
			//shortToast(function(){},function(err){
			//	alert(err);
			//},mylo_textes[0].error_add_place_form_empty_fields);
			showAndroidToast(mylo_textes[0].error_add_place_form_empty_fields);
			//GA
	        GATrackerEvent("Action_fail", "add_location_err", "missing fields");
	        //
		}
	});

	$('#saveButton').click(function() {
		console.log('in edit place: save Button pressed');
		//hideAndroidSoftwareKeyboard();
		//logBodySize();
		//GA
        GATrackerEvent("Button_click", "Save_place", "");
        //
		if(checkFields()){
			console.log("locId: "+mylo_UI_init_variables[0].editPlace.id+" locname: "+$('#nameField').val());
			editPlacesName(mylo_UI_init_variables[0].editPlace.id,$('#nameField').val());
			//LOADER: Display end of load
			$('#loader').css({display:'none'});
			$('#loader_end').css({display:'block'});
			mylo_UI_init_variables[0].loading=0;
			step=0;

			// CLOSE EDIT PLACE AND DISPLAY CURRENT GROUP WITH NEW LOC
			var idGroup = parseInt($('.currentGroup').attr('name'));
			var locsToPrint = getPositions(idGroup);
			printUserLocation(idGroup,locsToPrint,fadeIn1);
			//CLOSE EDIT PLACE
			hideAddPlaceScreen(400);	//in hideAddPlaceScreen => hide LOADER
		}else{
			//GA
	        GATrackerEvent("Action_fail", "save_location_err", "missing fields");
	        //
		}
	});
	

	/*
	*	Validate the form, add the place to loc Array, display current group with new loc
	*/
	$('#validateGroup').click(function() {
		//GA
        GATrackerEvent("Button_click", "Validate_group", "");
        //
		if($('#groupnameField').val()){
			var div = document.getElementsByName("addGroupIcon")[0];
			//ADD NEW LOC TO STORAGE AND LOC ARRAY
			var name = $('#groupnameField').val();
			addGroup(name);
			hideAddGroupDiv();
			deg = 0;
			div.style.webkitTransform = 'rotate('+deg+'deg)'; 
		    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
		    div.style.msTransform     = 'rotate('+deg+'deg)'; 
		    div.style.oTransform      = 'rotate('+deg+'deg)'; 
		    div.style.transform       = 'rotate('+deg+'deg)';
		    mylo_UI_init_variables[0].isAddingGroup = !mylo_UI_init_variables[0].isAddingGroup;
			//CLEAR TEXT INPUT AREA
			$('#groupnameField').val('');
			//clear validategroupbutton
			$('#validateGroup').css({
				'background-color': '#cccccc',
				border: '1px solid #cccccc',
	        });
		}else{
			//MISSING FIELDS
			//shortToast(function(){},function(err){
			//	alert(err);
			//},mylo_textes[0].error_add_group_form_empty_fields);
			showAndroidToast(mylo_textes[0].error_add_group_form_empty_fields);
			//GA
	        GATrackerEvent("Action_fail", "add_group_err", "missing fields");
	        //

		}
	});
});