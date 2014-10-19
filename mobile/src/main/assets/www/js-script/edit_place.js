function initEditPlaceWindow(){
    /*$('#editPlace').find('#add_header').find('#close_txt').text(mylo_textes[0].edit_place_form_title);
    $('#editPlace').css({
        width : screenWidth-20,
        top: screenHeight,
        left:10,
        //opacity: '0', 
        //filter: 'alpha(opacity=0)',
    });
    //
    $('#editPlace').find('#nameField').css({
        width : $('#editPlace').outerWidth()-mylo_UI_init_variables[0].addPlacePadding*2.2+'px',
    });
    //
    $('#editPlace').find('#close_add_loc').click(function(){
        //GA
        GATrackerEvent("Button_click", "close_add_loc", "close");
        //
        if(mylo_UI_init_variables[0].isAddingPlace){
            //CLOSE ADDING PLACE
            hideAddPlaceScreen(0);
        }
    });
    //FORMULAIRE
    $('#editPlace').find('#nameField').attr("placeholder",mylo_textes[0].edit_place_form_place_name_field_helper);
    $('#editPlace').find('#nameField').focusout(validateEditPlaceForm);
    $('#editPlace').find('#nameField').on('keypress keyup change paste textInput input',function(){
        validateEditPlaceForm();
    });*/
}
function setEditPlaceScreen(){
    /*$('#editPlace').stopAnima(true);
    var startTop = screenHeight;
    $('#editPlace').css("top",startTop);
    var top = (screenHeight - $('#editPlace').outerHeight())/2;
    //display map
    var myLatlng = new google.maps.LatLng(mylo_UI_init_variables[0].editPlace.lat,mylo_UI_init_variables[0].editPlace.lon);
    if(mylo_UI_init_variables[0].edit_map!=null && mylo_UI_init_variables[0].edit_loc_marker!=null){
        mylo_UI_init_variables[0].edit_map.setCenter(myLatlng);
        mylo_UI_init_variables[0].edit_map.setZoom(mylo_UI_init_variables[0].map_zoom_level);
        mylo_UI_init_variables[0].edit_loc_marker.setPosition(myLatlng);
    }
    //ANIMATE
    $('#editPlace').css("z-index","6000");
    $('#editPlace').anima({
        'top': top,
        }, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){
    }});*/
    /*$('#editPlace').css("z-index","6000");
    $('#editPlace').css("top",top);
    $('#editPlace').css("left",10);*/
}
function closeEditPlaceWindow(){
    /*$('#editPlace').stopAnima(true);
    $('#editPlace').anima({
        'top': screenHeight,
        }, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){
            $('#editPlace').css("z-index","-200");
    }});
    
    //$('#editPlace').css("top",screenHeight);
    //
    $('#editPlace').find('#nameField').blur();
    $('#editPlace').find('#nameField').val('');
    $('#edit_gps_txt').html('');*/
}
function setEditPlaceMap(){
	/*$('#editPlace').find('#edit-map-canvas').css({
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
    mylo_UI_init_variables[0].edit_map = new google.maps.Map(document.getElementById('edit-map-canvas'), mapOptions);
    
    var customMapType = new google.maps.StyledMapType(styles, styledMapOptions);

    mylo_UI_init_variables[0].edit_map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    mylo_UI_init_variables[0].edit_loc_marker = new google.maps.Marker({
      position: myLatlng,
      map: mylo_UI_init_variables[0].edit_map,
      title: 'Hello World!'
    });

    google.maps.event.addListenerOnce(mylo_UI_init_variables[0].edit_map, 'idle', function(){
        // do something only the first time the map is loaded
        //@mapCopyright - gets the google copyright tags
        var mapCopyright=document.getElementById('edit-map-canvas').getElementsByTagName("a");   
        $(mapCopyright).click(function(){
            return false;
        });
    });*/
}