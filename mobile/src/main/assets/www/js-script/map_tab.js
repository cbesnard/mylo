function setMap(){
	console.log("userpos: "+mylo_UI_init_variables[0].userpos.lat+","+mylo_UI_init_variables[0].userpos.lon);
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
    mylo_UI_init_variables[0].map_tab_map = new google.maps.Map(document.getElementById('map_tab'), mapOptions);

    var customMapType = new google.maps.StyledMapType(styles, styledMapOptions);

    mylo_UI_init_variables[0].map_tab_map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
    
    //var image = 'png/mylo-icon-user-marker.png';
    var image = {
	  url: "png/mylo-icon-user-marker.png",
	  size: new google.maps.Size(36,36), // the size it should be on the map
	  scaledSize: new google.maps.Size(36,36), // the normal size of the image is 90x1100 because Retina asks double size.
	  origin: new google.maps.Point(0, 0) // position in the sprite                   
	};
    mylo_UI_init_variables[0].map_user_marker = new google.maps.Marker({
      position: myLatlng,
      map: mylo_UI_init_variables[0].map_tab_map,
      icon: image
    });

    setMarkers(0);

    google.maps.event.addListenerOnce(mylo_UI_init_variables[0].map_tab_map, 'idle', function(){
        // do something only the first time the map is loaded
        //@mapCopyright - gets the google copyright tags
        var mapCopyright=document.getElementById('map-canvas').getElementsByTagName("a");   
        $(mapCopyright).click(function(){
            return false;
        });
    });
}

function centerMap(lat,lon){
	var myLatlng = new google.maps.LatLng(lat,lon);
	if(mylo_UI_init_variables[0].map_tab_map!=null && mylo_UI_init_variables[0].map_user_marker){
	    mylo_UI_init_variables[0].map_tab_map.setCenter(myLatlng);
	    mylo_UI_init_variables[0].map_tab_map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
	    mylo_UI_init_variables[0].map_user_marker.setPosition(myLatlng);
	}
}

function updateUserMarkerPosition(lat,lon){
	//console.log("Update user marker position: "+lat+","+lon);
	var myLatlng = new google.maps.LatLng(lat,lon);
	if(mylo_UI_init_variables[0].map_tab_map!=null && mylo_UI_init_variables[0].map_user_marker){
	    mylo_UI_init_variables[0].map_user_marker.setPosition(myLatlng);
	}
}

function clearMarkers(){
	console.log("ClearMarkers called");
	var i=0;
	for(i=0;i<markers.length;i++){
		markers[i].setMap(null);
	}
	markers = [];
}

function setMarkers(group_id){
	
	if(group_id==undefined || group_id==0){
		clearMarkers();
		var i=0;
		for(i=0;i<locations.length;i++){
			var myLatlng = new google.maps.LatLng(locations[i].lat,locations[i].lon);
			var image = {
				url: "png/mylo-icon-marker-g"+locations[i].group+".png",
				size: new google.maps.Size(30,41), // the size it should be on the map
				scaledSize: new google.maps.Size(30,41), // the normal size of the image is 90x1100 because Retina asks double size.
				origin: new google.maps.Point(0, 0), // position in the sprite
				// The anchor for this image is the base of the flagpole at 0,32.
		    	anchor: new google.maps.Point(15, 41)                   
			};
			(function(z){
			    var marker = new google.maps.Marker({
			      position: myLatlng,
			      map: mylo_UI_init_variables[0].map_tab_map,
			      icon: image,
			    });
			    marker.metadata = {id: locations[z].id};
			    console.log("marker metadata="+marker.metadata.id);
			    markers.push(marker);
			    //
		    
			    google.maps.event.addListener(marker, 'click', function() {
				    //Open edit place's screen
				    console.log("marker clicked and marker id="+marker.metadata.id);
				    //GA
			        GATrackerEvent("Marker_click", "edit_place", "");
			        //
			        var indice = marker.metadata.id;
			        //var indice = indiceOfMarker(marker);
			        //if(indice==-1){return;}
					mylo_UI_init_variables[0].editPlace=getLoc(indice);
					var loc = mylo_UI_init_variables[0].editPlace;
					var adr = loc.adr;
					var adr1 = "";
					if(loc.gps==1){
						adr1 = mylo_textes[0].location_gps_addr_txt;
					}
					var adr2 = adr.replace(adr1, "");
					var name = "New location";
					if(loc.name!=""){
						name=loc.name;
					}
					$('#gps_txt').html('<span class="name"></span><br/><span class="gpsTxt">'+adr1+'</span>'+adr2);
			   		$('#gps_txt').find('.name').text(name);
			   		//
			   		$("#addGPS").find("#validateButton").css("display","none");
			   		$("#saveButton").css("display","block");
			   		//
			   		$('#addGPS').find('#close_txt').css("display","none");
					$('#addGPS').find('#edit_place').css("display","block");
			   		//
			   		mylo_UI_init_variables[0].addingGPS = {lat:loc.lat,lon:loc.lon};
			   		//hide search field
			   		validate();
			   		//OPEN ADD PLACE SCREEN
			   		displayAddPlaceScreen();
				});
			})(i);
		}
	}else{
		clearMarkers();
		var i=0;
		for(i=0;i<locations.length;i++){
			if(locations[i].group==group_id){
				var myLatlng = new google.maps.LatLng(locations[i].lat,locations[i].lon);
				var image = {
					url: "png/mylo-icon-marker-g"+locations[i].group+".png",
					size: new google.maps.Size(30,41), // the size it should be on the map
					scaledSize: new google.maps.Size(30,41), // the normal size of the image is 90x1100 because Retina asks double size.
					origin: new google.maps.Point(0, 0), // position in the sprite
					// The anchor for this image is the base of the flagpole at 0,32.
			    	anchor: new google.maps.Point(15, 41)                   
				};
			    var marker = new google.maps.Marker({
			      position: myLatlng,
			      map: mylo_UI_init_variables[0].map_tab_map,
			      icon: image
			    });
			    markers.push(marker);
			}
		}
	}
	var t=0;
	for(t=0;t<markers.length;t++){
		console.log("marker n°"+t+" id="+markers[t].metadata.id);
	}
}

function indiceOfMarker(marker){
	var t=0;
	var indice =-1;
	for(t=0;t<markers.length;t++){
		//console.log("marker n°"+t+" id="+markers[t].metadata.id);
		if(markers[t].getTitle()===marker.getTitle()){
			indice = t;
			break;
		}
	}
	return indice;
}	

