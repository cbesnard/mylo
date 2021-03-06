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

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	* GOOGLE MAPS LAZY LOAD
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	initMapsScripts();

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*	SET UI ELEMENTS BEHAVIOR
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	initAddButtons();
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
	setFormBehavior();
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*   LOADER
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	canvas = document.getElementById("loader");
	canvas.width=200;
	canvas.height=200;
	canvas.style.width=100;
	canvas.style.height=100;
	ctx = canvas.getContext("2d");
	// set context styles
	ctx.lineWidth = 10;
	ctx.strokeStyle = '#2FBA90';
	ctx.shadowColor = "black"
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 0;

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	*	BEHAVIOR : Bind droppable & Click behavior of groups !
	* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	$( ".group" ).click(function() {
		//GA
        //GATrackerEvent("Button_click", "group", $(this).attr('name'));
        //
		if(mylo_UI_init_variables[0].loading){return 0;}
	  	var groupToDisplay = $(this).attr('name');
		if(groupToDisplay==$('.currentGroup').attr('name') || groupToDisplay==$('.addGroup').attr('name') || mylo_UI_init_variables[0].isAddingPlace || mylo_UI_init_variables[0].isAddingGroup){
			//innactive
		}else{
			var idGroupToDisplay = parseInt(groupToDisplay);
			var locToDisplay = getPositions(idGroupToDisplay);
			printUserLocation(idGroupToDisplay,locToDisplay,fadeIN2);
			//
			setMarkers(idGroupToDisplay);
			//
			var nameCurrent = $('.currentGroup').attr('name');
			$('[name="'+nameCurrent+'"]').removeClass('currentGroup');
			$(this).addClass('currentGroup');
		}
	});
	$( "#add_place" ).click(function(){
		//GA
        //GATrackerEvent("Button_click", "add_place", "open");
        //
		if(mylo_UI_init_variables[0].isAddingGroup || mylo_UI_init_variables[0].loading){}else{
			//STOP ANY POSSIBLE ONGOING AND AWAITING ANIMATIONS
			if(mylo_UI_init_variables[0].isAddingPlace){//already adding place=> close addingPlace
			}else{//Not already adding place => OPEN add place
				//cleaning fields
				$('#addressField').blur();
				$('#nameField').blur();
				mylo_UI_init_variables[0].currentGPS=null;
				step=0;
				//DISPLAY ADD PLACE SCREEN
				displayAddPlaceScreen();
			}
		}
		
	});
	$('.add_window').find('#close_add_loc').click(function(){
		//GA
        //GATrackerEvent("Button_click", "close_add_loc", "close");
        //
		if(mylo_UI_init_variables[0].isAddingPlace){
			hideAddPlaceScreen(0);
		}
	});
	$('#add_gps').click(function(){
		//GA
        //GATrackerEvent("Button_click", "add_gps", "open");
        //
		if(mylo_UI_init_variables[0].loading){return 0;}
		if(mylo_UI_init_variables[0].isAddingPlace){
		}else{//Not already adding place => OPEN add place
			mylo_UI_init_variables[0].searching_position=1;
			getUserPosition()
    }
		return 1;
	});

	/*
	*	Validate the form, add the place to loc Array, display current group with new loc
	*/
	$('#addPlace').find('#validateButton').click(function() {

		if(checkFields($(this).parent())) {
			//LOADER: launch the loader
			$('#loader_container').css({display:'block'});
			mylo_UI_init_variables[0].loading=1;
			animateLoader();
			//ADD NEW LOC TO STORAGE AND LOC ARRAY
			var latlon = {lat:0,lon:0,adr:"",country:""};
			var country ="";
			var idGroup = parseInt($('.currentGroup').attr('name'));

			var name = $('#addPlace').find('#nameField').val();
			var adr = $('#addPlace').find('#addressField').val();
			//check addr and get lat & lon of addr
			//console.log('IN VALIDATE: adr='+adr);
			addLocation(name, adr, idGroup, mylo_UI_init_variables[0].addPlace_currentGPS.lat, mylo_UI_init_variables[0].addPlace_currentGPS.lon, country,mylo_UI_init_variables[0].addingPublicName, 0);
			//LOADER: Display end of load
			$('#loader').css({display:'none'});
			$('#loader_end').css({display:'block'});
			mylo_UI_init_variables[0].loading=0;
			step=0;
			//REFRESH LOC ON MAP
			setMarkers(idGroup);
			// CLOSE ADDING PLACE AND DISPLAY CURRENT GROUP WITH NEW LOC
			var locsToPrint = getPositions(idGroup);
			printUserLocation(idGroup,locsToPrint,fadeIn1);
			//CLOSE ADDING PLACE
			hideAddPlaceScreen(400);	//in hideAddPlaceScreen => hide LOADER
			//GA
        	//GATrackerEvent("Button_click", "Validate_place", "PUBLIC_PLACE");
		}else{
			//TOAST NOTIF ERROR MISSING FIELDS
			showAndroidToast(mylo_textes[0].error_add_place_form_empty_fields);
			//GA
	        //GATrackerEvent("Action_fail", "add_location_err", "missing fields");
	        //
		}
	});

	/*
	*	Validate the form, add the place to loc Array, display current group with new loc
	*/
	$('#addGPS').find('#validateButton').click(function() {
		
        //
		if(checkFields($(this).parent())){
			//LOADER: launch the loader
			$('#loader_container').css({display:'block'});
			mylo_UI_init_variables[0].loading=1;
			animateLoader();
			//ADD NEW LOC TO STORAGE AND LOC ARRAY
			var latlon = {lat:0,lon:0,adr:"",country:""};
			var country ="";
			var idGroup = parseInt($('.currentGroup').attr('name'));

			if(mylo_UI_init_variables[0].addingGPS!=null){//specific gps position asked
				var name = $('#addGPS').find('#nameField').val();
				var adr = $('#addGPS').find('#addressField').val();
				//console.log(adr);//$('#gps_txt').text()
				addLocation(name, adr, idGroup, mylo_UI_init_variables[0].addingGPS.lat, mylo_UI_init_variables[0].addingGPS.lon, country,mylo_UI_init_variables[0].addingPublicName, 1);
				//LOADER: Display end of load
				$('#loader').css({display:'none'});
				$('#loader_end').css({display:'block'});
				mylo_UI_init_variables[0].loading=0;
				step=0;
				//REFRESH LOC ON MAP
				setMarkers(idGroup);
				// CLOSE ADDING PLACE AND DISPLAY CURRENT GROUP WITH NEW LOC
				var locsToPrint = getPositions(idGroup);
				printUserLocation(idGroup,locsToPrint,fadeIn1);
				//CLOSE ADDING PLACE
				hideAddPlaceScreen(400);	//in hideAddPlaceScreen => hide LOADER
				//GA
        		//GATrackerEvent("Button_click", "Validate_place", "GPS");
			}else{
				var name = $('#addGPS').find('#nameField').val();
				var adr = $('#addGPS').find('#addressField').val();
				//check addr and get lat & lon of addr
				//console.log('IN VALIDATE: adr='+adr);
				//console.log("Public place's name: "+mylo_UI_init_variables[0].addingPublicName);
				addLocation(name, adr, idGroup, mylo_UI_init_variables[0].currentGPS.lat, mylo_UI_init_variables[0].currentGPS.lon, country,mylo_UI_init_variables[0].addingPublicName, 0);
				//LOADER: Display end of load
				$('#loader').css({display:'none'});
				$('#loader_end').css({display:'block'});
				mylo_UI_init_variables[0].loading=0;
				step=0;
				//REFRESH LOC ON MAP
				setMarkers(idGroup);
				// CLOSE ADDING PLACE AND DISPLAY CURRENT GROUP WITH NEW LOC
				var locsToPrint = getPositions(idGroup);
				printUserLocation(idGroup,locsToPrint,fadeIn1);
				//CLOSE ADDING PLACE
				hideAddPlaceScreen(400);	//in hideAddPlaceScreen => hide LOADER
				//GA
        		//GATrackerEvent("Button_click", "Validate_place", "PUBLIC_PLACE");
			}
		}else{
			//TOAST NOTIF ERROR MISSING FIELDS
			showAndroidToast(mylo_textes[0].error_add_place_form_empty_fields);
			//GA
	        //GATrackerEvent("Action_fail", "add_location_err", "missing fields");
	        //
		}
	});

	$('#saveButton').click(function() {
		//console.log('in edit place: save Button pressed');
		//GA
        //GATrackerEvent("Button_click", "Save_place", "");
        //
		if(checkFields($(this).parent())){
			editPlacesName(mylo_UI_init_variables[0].editPlace.id,$('#addGPS').find('#nameField').val());
			//LOADER: Display end of load
			$('#loader').css({display:'none'});
			$('#loader_end').css({display:'block'});
			mylo_UI_init_variables[0].loading=0;
			step=0;
			//REFRESH LOC ON MAP
			setMarkers(idGroup);
			// CLOSE EDIT PLACE AND DISPLAY CURRENT GROUP WITH NEW LOC
			var idGroup = parseInt($('.currentGroup').attr('name'));
			var locsToPrint = getPositions(idGroup);
			printUserLocation(idGroup,locsToPrint,fadeIn1);
			//CLOSE EDIT PLACE
			hideAddPlaceScreen(400);	//in hideAddPlaceScreen => hide LOADER
		}else{
			//GA
	        //GATrackerEvent("Action_fail", "save_location_err", "missing fields");
	        //
		}
	});
});