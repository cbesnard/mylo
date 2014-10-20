function initAddWindows(){
	$('.add_window').css({
        //height: screenHeight-20+'px',
        width: screenWidth-20+'px',
        bottom: -screenHeight,
    });
    $('#background').css({
        height: screenHeight+'px',
        width: screenWidth+'px',
        position:'absolute',
        top: 0,
        left:0,
    }); 
    initAddPlaceWindow();
    $('#addGPS').find('#input_container').css('display','none');

    initEditPlaceWindow();

    initAddGPSWindow();
}

function initAddPlaceWindow(){
	$('#addPlace').find('#add_header').find('#close_txt').text(mylo_textes[0].add_place_form_title_place);
	$('#addPlace').css("bottom",10);
	$('#addPlace').css("left",10);
}
function initAddGPSWindow(){
	$('#addGPS').find('#add_header').find('#close_txt').text(mylo_textes[0].add_place_form_title_gps);
}
function setAddPlaceScreen(){
	$('#addPlace').stopAnima(true);
	//add marker + center map on user location
	var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].userpos.lat,mylo_UI_init_variables[0].userpos.lon);
	if(mylo_UI_init_variables[0].map!=null && mylo_UI_init_variables[0].marker!=null){
	    mylo_UI_init_variables[0].map.setCenter(myLatlng);
	    mylo_UI_init_variables[0].map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
	    mylo_UI_init_variables[0].marker.setPosition(myLatlng);
	}
	$('#addPlace').css("display","block");
}

function setAddGPSScreen(){
	if(mylo_UI_init_variables[0].addingGPS!=null){
		var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].addingGPS.lat,mylo_UI_init_variables[0].addingGPS.lon);
	}

	if(mylo_UI_init_variables[0].map!=null && mylo_UI_init_variables[0].marker!=null){
	    mylo_UI_init_variables[0].map.setCenter(myLatlng);
	    mylo_UI_init_variables[0].map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
	    mylo_UI_init_variables[0].marker.setPosition(myLatlng);
	}
	$('#addGPS').css("z-index","6000");
	$('#addGPS').css("bottom",10);
	$('#addGPS').css("left",10);
}

function displayAddPlaceScreen(){
	//CLEAR ALL ADDING PLACE VARIABLES
	mylo_UI_init_variables[0].addingPublicName="";
	changeAndroidAppState(1);
	$('#background').css("display","block");
	//$('#background').stop().clearQueue().fadeIn(200);
	if(mylo_UI_init_variables[0].addingGPS!=null){
		setAddGPSScreen();
	}else if(mylo_UI_init_variables[0].editPlace!=null){
		setEditPlaceScreen();
	}else{
		setAddPlaceScreen();
	}
	//BOOL mylo_UI_init_variables[0].isAddingPlace to 1
    mylo_UI_init_variables[0].isAddingPlace = !mylo_UI_init_variables[0].isAddingPlace;
}

function closeAddPlaceWindow(){
    $('#addPlace').css("display","none");
}

function closeAddGPSWindow(){
	$('#addGPS').css("z-index","-200");
	$('#addGPS').css("bottom",-screenHeight);
}

function hideAddPlaceScreen(delay){
	var timer = window.setTimeout(function(){
		//LOADER: Hide loader
		$('#loader_container').css({display:'none'});
		$('#loader').css({display:'block'});
		$('#loader_end').css({display:'none'});
		//
		$('#background').css("display","none");
		//CLOSE ADD WINDOW
		if(mylo_UI_init_variables[0].addingGPS!=null){
			closeAddGPSWindow();
		}else if(mylo_UI_init_variables[0].editPlace!=null){
			closeEditPlaceWindow();
		}else{
			closeAddPlaceWindow();
		}
		//CLEAR ALL VARIABLES
		//CLEAR TEXT INPUT AREA
  		$('.add_window').find('#addressField').blur();
		$('.add_window').find('#nameField').blur();
		$('.add_window').find('#nameField').val('');
		$('.add_window').find('#addressField').val('');
		$('#gps_txt').html('');
		mylo_UI_init_variables[0].addingGPS=null;
		mylo_UI_init_variables[0].currentGPS=null;
		mylo_UI_init_variables[0].editPlace=null;
		mylo_UI_init_variables[0].addingPublicName="";
		validate();
		changeAndroidAppState(0);
	},delay);
	//BOOL mylo_UI_init_variables[0].isAddingPlace to 0
    mylo_UI_init_variables[0].isAddingPlace = !mylo_UI_init_variables[0].isAddingPlace;
}

function setAddnEditPlaceMap(){
	$('#addGPS').find('#map-canvas').css({
        width: '100%',
        height: '120px',
    });
    
    var styles = [
        {
          featureType: "poi",
          stylers: [
            {visibility: "off"}
          ]
        }
    ];

    var styledMapOptions = {
        name: 'Custom Style'
    };

    var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].userpos.lat,mylo_UI_init_variables[0].userpos.lon);
    var mapOptions = {
        zoom: mylo_UI_init_variables[0].map_zoom_level,
        center: myLatlng,
        disableDefaultUI: true,
        mapTypeId: MY_MAPTYPE_ID,
    }
    mylo_UI_init_variables[0].map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    var customMapType = new google.maps.StyledMapType(styles, styledMapOptions);

    mylo_UI_init_variables[0].map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    mylo_UI_init_variables[0].marker = new google.maps.Marker({
      position: myLatlng,
      map: mylo_UI_init_variables[0].map,
      title: 'Hello World!'
    });

    google.maps.event.addListenerOnce(mylo_UI_init_variables[0].map, 'idle', function(){
        // do something only the first time the map is loaded
        //@mapCopyright - gets the google copyright tags
        var mapCopyright=document.getElementById('map-canvas').getElementsByTagName("a");   
        $(mapCopyright).click(function(){
            return false;
        });
    });
}

function setAddPlaceAutocomplete(){
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
				if(!place.geometry){
					console.log('currentGPS=plae has no geometry');
				}else{
					
			   		if(!$('#nameField').val()){
			  			$('#nameField').val(place.name);
			  		}
			   
					$('#addressField').val(place.formatted_address);
					mylo_UI_init_variables[0].addingGPS=null;
					mylo_UI_init_variables[0].currentGPS = {lat:0,lon:0};
					mylo_UI_init_variables[0].currentGPS.lat = place.geometry.location.lat();
					mylo_UI_init_variables[0].currentGPS.lon = place.geometry.location.lng();
					console.log('place.geometry='+place.geometry.location.lat()+', '+place.geometry.location.lng());
					console.log('currentGPS='+mylo_UI_init_variables[0].currentGPS.lat+', '+mylo_UI_init_variables[0].currentGPS.lon);
					
					//Update map infos
					var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].currentGPS.lat,mylo_UI_init_variables[0].currentGPS.lon);
					if(mylo_UI_init_variables[0].map!=null && mylo_UI_init_variables[0].marker!=null){
					    mylo_UI_init_variables[0].map.setCenter(myLatlng);
					    mylo_UI_init_variables[0].map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
					    mylo_UI_init_variables[0].marker.setPosition(myLatlng);
					    //$('#map-canvas').css('display','block');
					}

					if(place.formatted_address.substring(0,8) != place.name.substring(0,8)){
			    		mylo_UI_init_variables[0].addingPublicName=place.name;
			  		}else{
			  			mylo_UI_init_variables[0].addingPublicName="";
			  		}
					validate();
			  	}
		  	}catch(err){
		    	//GATrackerEvent("Init_fail", "searchBoxError", err.message);
		    }
		});
    }catch(err){
    	mylo_UI_init_variables[0].searchBoxInitError=1;
    	GATrackerEvent("Init_fail", "searchBoxError", err.message);
    }
}

function initAddButtons(){
	var globalID;
	var lastScrollTop = 0,
        st,
        direction;
    var element = document.getElementById("addButtons");
    var queryElement = $('#addButtons');
    function detectDirection() {
        st = $("#locsDiv").scrollTop();
        if (st > lastScrollTop) {
            direction = "down";
        } else {
            direction = "up";
        }
        lastScrollTop = st;
        return  direction;
    }
    var delay = 1500;
	var timeout = null;
    $("#locsDiv").on("scroll", function () {
        var dir = detectDirection();
    	//console.log(dir);
        //console.log($(".add_buttons").css("bottom"));
        console.log("adButtons bottom: "+element.style.bottom);
        if (dir == "down") {
        	//if($(".add_buttons").css("bottom")=="10px"){
        	if(queryElement.css("bottom")=="10px"){
        		/*$('.add_buttons').stopAnima(true);
        		$('.add_buttons').anima({
					'bottom': '-100px',
					}, 200, 'linear',{complete:function(){

				}});*/
    			window.cancelAnimationFrame(globalID);
    			var addButtonsPos = parseInt(queryElement.css("bottom"));
    			globalID = translationAnimation(element,addButtonsPos,-100,200,"bottom","linear");
        	}

        } else {
        	if(queryElement.css("bottom")=="-100px"){
        		//console.log("anima called");
        		/*$('.add_buttons').stopAnima(true);
        		$('.add_buttons').anima({
					'bottom': '10px',
					}, 150, 'linear',{complete:function(){

				}});*/
    			window.cancelAnimationFrame(globalID);
    			var addButtonsPos = parseInt(queryElement.css("bottom"));
    			globalID = translationAnimation(element,addButtonsPos,10,200,"bottom","linear");
        	}
        }
        clearTimeout(timeout);
	    timeout = setTimeout(function(){
	    	if(queryElement.css("bottom")=="-100px"){
	    		var addButtonsPos = parseInt(queryElement.css("bottom"));
    			globalID = translationAnimation(element,addButtonsPos,10,200,"bottom","linear");
	    	}
	        /*$('.add_buttons').stopAnima(true);
        	$('.add_buttons').anima({
				'bottom': '10px',
				}, 150, 'linear',{complete:function(){
			}});*/
	    },delay);
    });
}