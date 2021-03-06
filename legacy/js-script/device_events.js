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
    var id_active = $('.tabs').find('.active').attr('id');
    if( id_active == "map"){
    	updateUserMarkerPosition(lat,lon);
    }else{
    	refreshLocsdist();
    }
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
        //GATrackerEvent("Button_click", "back_button", "close_add_place");
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
        //GATrackerEvent("Button_click", "back_button", "close_add_group");
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
*	CHANGE ANDOIRD APP STATE TO HANDLE BACKBUTTON PRESSED
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function changeAndroidAppState(state){
	//Android.setAppState(state);
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
function addGPSLocation(lat,lon){
  console.log('register ' + lat + ' ' + lon);
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
	//GET USER LOCATION in lat lng
	mylo_UI_init_variables[0].addingGPS = {lat:lat,lon:lon};
	var addr = null;
	//DECODE NAME & ADDR
	if(addrEncoded.length>0){
        //RETRIEVE USER DATA
        var d = window.atob(addrEncoded);
        addr = _utf8_decode(d);
    }else{addr="";}
	//GET ADR of lat & lng
	var display = addr;
	if (display=="") {display = "latitude: "+lat+", longitude: "+lon;};
	$('#gps_txt').html('<span class="gpsTxt">'+mylo_textes[0].location_gps_addr_txt+'</span>'+display);
	$('#gps_txt').css('display','block');
	$('#gps_img').css('display','block');
	//hide search field
	$('#addGPS').find('#nameField').val('New GPS location');
	$('#addGPS').find('#addressField').val(addr);
	validateAddGPSForm();
	//STOP LOADER
	stopLoader();
	//OPEN ADD PLACE SCREEN
	displayAddPlaceScreen();
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	ADD PUBLIC PLACE FROM LINK
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function addPublicPlaceFromLink(name,addr,lat,lon){
	//console.log("in addPublicPlaceFromLink");
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
	$('#gps_txt').html('<span class="name"></span><br/><span class="gpsTxt"></span>'+locaddr);
	$('#gps_txt').find('.name').text(mylo_UI_init_variables[0].addingPublicName);
	$('#gps_txt').css('display','block');
	$('#gps_img').css('display','block');
	//
	$('#addGPS').find('#nameField').val(mylo_UI_init_variables[0].addingPublicName);
	$('#addGPS').find('#addressField').val(locaddr);
	//
	$('#addGPS').find('#close_txt').css("display","none");
	$('#addGPS').find('#add_from_url').css("display","block");
	//
	mylo_UI_init_variables[0].currentGPS = {lat:lat,lon:lon};

	validateAddGPSForm();
	//OPEN ADD PLACE SCREEN
	displayAddPlaceScreen();
	//STOP LOADER
	stopLoader();
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* GOOGLE MAPS LAZY LOAD
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function initMapsScripts(){
	if(mylo_UI_init_variables[0].map_tab_map==null || mylo_UI_init_variables[0].map==null){
    	getUserPosition()
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src  = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC4QjL6Ba54J2kY9SfprjB7UWol-Es-xbc&libraries=places&language=en&callback=gmap_draw";

		window.gmap_draw = function(){
	       	//MAPS
	       	setAddnEditPlaceMap();
	       	//EDIT PLACE MAP
	       	//setEditPlaceMap();
	        //INIT MAP TAB
		    setMap();
		    var groupToDisplay = $('.currentGroup').attr('name');
	    	var idGroupToDisplay = parseInt(groupToDisplay);
		    setMarkers(idGroupToDisplay);
			//AUTOCOMPLETE
			setAddPlaceAutocomplete();
		};
		$("head").append(s);
	}
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* UPDATE LOCS WITH MISSING ADDR
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function updateLocs(stringDatas){
	try{
        //console.log("Android data received is"+stringDatas);
        if(stringDatas.length>0){
            //RETRIEVE USER DATA
            var d = window.atob(stringDatas);
            var decoded = _utf8_decode(d);
            var updatedlocs = JSON.parse(decoded);
            for (var i = updatedlocs.length - 1; i >= 0; i--) {
            	var loc = updatedlocs[i];
            	for (var j = locations.length - 1; j >= 0; j--) {
        			if(locations[j].id==loc.id){
        				//console.log("actual loc addr: "+locations[j].adr+", updated addr: "+loc.adr);
        				locations[j].adr = loc.adr;
        			}
        			break;
        		}	
            }
            //DISPLAY REFRESHED USER DATAS
		    var groupToDisplay = $('.currentGroup').attr('name');
		    var idGroupToDisplay = parseInt(groupToDisplay);
		    var locToDisplay = getPositions(idGroupToDisplay);
		    printUserLocation(idGroupToDisplay,locToDisplay,fadeIn1);
		    //WRITE UPDATED DATA
		    storeDataInAndroid();
        }
    }catch(e){
       console.log("error : "+e.message);
    }
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* REFRESH SCREEN
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function refreshScreen(){
	//DISPLAY REFRESHED USER DATAS
    var groupToDisplay = $('.currentGroup').attr('name');
    var idGroupToDisplay = parseInt(groupToDisplay);
    var locToDisplay = getPositions(idGroupToDisplay);
    printUserLocation(idGroupToDisplay,locToDisplay,fadeIn1);
}
