function initForms(){
	$('.form').css({
        'margin-left': mylo_UI_init_variables[0].addPlacePadding+'px',
        'margin-right': mylo_UI_init_variables[0].addPlacePadding+'px',
    });
    /*
    * INPUT FIELDS
    */
    $('.add_window').find('.textInput').css({width: $('.add_window').outerWidth()-7-mylo_UI_init_variables[0].addPlacePadding*2+'px'});
    $('.add_window').find('#validateButton').text(mylo_textes[0].add_place_form_validate_button);
    $('.add_window').find('#validateButton').css({width: $('.add_window').outerWidth()-mylo_UI_init_variables[0].addPlacePadding*2.2+'px'});
    $('#saveButton').text(mylo_textes[0].edit_place_form_validate_button);
    $('#saveButton').css({width: $('.add_window').outerWidth()-mylo_UI_init_variables[0].addPlacePadding*2.2+'px'});
    $('.add_window').find('#addressField').attr("placeholder",mylo_textes[0].add_place_form_addr_field_helper);
    $('.add_window').find('#nameField').attr("placeholder",mylo_textes[0].add_place_form_place_name_field_helper);
    $('.formButton').css('margin-bottom','15px');
}

function setFormBehavior(){
	setAddPlaceForm();
	setAddGPSForm();
	setAddGroupForm();
}

function setAddPlaceForm(){
	validateAddPlaceForm();
    
	$('#addPlace').find('#nameField, #addressField').focusout(validateAddPlaceForm);

    $('#addPlace').find('#nameField').on('keypress keyup change paste textInput input',function(){
    	validateAddPlaceForm();
    });
    $('#addPlace').find('#addressField').on('change keypress paste textInput input',function(){
    	if($('#addPlace').find('#nameField').val()){
	    	$('#addPlace').find('#validateButton').css({
				'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
				border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
	        });
	    }else{
	    	$('#addPlace').find('#validateButton').css({
				'background-color': '#'+mylo_UI_init_variables[0].formInactiveColor,
				border: '1px solid #'+mylo_UI_init_variables[0].formInactiveColor,
	        });
		}
    });
}

function setAddGPSForm(){
	validateAddGPSForm();
    
	$('#addGPS').find('#nameField, #addressField').focusout(validateAddGPSForm);

    $('#addGPS').find('#nameField').on('keypress keyup change paste textInput input',function(){
    	validateAddGPSForm();
    });
    $('#addGPS').find('#addressField').on('change keypress paste textInput input',function(){
    	if($('#addGPS').find('#nameField').val()){
	    	$('#addGPS').find('#validateButton').css({
				'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
				border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
	        });
	    }else{
	    	$('#addGPS').find('#validateButton').css({
				'background-color': '#'+mylo_UI_init_variables[0].formInactiveColor,
				border: '1px solid #'+mylo_UI_init_variables[0].formInactiveColor,
	        });
		}
    });
}
/*
* ADD GROUP FORM BEHAVIOR
*/
function setAddGroupForm(){
	$('#validateGroup').text(mylo_textes[0].add_group_form_validate_button);
    $('#groupnameField').attr("placeholder",mylo_textes[0].add_group_form_name_field_helper);
    $('#groupnameField').focusout(validateGroupNameField);
    $('#groupnameField').on('keypress change paste focus textInput input', function(){
    	validateGroupNameField();
    });
    //LIMIT GROUP NAME FIELD IN LENGTH
    $('#groupnameField').attr('onkeypress','if(this.value.length >= mylo_UI_init_variables[0].groupNameLimitLength) return false;');
    $('#groupnameField').bind('change keyup', function () {
        if ($(this).val().length > mylo_UI_init_variables[0].groupNameLimitLength) {
            //remove extra text which is more then maxlength
            $(this).val($(this).val().slice(0, mylo_UI_init_variables[0].groupNameLimitLength));
        }
    });
    /*
	*	Validate the form, add the place to loc Array, display current group with new loc
	*/
	$('#validateGroup').click(function() {
		//GA
        //GATrackerEvent("Button_click", "Validate_group", "");
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
			showAndroidToast(mylo_textes[0].error_add_group_form_empty_fields);
			//GA
	        //GATrackerEvent("Action_fail", "add_group_err", "missing fields");
	        //

		}
	});
}

function validate(){
	validateAddGPSForm();
	validateAddPlaceForm();
}

function validateAddPlaceForm(){
	if($('#addPlace').find('#nameField').val() && $('#addPlace').find('#addressField').val()){
        $('#addPlace').find('.formButton').css({
			'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
        });
    }else{
    	$('#addPlace').find('.formButton').css({
			'background-color': '#'+mylo_UI_init_variables[0].formInactiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formInactiveColor,
        });
	}

	if($('#addPlace').find('#nameField').val() && mylo_UI_init_variables[0].addingGPS){
        $('#addPlace').find('.formButton').css({
			'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
        });
    }
}

function validateAddGPSForm(){
	if($('#addGPS').find('#nameField').val() && (mylo_UI_init_variables[0].addingGPS || mylo_UI_init_variables[0].currentGPS)){
        $('#addGPS').find('.formButton').css({
			'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
        });
    }else{
    	$('#addGPS').find('.formButton').css({
			'background-color': '#'+mylo_UI_init_variables[0].formInactiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formInactiveColor,
        });
	}
}

function validateEditPlaceForm(){
	if($('#editPlace').find('#nameField').val() && mylo_UI_init_variables[0].editPlace){
        $('#editPlace').find('.formButton').css({
			'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
        });
    }else{
    	$('#editPlace').find('.formButton').css({
			'background-color': '#'+mylo_UI_init_variables[0].formInactiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formInactiveColor,
        });
	}
}

function checkFields(el){
	//console.log(el.attr('id'));
	if(el.attr('id')=="addGPS"){
		if( mylo_UI_init_variables[0].editPlace!=null){
			console.log('IN CHECKFIELDS ');
			if(el.find('#nameField').val()){
				return 1;
			}else{
				return 0;
			}
		}else if(mylo_UI_init_variables[0].addingGPS || mylo_UI_init_variables[0].currentGPS){
			if(el.find('#nameField').val()){
				return 1;
			}else{
				return 0;
			}
		}	
	}else{
		if(el.find('#nameField').val() && el.find('#addressField').val()){
			return 1;
		}else{
			return 0;
		}
	}
}
function validateGroupNameField(){
	if($('#groupnameField').val()){
		$('#validateGroup').css({
			'background-color': '#'+mylo_UI_init_variables[0].formActiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formActiveColor,
        });
    }else{
    	$('#validateGroup').css({
			'background-color': '#'+mylo_UI_init_variables[0].formInactiveColor,
			border: '1px solid #'+mylo_UI_init_variables[0].formInactiveColor,
        });
	}
}