/* * * * * * * * * * * * * * * * * * * * * * * * * * * 
* BIND GROUP EVENT
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function bindGroupEvents(){
	$( ".group" ).click(function() {
		
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
		//GA
        GATrackerEvent("Button_click", "group", $(this).attr('name'));
	});

	$('.group').mouseup(function(e){
		clearTimeout(pressTimer);
		dragEnd(e.pageX, e.pageY);
		return false;
	}).mousemove(function(e){
		if(isDragging){drag(e.pageX, e.pageY);}
		// Clear timeout
		clearTimeout(pressTimer);
		return false;
	}).mousedown(function(e){
		if(!isDragging && $(this).hasClass('draggable') && !mylo_UI_init_variables[0].loading && !mylo_UI_init_variables[0].isAddingPlace){
			selectedDraggable = $(this);
			// Set timeout to check for longpress
			pressTimer = window.setTimeout(function(){
				vibrate(mylo_UI_init_variables[0].longPress_vibration_time);
				dragType = "group";
				dragStart(e.pageX, e.pageY);
			},mylo_UI_init_variables[0].longPressTimer);
		}
		return false; 
	});

	/*
	* ADD GROUP
	*/
	$( ".addGroup" ).click(function(){
		if(mylo_UI_init_variables[0].isAddingPlace || mylo_UI_init_variables[0].loading){}else{//add group inactive while adding place
			var deg = 0;
			var div = document.getElementsByName("addGroupIcon")[0];
			//STOP ANY POSSIBLE ONGOING AND AWAITING ANIMATIONS
			$('#addGroup').stopAnima(true);
			
			if(mylo_UI_init_variables[0].isAddingGroup){//already adding group=> close addinggroup
				//GA
		        GATrackerEvent("Button_click", "add_group", "close");
		        //
				hideAddGroupDiv();

				deg = 0;
				div.style.webkitTransform = 'rotate('+deg+'deg)'; 
			    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
			    div.style.msTransform     = 'rotate('+deg+'deg)'; 
			    div.style.oTransform      = 'rotate('+deg+'deg)'; 
			    div.style.transform       = 'rotate('+deg+'deg)';
			    mylo_UI_init_variables[0].isAddingGroup = !mylo_UI_init_variables[0].isAddingGroup;
			    
			}else{
				//GA
		        GATrackerEvent("Button_click", "add_group", "open");
		        //
				displayAddGroupDiv();
				
		        deg = 45;
		        div.style.webkitTransform = 'rotate('+deg+'deg)'; 
			    div.style.mozTransform    = 'rotate('+deg+'deg)'; 
			    div.style.msTransform     = 'rotate('+deg+'deg)'; 
			    div.style.oTransform      = 'rotate('+deg+'deg)'; 
			    div.style.transform       = 'rotate('+deg+'deg)';
			    mylo_UI_init_variables[0].isAddingGroup = !mylo_UI_init_variables[0].isAddingGroup;
			    
			}
		}
		
	});
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	SET CSS PROPERTIES OF DISPLAYED GROUPS + ADD "ADDGROUP" BUTTON
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function initializeGroup(){	//Set css properties of group div
	//console.log("in initialize group function");
	$('#groupsContainer').append('<div class="addGroup" name="addGroup"><p name="addGroupIcon">+</p></div>');
	
	$('.addGroup').css({
		height: 45+'px',
		width: 45+'px',
		'float':'left',
		'margin-left': mylo_UI_init_variables[0].gGutter+(mylo_UI_init_variables[0].groupSize+2*mylo_UI_init_variables[0].gborerSize-45)/2+'px',
		'margin-right': mylo_UI_init_variables[0].gGutter+'px',
		'margin-top': (mylo_UI_init_variables[0].groupsDivHeight-45)/2+'px',
		'line-height': 45+'px',
		color: '#FFFFFF',
		overflow:'hidden',
	});
	$('.addGroup').find('p').css({
		margin:'0px',
		padding:'0px',
		'font-size': mylo_UI_init_variables[0].addGroupFontSize+'px',
		'text-align':'center',
	});
	
	var totalGroups = $('.group');
	$('#groupsContainer').children().wrapAll('<div id="groupWraper"></div>');
	var wraperWidth = (mylo_UI_init_variables[0].groupSize+2*mylo_UI_init_variables[0].gborerSize+mylo_UI_init_variables[0].gGutter)*(totalGroups.length+1)+mylo_UI_init_variables[0].gGutter;
	$('#groupWraper').css({
		'width': wraperWidth+'px',
		height:mylo_UI_init_variables[0].groupsDivHeight+'px',
	});
	if(wraperWidth<$(window).width()){
		$('#groupsContainer').css({width: wraperWidth+'px'});
	}else{
		$('#groupsContainer').css({width: $(window).width()+'px'});
	}
	
	$('#groupsDiv').css('overflow', 'hidden');
	$('#groupsContainer').css('overflow-x', 'auto');
	
	//BIND GROUP EVENTS
	bindGroupEvents();
	//
	if(nb_user_group>=nbmaxgroups){
		//alert('fuck');
		$('.addGroup').css({
			display: 'none',
		});
	}
}

/* * * * * * * * * * * * * * * * * * * * * * *
*	showUserGroups() : display user's group
* * * * * * * * * * * * * * * * * * * * * * */
function showUserGroups(callback){
	//console.log("in show user group function");
	var i=0;
	for(i=0;i<userGroups.length;i++){
		if(userGroups[i].name!=""){
			$('#groupsContainer')
			.append('<div class="group draggable droppable" name="'+userGroups[i].id+'" id="g'+userGroups[i].id+'"><p class="centered"></p></div>');
			$('[name="'+userGroups[i].id+'"]').find('.centered').text(userGroups[i].name);	
			$('[name="'+userGroups[i].id+'"]').css({
				border: mylo_UI_init_variables[0].gborerSize+'px solid '+getGroupColor(userGroups[i].id),
				height: mylo_UI_init_variables[0].groupSize+'px',
				width: mylo_UI_init_variables[0].groupSize+'px',
				'margin-left': mylo_UI_init_variables[0].gGutter+'px',
				'margin-top': gMarginTop+'px',
				'font-size': mylo_UI_init_variables[0].gFontSize+'px',
			});
			$('[name="'+userGroups[i].id+'"]').find('p').css({
				'margin-top': Math.floor((mylo_UI_init_variables[0].groupSize-$('[name="'+userGroups[i].id+'"]').find('p').height())/2)+'px',
				width : mylo_UI_init_variables[0].groupSize-10+'px',
			});
		}
	}
	initializeGroup();
	callback();
}
/*
* Get Group Color
*/
function getGroupColor(groupId){
	var color="";
	var i=0;
	for(i=0;i<groups.length;i++){
		if(groups[i].id==groupId){
			color = groups[i].color;
		}
	}
	return color;
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	refreshLocsdiv(): refresh loc div with new user
*	position
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function refreshLocsdist(){
	var displayed_locs = $('.loc');
	if(displayed_locs.length>0){
		if($('.loc').last().find('.locdist').text()=="-"){
			//console.log("in refreshLocsdist and dist = -");
			var idGroupToDisplay = $('.currentGroup').attr('name');
			var locToDisplay = getPositions(idGroupToDisplay);
			printUserLocation(idGroupToDisplay,locToDisplay,fadeIn1);
		}
	}	
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	getUserPosition(): returns user position in an 
*	object {lon,lat}
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function getUserPosition(callback, timeOut){
	var p = {lat:0,lon:0};
	navigator.geolocation.getCurrentPosition(function onSuccess(position) {
	        p.lat = position.coords.latitude;
	        p.lon = position.coords.longitude;
	        mylo_UI_init_variables[0].userpos=p;
	        var d = new Date();
	        mylo_UI_init_variables[0].userpos_time=d.getTime();//in miliseconds
	        callback();
        }, 
		function onError(error) {
        	callback();
    	},{timeout: timeOut, enableHighAccuracy: true });
	
	//WATCH FOR POSITION CHANGE every 5min
	mylo_UI_init_variables[0].myWatchID = navigator.geolocation.watchPosition(function onSuccess(position) {
	        p.lat = position.coords.latitude;
	        p.lon = position.coords.longitude;
	        mylo_UI_init_variables[0].userpos=p;
	        var d = new Date();
	        mylo_UI_init_variables[0].userpos_time=d.getTime();//in miliseconds
	        refreshLocsdist();
        }, 
		function onError(error) {
    	}, {frequency: 300000, timeout: 5000, enableHighAccuracy: true});
}
/** Converts numeric degrees to radians */
function rad(n){
    return n * Math.PI / 180;
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	getDistance(): returns distance between 2 points
*	{lon,lat} 
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function getDistance(p1,p2){
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat - p1.lat);
	var dLong = rad(p2.lon - p1.lon);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; //distance in meters
 
	return d; // returns the distance in meter
}

/*
* Get loc min dist
*/
function getClosestLoc(locs){
	var closest = locs[0];
	var i=1;
	for(i=1;i<locs.length;i++){
		if(parseInt(locs[i].dist)<parseInt(closest.dist)&&locs[i].name!=""){
			closest = locs[i];
		}
	}
	return closest;
}
/*
* Log array
*/
function logLocations(locArray, arrayName){
	console.log("LOG of "+arrayName+": ");
	var i=0;
	for(i=0;i<locArray.length;i++){
		console.log("locId="+locArray[i].id+" locName="+locArray[i].name);
	}
}
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	sortLocsByIncreasingDistance(): returns an array of loc 
*	sorted by distance
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function sortLocsByIncreasingDistance(locs){
	var sortedLocs = new Array();
	var temp = locs;
	if(locs.length>0){
		//initialisation
		var i=0;
		for(i=0;i<locs.length;i++){
			sortedLocs[i]= getClosestLoc(temp);
			var j=0;
			
			var indexToSplice = -1;
			for(j=0;j<temp.length;j++)//check the sortedlocs to find the upper dist
			{
				if(temp[j].id==sortedLocs[i].id){//find the upper dist
					indexToSplice = j;//get the index of the upper dist to insert the loc before
					break;
				}
			}
			if(indexToSplice!=-1){
				temp.splice(indexToSplice, 1);	
			}
			
		}

		var k=0;
		for(k=0;k<locs.length;k++){
			if(locs[k].name==""){
				//console.log("locId="+locs[k].id+" loc name="+locs[k].name);
				sortedLocs.unshift(locs[k]);
			}
		}
	}
	return sortedLocs;
}


/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	getPositions(): retourne toutes les positions 
*	d'un groupe donnée ou non prêtes à être affichées. 
*	Arguments: locations= objet json ? ou tableau?
*	group= nom du group (string) 
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function getPositions(group){
	var userLocs = new Array();
	
	if(group==undefined || group==0){//CASE ALL: retourner toutes les positions
		var i = 0;
		for(i=0;i<locations.length;i++)
		{	
			var valueToPush = {id:0,name:"",group:0,lat:0,lon:0,dist:"",adr:"",country:"",publicName:"",gps:0};
			// Add the properties to your object
			valueToPush.id = locations[i].id;
			valueToPush.name = locations[i].name;
			valueToPush.group = locations[i].group;
			valueToPush.lon = locations[i].lon;
			valueToPush.lat = locations[i].lat;
			var p = {lat:locations[i].lat,lon:locations[i].lon};
			valueToPush.dist = getDistance(mylo_UI_init_variables[0].userpos,p);//calcul the distance between user position and saved loc
			valueToPush.adr = locations[i].adr;
			valueToPush.country = locations[i].country;
			valueToPush.publicName = locations[i].publicName;
			valueToPush.gps = locations[i].gps;
			var lenght = userLocs.push(valueToPush);
		}
	}else{// CASE A GROUP WAS MENTIONED
		var j = 0;
		for(j=0;j<locations.length;j++)
		{	
			if(locations[j].group==group){
			// Create valueToPush as an object {} rather than an array []
			var valueToPush = {id:0, name:"",group:0,lat:0,lon:0,dist:"",adr:"",country:"",publicName:"",gps:0};
			// Add the properties to your object
			valueToPush.id = locations[j].id;
			valueToPush.name = locations[j].name;
			valueToPush.group = locations[j].group;
			valueToPush.lon = locations[j].lon;
			valueToPush.lat = locations[j].lat;
			var p2 = {lat:locations[j].lat,lon:locations[j].lon};
			valueToPush.dist = getDistance(mylo_UI_init_variables[0].userpos,p2);
			valueToPush.adr = locations[j].adr;
			valueToPush.country = locations[j].country;
			valueToPush.publicName = locations[j].publicName;
			valueToPush.gps = locations[j].gps;
			userLocs.push(valueToPush);
			}
		}
	}
	
	var sortedLocs = new Array();
	//Place locs added from wear at top of array (last added first)
	var toto=0;
	for(toto=0;toto<userLocs.length;toto++){
		if(userLocs[toto].name==""){
			sortedLocs.push(userLocs[toto]);
		}	
	}

	//sort locs by increasing distance
	userLocs.sort(function(a,b){
		if(a.dist > b.dist){return 1;}
		else if(a.dist < b.dist){return -1;}
		else{return 0;}
	});

	//fill the rest of the array with sorted locs
	var tata=0;
	for(tata=0;tata<userLocs.length;tata++){
		if(userLocs[tata].name!=""){
			sortedLocs.push(userLocs[tata]);
		}	
	}
	var t=0;
	for(t=0;t<sortedLocs.length;t++){
		if(mylo_UI_init_variables[0].userpos.lat==0 && mylo_UI_init_variables[0].userpos.lon==0){
			sortedLocs[t].dist="-";
		}else{
			if(sortedLocs[t].dist>1000){//superior than 1km => display distance in km
				d=sortedLocs[t].dist/1000;
				d=Math.round(d);
				var dist=d+' km';	
			}else{
				d=Math.round(sortedLocs[t].dist*10)/10;
				var dist=d+' m';
			}
			sortedLocs[t].dist=dist;
		}
	}

	return sortedLocs;
}
/* * * * * * * * * * * * * * * * * *
* * * RECURSIVE FADEIN FUNCTION
* * * * * * * * * * * * * * * * * * */
function fadeIN2(){
	$('.loc').css('display','table');
	var tab = $('.loc');
	var length = tab.length;
	//var element = document.getElementById(tab[0].id);
	//horizontalTranslateAnimation(element,-screenWidth,0,300);
	var i=0;
	for(i=0;i<length;i++){ //-1
		console.log("loc id="+tab[i].id);
		var element = document.getElementById(tab[i].id);
		//window.setTimeout(horizontalTranslateAnimation(element,-screenWidth,0,300), 100*i);
		horizontalTranslateAnimation(element,-screenWidth,0,250+100*i);
	}
}

function fadeIn1(){
	var tab = $('.loc');
	var i=0;
	for(i=0;i<$('.loc').length;i++){ 
		$('#'+tab[i].id).css('display','table');
		$('#'+tab[i].id).css({
			'margin-left': '0px',
		});
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	BEHAVIOR : Bind draggable behavior of locs !
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function bindLocsEvents(){
	$('.loc').mouseup(function(e){
		// Clear timeout
		clearTimeout(pressTimer);
		dragEnd(e.pageX, e.pageY);
		return false;
	}).mousemove(function(e){
		if(isDragging){drag(e.pageX, e.pageY);}
		// Clear timeout
		clearTimeout(pressTimer);
		return false;
	}).mousedown(function(e){
		if(!isDragging && !mylo_UI_init_variables[0].isAddingGroup){
			selectedDraggable = $(this);
			// Set timeout to check for longpress
			pressTimer = window.setTimeout(function(){
				vibrate(mylo_UI_init_variables[0].longPress_vibration_time);
				dragType = "loc";
				dragStart(e.pageX, e.pageY);
			},mylo_UI_init_variables[0].longPressTimer);
		}
		return false; 
	});
	$('.loc').click(function(){

		//GA
        GATrackerEvent("Button_click", "edit_place", $(this).attr('id'));
        //
		mylo_UI_init_variables[0].editPlace=getLoc($(this).attr('id'));
		var loc = getLoc($(this).attr('id'));
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
		$('#edit_gps_txt').html('<span class="name"></span><br/><span class="gpsTxt">'+adr1+'</span>'+adr2);
   		$('#edit_gps_txt').find('.name').text(name);
   		//hide search field
   		validate();
   		//OPEN ADD PLACE SCREEN
   		displayAddPlaceScreen();
	});
}
/*
*
*/
function getLoc(id){
	var loc = {id:0, name:"",group:0,lat:0,lon:0,dist:"",adr:"",country:"",publicName:"",gps:0};
	var j=0;
	for(j=0;j<locations.length;j++)
	{	//alert(userLocs[i]);
		if(locations[j].id==id){
			// Add the properties to your object
			loc.id = locations[j].id;
			loc.name = locations[j].name;
			loc.group = locations[j].group;
			loc.lon = locations[j].lon;
			loc.lat = locations[j].lat;
			loc.adr = locations[j].adr;
			loc.country = locations[j].country;
			loc.publicName = locations[j].publicName;
			loc.gps = locations[j].gps;
		}
	}
	return loc;
}

/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	checkFirstTime(): show the locations on screen
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function checkFirstTime(idGroup,userLocs){
	if(userLocs.length<=0){
		if(idGroup==0){
			$('#firstTimeAll').find('#title').html(mylo_textes[0].first_time_all_txt_title);//'Welcome to Mylo!'
			$('#firstTimeAll').find('#text').html(mylo_textes[0].first_time_all_txt_phrase);//'Add your favourites places now!'
			$('#firstTimeAll').css({
				display: 'block',
			});
		}else{
			var currentColor = getGroupColor(idGroup);
			var currentGroupName = groups[idGroup].name;
			$('.GroupPin').css({
				'background-color': currentColor,
			}); 
			$('#firstTimeGroup').find('#title').html(mylo_textes[0].first_time_group_txt_1+'<span class="name"></span>'+mylo_textes[0].first_time_group_txt_2);
			$('#firstTimeGroup').find('.name').text(currentGroupName);
			$('#firstTimeGroup').css({
				display: 'block',
			});
		}
	}
}	
/* * * * * * * * * * * * * * *  * * *  * *  * * * * *
*	printUserLocation(): show the locations on screen
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function printUserLocation(idGroupToDisplay,userLocs,callback){
	//$('#locsDiv').empty();
	$('.loc').remove();
	$('#firstTimeGroup').css({
		display: 'none',
	});
	$('#firstTimeAll').css({
		display: 'none',
	});

	$('#locsDiv').css('display','block');
	if(userLocs.length>0){
		var i = 0;
		for(i=0;i<userLocs.length;i++)
		{
			var uri="";
			if(userLocs[i].gps==1){
				uri = encodeURIComponent("@"+userLocs[i].lat+","+userLocs[i].lon);//loc:lat+lon 
			}else{uri = encodeURIComponent(userLocs[i].publicName+' '+userLocs[i].adr);}
			
						
			if(userLocs[i].name!=""){
				var name = userLocs[i].name;
				/*if(userLocs[i].name.length>mylo_UI_init_variables[0].nameLimitLength){
					name = userLocs[i].name.slice(0, mylo_UI_init_variables[0].nameLimitLength-3);
					name = name+"...";
				}*/
				
				$('#locsDiv')
					.append('<div class="loc" id="'+userLocs[i].id+'"><div class="container"><div id="centered"><p class="locname"></p><p class="locadr"></p><p class="locdist">'+userLocs[i].dist+'</p></div></div><div id="locButtons"><div class="locButton" id="shareLocButton"><IMG SRC="./png/share_dark.png"></div><div class="locButton" id="goLocButton"><IMG SRC="./png/go_dark.png"></div></div></div>');

				$('#'+userLocs[i].id).find('.locname').text(name);
				$('#'+userLocs[i].id).find('.container').css({
					'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[userLocs[i].group].color,
					'padding-left':mylo_UI_init_variables[0].locContainerPaddingLeft+'px',
					height:mylo_UI_init_variables[0].locContainerHeight+'px',
				});
				$('#'+userLocs[i].id).css({
					height:locHeight+'px',
				});
			}else{
				$('#locsDiv')
					.append('<div class="loc" id="'+userLocs[i].id+'"><IMG id="watchIcon" SRC="./png/mylo-icons_watch.png"><div class="container"><div id="centered"><p class="locname"></p><p class="locadr"></p><p class="locdist"></p></div></div><!--div id="locButtons"--><!--IMG id="closeButton" SRC="./png/mylo-icon-V2_add-loc-close.png"--><!--/div--></div>');

				$('#'+userLocs[i].id).find('.locname').text("New Location");
				$('#'+userLocs[i].id).find('.locdist').text("");
				$('#'+userLocs[i].id).addClass("new");
				$('#'+userLocs[i].id).find('.container').css({
					height:'100px',
				});
				$('#'+userLocs[i].id).css({
					height:'100px',
				});
			}			
			
			if(userLocs[i].gps==1){
				var adr = userLocs[i].adr;
				var adr1 = mylo_textes[0].location_gps_addr_txt;
				var adr2 = adr.replace(adr1, "");
				$('#'+userLocs[i].id).find('.locadr').html('<span class="gpsTxt">'+adr1+'</span>'+adr2);
			}else{
				$('#'+userLocs[i].id).find('.locadr').text(userLocs[i].adr);
			}
			$('#'+userLocs[i].id).css({
				display:'none',
				'margin-left': '-'+screenWidth+'px',
				width: $(window).width()+'px',
				//height:locHeight+'px',
			});
			$('#'+userLocs[i].id).find('.container').css({
				//'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[userLocs[i].group].color,
				width: locContainerWidth+'px',
				'padding-right':mylo_UI_init_variables[0].locContainerPaddingRight+'px',
				'padding-top':mylo_UI_init_variables[0].locContainerPaddingTop+'px',
				'padding-bottom':mylo_UI_init_variables[0].locContainerPaddingTop+'px',
			});
			$('#'+userLocs[i].id).find('#locButtons').css({
				height:locHeight+'px',
			});
			$('#'+userLocs[i].id).find('.locButton').css({
				height:locButtonHeight+'px',
			});
			$('#'+userLocs[i].id).find('.locButton').find('img').css({
				'width':mylo_UI_init_variables[0].imgLocButtonsWidth+'px',
				'height':mylo_UI_init_variables[0].imgLocButtonsWidth+'px',
				'margin-top':imgLocButtonsPaddingTop+'px',
				'margin-left':imgLocButtonsPaddingLeft+'px',
			});
			/*
			*	SHARE BUTTON ONCLICK
			*/
			$('#'+userLocs[i].id).find('#shareLocButton').click(function(event){
				event.stopPropagation();
				//GA
		        GATrackerEvent("Button_click", "share_loc", "");
		        //
				var loc = getLoc($(this).parent().parent('.loc').attr('id')); 
				var adressToEncode="";
				var adressMessage = "";
				if(loc.gps==1){
					adressToEncode = "@"+loc.lat+","+loc.lon;//@lat,lon
				}else{
					adressToEncode = loc.publicName+' '+loc.adr;
				}
				adressMessage = loc.adr;
				var urlToShare = 'http://maps.google.com/maps?q='+encodeURIComponent(adressToEncode);
				var message = loc.name+', '+adressMessage+': '+urlToShare;
				shareAndroid(message);
			});
			/*
			*	GO BUTTON ONCLICK
			*/
			$('#'+userLocs[i].id).find('#goLocButton').click(function(event){
				event.stopPropagation();
				var loc = getLoc($(this).parent().parent('.loc').attr('id')); 
				//GA
		        GATrackerEvent("Button_click", "go_loc", "");
		        var adressToEncode="";
				if(loc.gps==1){
					adressToEncode = loc.lat+","+loc.lon;//@lat,lon
				}else{adressToEncode = loc.publicName+' '+loc.adr;}
				var urlToShare = 'geo:'+loc.lat+","+loc.lon+'?q='+encodeURIComponent(adressToEncode);
				showOnMapsAndroid(urlToShare);
			});
		}
	}else{ 
		checkFirstTime(idGroupToDisplay,userLocs);
	}
	bindLocsEvents();
	$('#locsDiv').css('overflow-y', 'auto');
	callback();
}


function displayAddGroupDiv(){
	changeAndroidAppState(1);
	//display add group div	
	var totalGroups = $('.group');
	var sscroll = $('#groupsContainer').width()-(mylo_UI_init_variables[0].groupSize+2*mylo_UI_init_variables[0].gborerSize+2*mylo_UI_init_variables[0].gGutter);
	
	$('#groupsDivContainer').anima({
	  	'margin-left': '-'+sscroll+'px',
	  	}, 350, '0.120, 0.715, 0.355, 0.875', {complete:function(){
	  	}
	});

	$('#addGroup').children().css({
		opacity: '1', 
		filter: 'alpha(opacity=100)',
	});

	var max = $('#groupWraper').width() - $('#groupWraper').parent().width();
	var cur = $('#groupsContainer').scrollLeft();

    if (cur<max) {
        $('#groupsContainer').animate({
			scrollTop:0,
			scrollLeft:max,
		},0,function(){
			$('#groupsContainer').css('overflow', 'hidden');
		});
    }else{ $('#groupsContainer').css('overflow', 'hidden');} 

}

function hideAddGroupDiv(){
	changeAndroidAppState(0);
	$('#groupnameField').blur();
	$('#groupnameField').val("");
	validateGroupNameField();
	$('#groupsDivContainer').anima({
		'margin-left': '0px',
	  	}, 350, '0.145,0.410,0.245,0.690', function(){}
	);
	$('#groupsContainer').css('overflow-x', 'auto');

	$('#addGroup').children().css({
		opacity: '0',
		filter: 'alpha(opacity=0)',
	});
}

function displayNewGroup(id,name){
	$('.addGroup').before('<div class="group droppable" name="'+id+'" id="g'+id+'"><p class="centered"></p></div>');
	$('[name="'+id+'"]').find('.centered').text(name);
	$('[name="'+id+'"]').css({
		border: mylo_UI_init_variables[0].gborerSize+'px solid '+getGroupColor(id),
		height: mylo_UI_init_variables[0].groupSize+'px',
		width: mylo_UI_init_variables[0].groupSize+'px',
		'margin-left': mylo_UI_init_variables[0].gGutter+'px',
		'margin-top': gMarginTop+'px',
		'font-size': mylo_UI_init_variables[0].gFontSize+'px',
	});
	$('[name="'+id+'"]').find('p').css({
		'margin-top': Math.floor((mylo_UI_init_variables[0].groupSize-$('[name="'+id+'"]').find('p').height())/2)+'px',
		width: mylo_UI_init_variables[0].groupSize-$('.centered').css('padding-left')*2+'px',
	});

	$('[name="'+id+'"]').click(function() {
		//GA
        GATrackerEvent("Button_click", "group", $(this).attr('name'));
        //
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
	
	$('[name="'+id+'"]').mouseup(function(e){
		// Clear timeout
		clearTimeout(pressTimer);
		dragEnd(e.pageX, e.pageY);
		return false;
	}).mousemove(function(e){
		if(isDragging){drag(e.pageX, e.pageY);}
		// Clear timeout
		clearTimeout(pressTimer);
		return false;
	}).mousedown(function(e){
		if(!isDragging){
			selectedDraggable = $(this);
			pressTimer = window.setTimeout(function(){
				vibrate(mylo_UI_init_variables[0].longPress_vibration_time);
				dragType = "group";
				dragStart(e.pageX, e.pageY);
			},mylo_UI_init_variables[0].longPressTimer);
		}
		return false; 
	});

	var totalGroups = $('.group');
	// Set groupWraper width equal to total width of all groups outerHeight
	var wraperWidth = (mylo_UI_init_variables[0].groupSize+2*mylo_UI_init_variables[0].gborerSize+mylo_UI_init_variables[0].gGutter)*(totalGroups.length+1)+mylo_UI_init_variables[0].gGutter;
	$('#groupWraper').css({
		'width': wraperWidth+'px',
		height:mylo_UI_init_variables[0].groupsDivHeight+'px',
	});
	if(wraperWidth<$(window).width()){
		$('#groupsContainer').css({width: wraperWidth+'px'});
	}else{
		$('#groupsContainer').css({width: $(window).width()+'px'});
	}

	if(nb_user_group>=nbmaxgroups){
		$('.addGroup').css({
			display: 'none',
		});
	}
}

/* * * * * * * * * * * * * * *  * * * * * * * *
*	LOADER
* * * * * * * * * * * * * * * * * * * * * * * */

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
