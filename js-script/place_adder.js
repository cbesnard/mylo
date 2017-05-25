function initAddWindows(){
	$('.add_window').css({
        //height: screenHeight-20+'px',
        width: screenWidth-20+'px',
        bottom: -screenHeight,
    });
    $('.add_window_title').css({
        width: screenWidth-89+'px',
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
	//
	$('#addPlace').find('#search_icon').css("margin-left",($('.add_window').outerWidth()-100)/2+"px");
	//$('#addPlace').find('#searchField_title').text(mylo_textes[0].add_place_form_searchField_title);
	//$('#addPlace').find('#nameField_title').text(mylo_textes[0].add_place_form_nameField_title);
}
function initAddGPSWindow(){
	$('#addGPS').find('#add_header').find('#close_txt').text(mylo_textes[0].add_place_form_title_gps);
	$('#addGPS').find('#add_header').find('#add_from_url').text(mylo_textes[0].add_place_from_URL_title);
	$('#addGPS').find('#add_header').find('#edit_place').text(mylo_textes[0].edit_place_form_title);
	$('#addGPS').find('#name_field_title').text(mylo_textes[0].edit_place_form_place_name_field_title)//
	//
	//init edit loc share and go loc buttons
	initShareGoEditLocButtons();
}
function setAddPlaceScreen(){
	$('#addPlace').stopAnima(true);
	//add marker + center map on user location
	try{
		var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].userpos.lat,mylo_UI_init_variables[0].userpos.lon);
		if(mylo_UI_init_variables[0].map!=null && mylo_UI_init_variables[0].marker!=null){
		    mylo_UI_init_variables[0].map.setCenter(myLatlng);
		    mylo_UI_init_variables[0].map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
		    mylo_UI_init_variables[0].marker.setPosition(myLatlng);  
		}
	}catch(err){

	}
	$('#addPlace').css("display","block");
}

function setAddGPSScreen(){
	if(mylo_UI_init_variables[0].editPlace!=null){
		$('#addGPS').find('#edit_place').html('');
		$('#addGPS').find('#edit_place').html('<span>'+mylo_UI_init_variables[0].editPlace.name+'</span>');
		$('.editPlaceElement').css("display","block");
	}
	try{
		if(mylo_UI_init_variables[0].addingGPS!=null){
		var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].addingGPS.lat,mylo_UI_init_variables[0].addingGPS.lon);
		}else if(mylo_UI_init_variables[0].currentGPS!=null){
		var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].currentGPS.lat,mylo_UI_init_variables[0].currentGPS.lon);
		} 

		if(mylo_UI_init_variables[0].map!=null && mylo_UI_init_variables[0].marker!=null){
		    mylo_UI_init_variables[0].map.setCenter(myLatlng);
		    mylo_UI_init_variables[0].map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
		    mylo_UI_init_variables[0].marker.setPosition(myLatlng);
			
			var group;
			if(mylo_UI_init_variables[0].editPlace!=null){
				$('#addGPS').find('#edit_place').html('');
				$('#addGPS').find('#edit_place').html('<span>'+mylo_UI_init_variables[0].editPlace.name+'</span>');
				group = mylo_UI_init_variables[0].editPlace.group;
			}else{
				group = parseInt($('.currentGroup').attr('name'));
			}
		    var image = {
				url: "png/mylo-icon-marker-g"+group+".png",
				size: new google.maps.Size(30,41), // the size it should be on the map
				scaledSize: new google.maps.Size(30,41), // the normal size of the image is 90x1100 because Retina asks double size.
				origin: new google.maps.Point(0, 0), // position in the sprite
				// The anchor for this image is the base of the flagpole at 0,32.
		    	anchor: new google.maps.Point(15, 41)                   
			};
		    mylo_UI_init_variables[0].marker.setIcon(image);
		}
	}catch(err){

	}
	$('#addGPS').css("z-index","6000");
	$('#addGPS').css("bottom",10);
	$('#addGPS').css("left",10);
}

function displayAddPlaceScreen(){
	changeAndroidAppState(1);
	$('#background').css("display","block");
	//$('#background').stop().clearQueue().fadeIn(200);
	if(mylo_UI_init_variables[0].addingGPS!=null || mylo_UI_init_variables[0].currentGPS!=null){
		setAddGPSScreen();
	}else if(mylo_UI_init_variables[0].editPlace!=null){
		setAddGPSScreen();
	}else{
		setAddPlaceScreen();
	}
	//BOOL mylo_UI_init_variables[0].isAddingPlace to 1
    mylo_UI_init_variables[0].isAddingPlace = !mylo_UI_init_variables[0].isAddingPlace;
}

function closeAddPlaceWindow(){
    $('#addPlace').css("display","none");
    //CLEAR ALL ADDING PLACE VARIABLES
	mylo_UI_init_variables[0].addingPublicName="";
}

function closeAddGPSWindow(){
	$('#addGPS').css("z-index","-200");
	$('#addGPS').css("bottom",-screenHeight);
	//
	$('#addGPS').find('#close_txt').css("display","block");
	$('#addGPS').find('#add_from_url').css("display","none");
	$('#addGPS').find('#edit_place').css("display","none");
	$('.editPlaceElement').css("display","none");
	//
	$("#addGPS").find("#validateButton").css("display","block");
   	$("#saveButton").css("display","none");
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
		if(mylo_UI_init_variables[0].addingGPS!=null || mylo_UI_init_variables[0].currentGPS!=null){
			closeAddGPSWindow();
		}else if(mylo_UI_init_variables[0].editPlace!=null){
			closeAddGPSWindow();
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
		var searchBox = new google.maps.places.Autocomplete(document.getElementById('addressField'),options);
		
		google.maps.event.addListener(searchBox, 'place_changed', function() {
		  	try{
			  	var place = searchBox.getPlace();
				if(!place.geometry){
					//console.log('currentGPS=place has no geometry');
				}else{
					if(!$("#addPlace").find('#nameField').val()){
			  			$("#addPlace").find('#nameField').val(place.name);
			  		}
			   
					$("#addPlace").find('#addressField').val(place.formatted_address);
					mylo_UI_init_variables[0].addingGPS=null;
					mylo_UI_init_variables[0].addPlace_currentGPS = {lat:0,lon:0};
					mylo_UI_init_variables[0].addPlace_currentGPS.lat = place.geometry.location.lat();
					mylo_UI_init_variables[0].addPlace_currentGPS.lon = place.geometry.location.lng();
					//console.log('place.geometry='+place.geometry.location.lat()+', '+place.geometry.location.lng());
					//console.log('currentGPS='+mylo_UI_init_variables[0].addPlace_currentGPS.lat+', '+mylo_UI_init_variables[0].addPlace_currentGPS.lon);
					
					//Update map infos
					var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].addPlace_currentGPS.lat,mylo_UI_init_variables[0].addPlace_currentGPS.lon);
					if(mylo_UI_init_variables[0].map_tab_map!=null){
					    mylo_UI_init_variables[0].map_tab_map.setCenter(myLatlng);
					    mylo_UI_init_variables[0].map_tab_map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
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
    	//GATrackerEvent("Init_fail", "searchBoxError", err.message);
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
    var delay = 10000;
	var timeout = null;
    $("#locsDiv").on("scroll", function () {
        var dir = detectDirection();
    	//console.log(dir);
        //console.log($(".add_buttons").css("bottom"));
        //console.log("adButtons bottom: "+element.style.bottom);
        if (dir == "down") {
        	//if($(".add_buttons").css("bottom")=="10px"){
        	if(queryElement.css("bottom")=="10px"){
        		queryElement.stopAnima(true);
        		queryElement.anima({
					'bottom': '-100px',
					}, 200, 'linear',{complete:function(){
				}});
    			//window.cancelAnimationFrame(globalID);
    			//var addButtonsPos = parseInt(queryElement.css("bottom"));
    			//globalID = translationAnimation(element,addButtonsPos,-100,200,"bottom","linear");
        	}

        } else {
        	if(queryElement.css("bottom")=="-100px"){
        		//console.log("anima called");
        		queryElement.stopAnima(true);
        		queryElement.anima({
					'bottom': '10px',
					}, 150, 'linear',{complete:function(){

				}});
    			//window.cancelAnimationFrame(globalID);
    			//var addButtonsPos = parseInt(queryElement.css("bottom"));
    			//globalID = translationAnimation(element,addButtonsPos,10,200,"bottom","linear");
        	}
        }
        clearTimeout(timeout);
	    timeout = setTimeout(function(){
	    	if(queryElement.css("bottom")=="-100px"){
	    		//var addButtonsPos = parseInt(queryElement.css("bottom"));
    			//globalID = translationAnimation(element,addButtonsPos,10,200,"bottom","linear");
    			queryElement.stopAnima(true);
	        	queryElement.anima({
					'bottom': '10px',
					}, 150, 'linear',{complete:function(){
				}});
	    	}
	    },delay);
    });
}

function initShareGoEditLocButtons(){
	/*
	*	SHARE BUTTON ONCLICK
	*/
	$('#edit_shareLocButton').click(function(event){
		event.stopPropagation();
		//GA
        //GATrackerEvent("Button_click", "share_loc", "");
        //
        var adressToEncode="";
		var adressMessage = "";
		var name = "";
        if(mylo_UI_init_variables[0].editPlace!=null){
        	var loc = mylo_UI_init_variables[0].editPlace;
        	name = loc.name; 
			if(loc.gps==1){
				adressToEncode = "@"+loc.lat+","+loc.lon;//@lat,lon
			}else{
				adressToEncode = loc.publicName+' '+loc.adr;
			}
			adressMessage = loc.adr;	
        }else if(mylo_UI_init_variables[0].addingGPS!=null){
        	name = "New GPS location";
        	adressToEncode = "@"+mylo_UI_init_variables[0].addingGPS.lat+","+mylo_UI_init_variables[0].addingGPS.lon;//@lat,lon
        	adressMessage = "latitude: "+mylo_UI_init_variables[0].addingGPS.lat+", longitude: "+mylo_UI_init_variables[0].addingGPS.lon;
        }else if(mylo_UI_init_variables[0].addingPublicName!=null){
        	name = mylo_UI_init_variables[0].addingPublicName;
        	adressToEncode = mylo_UI_init_variables[0].addingPublicName+" "+$('#addGPS').find('#addressField').val();
        	adressMessage = $('#addGPS').find('#addressField').val();
        }
		
		var urlToShare = 'http://maps.google.com/maps?q='+encodeURIComponent(adressToEncode);
		var message = name+', '+adressMessage+': '+urlToShare;
		shareAndroid(message);
	});
	/*
	*	GO BUTTON ONCLICK
	*/
	$('#edit_goLocButton').click(function(event){
		event.stopPropagation();
		var loc = mylo_UI_init_variables[0].editPlace; 
		//GA
        //GATrackerEvent("Button_click", "go_loc", "");
        var adressToEncode="";
		if(loc.gps==1){
			adressToEncode = loc.lat+","+loc.lon;//@lat,lon
		}else{adressToEncode = loc.publicName+' '+loc.adr;}
		var urlToShare = 'geo:'+loc.lat+","+loc.lon+'?q='+encodeURIComponent(adressToEncode);
		showOnMapsAndroid(urlToShare);
	});
}