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
		//analytics.trackEvent("Button_click", "back_button", "close_add_place", 1);
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
		//analytics.trackEvent("Button_click", "back_button", "close_add_group", 1);

	}else{
		//GA
		//analytics.trackEvent("Button_click", "back_button", "close_app", 1);
		//close application
		//navigator.app.exitApp();
	}
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	onResume
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*function onResume(){
	//WATCH FOR POSITION CHANGE every 5min
	getUserPosition(function(){
		var currentGroupID = parseInt($('.currentGroup').attr('name'));
		var locsToPrint = getPositions(currentGroupID);
		printUserLocation(currentGroupID,locsToPrint,fadeIn1);
	},1000);
}*/
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	onPause
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/*function onPause(){
	navigator.geolocation.clearWatch(mylo_UI_init_variables[0].myWatchID);	
}*/
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	VIBRATE
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function vibrate() {
	//navigator.notification.vibrate(20);
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	GA success handler
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function successHandler() {
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	GA error handler
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function errorHandler() {
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