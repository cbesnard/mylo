

/* * * * * * * * * * * * * * * * * * * * * * *
*	setUserDatas() : fill the groups aray 
*	with the user's names group adn the location array with local file system
* * * * * * * * * * * * * * * * * * * * * * */
function getUserDatas(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, got_data_FS_TO_READ, fail);
}

/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	ADD LOCATION 
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function addLocation(nameloc, adrloc, grouploc, loclat, loclon, country, locationType, gpsType){
	//set location id : locations[locations.length-1].id+1
	var idLoc;
	if(locations.length==0){idLoc=0;}else{
	idLoc = locations[locations.length-1].id+1;}
	//add location to locations Array
	var loc = {id:idLoc,name:nameloc,group:grouploc,lat:loclat,lon:loclon,adr:adrloc,country:country,publicName:locationType,gps:gpsType};
	locations.push(loc);
	storeDataInAndroid();
	
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	EDIT LOCATION'S NAME 
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function editPlacesName(locId, locname){
	for(i=0;i<locations.length;i++){
		if(locations[i].id==locId){
			console.log("location"+locId+" found: name="+locname);
			locations[i].name=locname;
			break;
		}
	}
	//SAVE IN ANDROID
	storeDataInAndroid();
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	DELETE LOCATION 
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function deleteStoredLocation(locId){
	//LOCATION ARRAY: delete from locations Array
	var index = -1;
	var i=0;
	for(i=0;i<locations.length;i++){
		if(locations[i].id==locId){
			index = i;
			break;
		}
	}
	locations.splice(index, 1);
	//SCREEN: Refresh screen: remove loc from screen
	$('#'+locId).slideUp(200,function(){
		//console.log('in anima complete function');
		$('#'+locId).remove();
		afterDrag();
	});
	//SCREEN: check if current group is empty => if empty: display firstTime scenario
	var idGroupToDisplay = parseInt($('.currentGroup').attr('name'));
	var locToDisplay = getPositions(idGroupToDisplay);
	checkFirstTime(idGroupToDisplay,locToDisplay);
	//LOCAL STORAGE: refresh local storage without deleted loc
	storeDataInAndroid();
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	ADD GROUP
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function addGroup(groupName){
	//CREATE ID FOR NEW GROUP
	var newGroupId;
	if(nb_user_group==0){newGroupId=1;}else{
		var i=0;
		for(i=0;i<groups.length;i++){
			if(groups[i].name == ""){
				newGroupId = groups[i].id;
				break;
			}
		}
	}
	//GROUPS ARRAY: add to groups Array
	groups[newGroupId].name = groupName;

	if(userGroups != null){
        if(userGroups.length!=0){
            userGroups.push({id:newGroupId,name:groupName});    
        }else{
            console.log("usergroups array's length is 0");
            userGroups = [{id:newGroupId,name:groupName}];    
        }
    }else{
        console.log("usergroups array's null");
        userGroups = [{id:newGroupId,name:groupName}];
    }
	
	nb_user_group=userGroups.length;
	//SCREEN: refresh groupsdiv
	displayNewGroup(newGroupId,groupName);
	//LOCAL STORAGE: add to local storage
	storeDataInAndroid();
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	DELETE GROUP
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function deleteGroup(groupId){
	//SCREEN & LOCATION ARRAY: change chosen group's locations to ALL group
	var i=0;
	for(i=0;i<locations.length;i++){
		if(locations[i].group==groupId){
			locations[i].group = 0;
			$('#'+locations[i].id).find('.container').css({
				'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[0].color,
			});
		}
	}
	//GROUP ARRAY: delete from groups Array
	groups[groupId].name = "";
	
	//SCREEN: if current group == group to delete then refresh and display ALL group
	if($('.currentGroup').attr('name') == groupId){
		var locToDisplay = getPositions();
		printUserLocation(0,locToDisplay,fadeIn1);
		var nameCurrent = $('.currentGroup').attr('name');
		$('[name="'+nameCurrent+'"]').removeClass('currentGroup');
		$('[name="0"]').addClass('currentGroup');
	}
	$('[name="'+groupId+'"]').anima({"margin-top":mylo_UI_init_variables[0].groupsDivHeight/2,height:0,width:0}, 200,'linear', {complete:function(){
		//console.log('in anima complete function');
		$('[name="'+groupId+'"]').remove();
		afterDrag();
		var totalGroups = $('.group');
		var wraperWidth = (mylo_UI_init_variables[0].groupSize+2*mylo_UI_init_variables[0].gborerSize+mylo_UI_init_variables[0].gGutter)*(totalGroups.length+1)+mylo_UI_init_variables[0].gGutter;
		$('#groupWraper').css({
			'width': wraperWidth+'px',
		});
		if(wraperWidth<$(window).width()){
			$('#groupsContainer').css({width: wraperWidth+'px'});
		}else{
			$('#groupsContainer').css({width: $(window).width()+'px'});
		}
	}});
	//LOCAL STORAGE: refresh GROUPS local storage with deleted group
	var indexToDelete;
	var i=0;
	for(i=0;i<userGroups.length;i++){
		if(userGroups[i].id == groupId){
			indexToDelete = i;
			break;
		}
	}
	userGroups.splice(indexToDelete, 1);
	storeDataInAndroid();
	//
	nb_user_group = userGroups.length;

	if(nb_user_group<nbmaxgroups){
		$('.addGroup').css({
			display: 'block',
		});
	}
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	CHANGE LOC GROUP
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function changeLocGroup(locId, groupId){
	//LOCATIONS ARRAY: find loc and change group id
	var i=0;
	for(i=0;i<locations.length;i++){
		if(locations[i].id==locId){
			//if current group == location's group => don't display it anymore
			var currentGroupId = parseInt($('.currentGroup').attr('name'));
			
			if( currentGroupId== locations[i].group && currentGroupId!='0'){
				$('#'+locations[i].id).slideUp(200,function(){
		  			//console.log('in anima complete function');
		  			$('#'+locations[i].id).remove();
		  			afterDrag();
		  		});
			}else{
				$('#'+locations[i].id).find('.container').css({
					'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[groupId].color,
				});
				afterDrag(); 
			}
			locations[i].group = groupId;

			var locToDisplay = getPositions(currentGroupId);
			checkFirstTime(currentGroupId,locToDisplay);

			break;
		}
	}
	//LOCAL STORAGE: refresh local storage with new group for loc
	storeDataInAndroid();
}






