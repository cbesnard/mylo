/*
*	GetUserPosition
*/
function setUserPosition(lat,lon){
	var p = {lat:0,lon:0};
	p.lat = lat;
    p.lon = lon;
    mylo_UI_init_variables[0].userpos=p;
    var d = new Date();
    mylo_UI_init_variables[0].userpos_time=d.getTime();
    refreshLocsdist();
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	onBackKeyDown
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function androidBackButtonPressed(){
	changeAndroidAppState(0);
	if(mylo_UI_init_variables[0].isAddingPlace){
		//close adding place
		hideAddPlaceScreen(0);
		$('.group').css({
    		opacity: '1', 
			filter: 'alpha(opacity=100)',
        });
        //GA
        GATrackerEvent("Button_click", "back_button", "close_add_place");
        //
	}else if(mylo_UI_init_variables[0].isAddingGroup){
		//close adding group
		var deg = 0;
		var div = document.getElementsByName("addGroupIcon")[0];
		
		hideAddGroupDiv();
		div.style.webkitTransform = 'rotate('+deg+'deg)'; 
	    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
	    div.style.msTransform     = 'rotate('+deg+'deg)'; 
	    div.style.oTransform      = 'rotate('+deg+'deg)'; 
	    div.style.transform       = 'rotate('+deg+'deg)';
	    mylo_UI_init_variables[0].isAddingGroup = !mylo_UI_init_variables[0].isAddingGroup;
	    //GA
        GATrackerEvent("Button_click", "back_button", "close_add_group");
        //

	}else{
		
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	VIBRATE
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function vibrate(milliseconds) {
	Android.phoneVibrate(milliseconds);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	SEND ANDROID GA TRACKER EVENT
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function GATrackerEvent(category, action, label){
	Android.addGAEvent(category, action, label);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	CHANGE ANDOIRD APP STATE TO HANDLE BACKBUTTON PRESSED
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function changeAndroidAppState(state){
	Android.setAppState(state);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	showOnMapsAndroid
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function showOnMapsAndroid(uri){
    Android.showOnMaps(uri);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	SHARE
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function shareAndroid(msg){
    Android.share(msg);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	TOAST
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function showAndroidToast(toast){
    Android.showToast(toast);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	STORE DATA
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function storeDataInAndroid(){
	var dataToWrite = {locs:locations,groups:userGroups};
	var stringData = JSON.stringify(dataToWrite);
    Android.storeDatas(stringData);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	LAUNCH LOADER
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function launchLoader(){
	$('#loader_container').css({display:'block'});
	mylo_UI_init_variables[0].loading=1;
	animateLoader();
	mylo_UI_init_variables[0].searching_position=1;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	STOP LOADER
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function stopLoader(showEndOfLoad){
	if(showEndOfLoad){
		$('#loader').css({display:'none'});
		$('#loader_end').css({display:'block'});
		mylo_UI_init_variables[0].loading=0;
		step=0;
	}else{
		//LOADER: hide loader
	    mylo_UI_init_variables[0].searching_position=0;
	    $('#loader_container').css({display:'none'});
		$('#loader').css({display:'block'});
		$('#loader_end').css({display:'none'});
		mylo_UI_init_variables[0].loading=0;
		step=0;
	}
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	ADD GPS POSITION FROM LINK
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function addGPSFromLink(lat,lon, addrEncoded){
	$('#loader_container').css({display:'block'});
	mylo_UI_init_variables[0].loading=1;
	animateLoader();
	mylo_UI_init_variables[0].searching_position=1;
	//GET USER LOCATION in lat lng
	mylo_UI_init_variables[0].addingGPS = {lat:lat,lon:lon};
	var addr = null;
	//DECODE NAME & ADDR
	if(addrEncoded.length>0){
        //RETRIEVE USER DATA
        var d = window.atob(addrEncoded);
        addr = _utf8_decode(d);
    }
	//GET ADR of lat & lng
	$('#gps_txt').html('<span class="gpsTxt">'+mylo_textes[0].location_gps_addr_txt+'</span>'+addr);
	$('#gps_txt').css('display','block');
	$('#gps_img').css('display','block');
	//hide search field
	$('#input_container').css('display','none');
	$('#nameField').val('New GPS location');
	validate();
	//OPEN ADD PLACE SCREEN
	stopLoader();
	displayAddPlaceScreen();
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	ADD PUBLIC PLACE FROM LINK
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function addPublicPlaceFromLink(name,addr,lat,lon){
	$('#loader_container').css({display:'block'});
	mylo_UI_init_variables[0].loading=1;
	animateLoader();
	mylo_UI_init_variables[0].searching_position=1;
	var locname = null;
	var locaddr = null;
	//DECODE NAME & ADDR
	if(name.length>0){
        //RETRIEVE USER DATA
        var d = window.atob(name);
        locname = _utf8_decode(d);
    }
    if(addr.length>0){
        //RETRIEVE USER DATA
        var e = window.atob(addr);
        locaddr = _utf8_decode(e);
    }
    if(locname==null){
    	locname = "New Place";
    }
	//NAME
	mylo_UI_init_variables[0].addingPublicName=locname;
	//ADDR
	$('#gps_txt').html('<span class="name"></span><br/><span class="gpsTxt">'+mylo_textes[0].location_gps_addr_txt+'</span>'+locaddr);
	$('#gps_txt').find('.name').text(locname);
	$('#gps_txt').css('display','block');
	$('#gps_img').css('display','block');
	//hide search field
	$('#input_container').css('display','none');
	//
	$('#nameField').val(locname);
	$('#addressField').val(locaddr);
	//
	mylo_UI_init_variables[0].currentGPS = {lat:lat,lon:lon};
	validate();
	//STOP LOADER
	stopLoader();
	//OPEN ADD PLACE SCREEN
	displayAddPlaceScreen();
	
	/*try {
    	var geocoder = new google.maps.Geocoder();
		geocoder.geocode( {'address': locaddr}, function(results, status){
		    if (status == google.maps.GeocoderStatus.OK) {
		        //LAT LON
		        mylo_UI_init_variables[0].currentGPS = {lat:0,lon:0};
		        mylo_UI_init_variables[0].currentGPS.lat = results[0].geometry.location.lat();
		        mylo_UI_init_variables[0].currentGPS.lon = results[0].geometry.location.lng();
		        //latlon.adr = results[0].formatted_address;
		        //OPEN ADD PLACE SCREEN
				displayAddPlaceScreen();
		    }else{
		        //TOAST NOTIF ERROR ADDRESS NOT FOUND
				showAndroidToast(mylo_textes[0].error_add_place_form_addr_not_found);
		    }
		    //LOADER: Hide loader
		    $('#loader_container').css({display:'none'});
			$('#loader').css({display:'block'});
			$('#loader_end').css({display:'none'});
			mylo_UI_init_variables[0].loading=0;
			step=0;
		});    
    }catch(err){
    	//TOAST NOTIF ERROR CONNEXION PB
		showAndroidToast(mylo_textes[0].error_add_place_form_connexion_pb);
        //LOADER: Hide loader
		$('#loader_container').css({display:'none'});
		$('#loader').css({display:'block'});
		$('#loader_end').css({display:'none'});
		mylo_UI_init_variables[0].loading=0;
		step=0;
    }*/
}
