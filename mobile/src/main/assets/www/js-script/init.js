var mylo_textes = new Array();
mylo_textes.push({default_group_name:"All",
add_button_txt:"Quick Add:",
add_place_form_addr_field_helper:"Enter a place or an address",
add_place_form_place_name_field_helper:"Choose a name",
error_add_place_form_empty_fields:"Both name and address have to be completed to add a place!",
add_place_form_validate_button:"Add",
add_place_form_title_gps:"Add gps location",
add_place_form_title_place:"Add place",
edit_place_form_title:"Edit location's name",
edit_place_form_validate_button:"Save",
error_add_place_form_location_not_found:"Sorry, your position couldn't be found! Try again later :)",
error_add_place_form_addr_not_found:"Address not recognized!",
error_add_place_form_connexion_pb:"Sorry, your place couldn't be added due to connexion problems :/ \nTry again later!",
first_time_group_txt_1:"What ",
first_time_group_txt_2:" do you want to add?",
first_time_all_txt_title:"Welcome to Mylo!",
first_time_all_txt_phrase:"Add your favourites places now!",
add_group_form_name_field_helper:"Name",
add_group_form_validate_button:"Add",
error_add_group_form_empty_fields:"You have to choose a name to add a group :)",
location_gps_addr_txt:"GPS location near: "}); //mylo_textes[0].
/*
* INIT : SCREEN SIZE
*/
var screenHeight = $(window).height();
var screenWidth = $(window).width();
/*
* INIT : init the css properties for UI
*/
var mylo_UI_init_variables = new Array();
mylo_UI_init_variables.push({loader_size:80,
editPlace:null,
myWatchID:0,
userpos:{lat:0,lon:0},
userpos_time:0,
nameLimitLength:18,
groupNameLimitLength:10,
longPressTimer:200,
headerHeight:45,
headerWidth:screenWidth,
formInactiveColor:"cccccc",
formActiveColor:"E52636",
isAddingGroup:0,
groupsDivHeight:122,
groupSize:80,
gborerSize:10,
gGutter:10,
gFontSize:20,
addGroupBorder:1,
addGroupFontSize:45,
addingPublicName:"",
addingGPS:null,
isAddingPlace:"",
addPlacePadding:15,
addPlaceFontSize:25,
locBorder:12,
locContainerHeight:122,
locContainerPaddingTop:0,
locButtonsWidth:57,
imgLocButtonsWidth:30,
locContainerPaddingLeft:20,
locContainerPaddingRight:5,
searchBoxInitError:0,
mapsInitError:0,
loading:0,//mylo_UI_init_variables[0].ready_to_delete
searchbox_bounds:5,
searching_position:0,
out_of_draggable:0,
ready_to_delete:0,//mylo_UI_init_variables[0].clone
clone:null,
});
//var loader_size=80;
//var myWatchID;
//var mylo_UI_init_variables[0].userpos = {lat:0,lon:0};
//var nameLimitLength = 15;
//var groupNameLimitLength = 10;
/*******************************************/
//var longPressTimer = 200;
/********* HEADER ******************/
//var headerHeight = 45;
//var headerWidth = screenWidth;
/*********FORM BUttoNS***********/
//var formInactiveColor = "cccccc";
//var formActiveColor = "E52636";
//var formFocusColor = "ac1c28";
/**************GROUPS**********************/
//var isAddingGroup = 0;
//var groupsDivHeight = 125;
//var groupSize = 80;
//var gborerSize = 10;
var gMarginTop = (mylo_UI_init_variables[0].groupsDivHeight-(mylo_UI_init_variables[0].groupSize+2*mylo_UI_init_variables[0].gborerSize))/2;
//var gGutter = 10;
//var gFontSize = 20;
/**************BUTTON ADD GROUP**************************/
//var addGroupBorder = 1;
var addGroupSize = mylo_UI_init_variables[0].groupSize+(mylo_UI_init_variables[0].gborerSize-mylo_UI_init_variables[0].addGroupBorder)*2;
//var addGroupFontSize = 80;
var addGroupWidth = screenWidth-addGroupSize-mylo_UI_init_variables[0].gGutter*2;//10=marginleft
//alert(screenHeight);
/******************************************/
//var addingPublicName="";
var addPlaceButtonHeight = mylo_UI_init_variables[0].headerHeight;
//var isAddingPlace = 0;
//var addPlacePadding = 15;
var addPlaceWidth = screenWidth-mylo_UI_init_variables[0].addPlacePadding*2;
var addPlaceTextInputWidth = addPlaceWidth;
var addPlaceHeight = screenHeight-mylo_UI_init_variables[0].headerHeight-mylo_UI_init_variables[0].groupsDivHeight-addPlaceButtonHeight;
//var addPlaceFontSize = 25;
/************LOCATIONS****************************/
//var locBorder = 12;
//var locContainerHeight = 122;
//var locContainerPaddingTop = 0;
var locHeight = mylo_UI_init_variables[0].locContainerHeight+mylo_UI_init_variables[0].locContainerPaddingTop*2;
//var nbLocOnScreen; //nb of loc that can be dsplayed on one screen
//var locButtonsWidth = 57;
//var imgLocButtonsWidth = 30;
var locButtonHeight = Math.floor(locHeight/2)-1;
var imgLocButtonsPaddingTop = Math.floor((locButtonHeight-mylo_UI_init_variables[0].imgLocButtonsWidth)/2);
var imgLocButtonsPaddingLeft = Math.floor((mylo_UI_init_variables[0].locButtonsWidth-mylo_UI_init_variables[0].imgLocButtonsWidth)/2);
//var locContainerPaddingLeft = 30;
//var locContainerPaddingRight = 5; 
var locContainerWidth = screenWidth-mylo_UI_init_variables[0].locContainerPaddingLeft-mylo_UI_init_variables[0].locContainerPaddingRight-mylo_UI_init_variables[0].locBorder-mylo_UI_init_variables[0].locButtonsWidth;
/*
* INITIALIZE DEFAULT GROUPS 
*/
/*********** GROUPS COLORS ************/
/*var c0 = "#DDDDDD";
var c1 = "#7CB9E7";
var c2 = "#FFDB59";
var c3 = "#DE1F89";
var c4 = "#70DBEB";
var c5 = "#9B67D0";
var c6 = "#F485C8";
var c7 = "#FFD998";
var c8 = "#FF8340";
var c9 = "#E52636";*/
/*var c0 = "#DDDDDD";
var c1 = "#33B5E5";
var c2 = "#FFDB59";
var c3 = "#DE1F89";
var c4 = "#68DFF0";
var c5 = "#9B67D0";
var c6 = "#F26BBC";
var c7 = "#FFE6BB";
var c8 = "#FE7226";
var c9 = "#555555";*/
var c0 = "#DDDDDD";
var c1 = "#0099CC";
var c2 = "#FFDB59";
var c3 = "#DE1F89";
var c4 = "#33B5E5";
var c5 = "#9B67D0";
var c6 = "#F26BBC";
var c7 = "#FF8800";
var c8 = "#FF4444";
var c9 = "#FFBB33";

var groups = new Array();
//groups = [];
var g0 = {id:0,name:"All",color:c0};
var g1 = {id:1,name:"",color:c1};
var g2 = {id:2,name:"",color:c2};
var g3 = {id:3,name:"",color:c3};
var g4 = {id:4,name:"",color:c5};
var g5 = {id:5,name:"",color:c4};
var g6 = {id:6,name:"",color:c6};
var g7 = {id:7,name:"",color:c8};
var g8 = {id:8,name:"",color:c7};
var g9 = {id:9,name:"",color:c9};//c9

groups.push(g0);
groups.push(g1);
groups.push(g2);
groups.push(g3);
groups.push(g4);
groups.push(g5);
groups.push(g6);
groups.push(g7);
groups.push(g8);
var nbmaxgroups = groups.push(g9)-1;
//alert(nbmaxgroups);
var userGroups = new Array();
var nb_user_group = userGroups.length;
/*
* INITIALIZE LOCATIONS ARRAY
*/
var locations = new Array();
/*******************************/
var currentMousePos = { x: -1, y: -1 };

/*
*   DRAG AND DROP VARIABLES
*/
var selectedDraggable;  //jquery object of dragged elment
var isDragging = 0;
var dragType = "";  //loc if it's a location drag, group if its a group drag
var selectedDroppable; //jquery object of dropable selected
var clone; //helper of dragged element
var cloneOffset = { x: -1, y: -1 };
/**************************************************/
/* * * * * * * * * * * * * * * * * *
*   INIT
* * * * * * * * * * * * * * * * * */
function setUI(callback){
    
    $('body').css({
        height: screenHeight+'px',
        width: screenWidth+'px',
    });
    $('#header').css({
        height: mylo_UI_init_variables[0].headerHeight+'px',
        width: mylo_UI_init_variables[0].headerWidth+'px',
    });
    $('#groupsDiv').css({height: mylo_UI_init_variables[0].groupsDivHeight+'px'});
    $('.addPlace').find('.text').text(mylo_textes[0].add_button_txt);
    $('.addPlace').css({
        height: addPlaceButtonHeight+'px',
        'line-height':addPlaceButtonHeight+'px',
    }); 
    $('.addPlace').find('.text').css({
        height:addPlaceButtonHeight+'px',
        'line-height':addPlaceButtonHeight+'px',
    }); 
    var locsdivHeight = screenHeight-mylo_UI_init_variables[0].headerHeight-$('#groupsDiv').outerHeight()-$('.addPlace').outerHeight();
    $('#locsDiv').css('height',locsdivHeight+'px');
    $('#locsDiv').css('width',screenWidth+'px');
    $('#locContainer').css('width',screenWidth+'px');
    /*****************************************************************************/
    $('#groupsDiv').css({width: $(window).width()+'px'});
    $('#addGroup').css({
        height: mylo_UI_init_variables[0].groupsDivHeight+'px',
        width: addGroupWidth+'px',
        'float':'left',
        'color':'#333333',
    });
    var top=(mylo_UI_init_variables[0].groupsDivHeight-($('#groupnameField').outerHeight()+$('#validateGroup').height()+10))/2;
    //alert('groupnameField='+$('#groupnameField').outerHeight()+' validateGroup='+$('#validateGroup').height());
    $('#addGroup').find('#groupnameField').css({
        'margin-top':top+'px',//10 = groupnamefield margon bottom
    });
    $('#groupsContainer').css({width: $(window).width()+'px'});
    $('#groupsDivContainer').css({
        width: $('#groupsContainer').outerWidth()+$('#addGroup').outerWidth()+'px',
        height:mylo_UI_init_variables[0].groupsDivHeight+'px',
    });  
    /******************************************************************************/
    $('.loc').css({width: $(window).width()+'px'});
    /*
    * DEFAULT GROUP
    */
    //alert(mylo_textes[0].default_group_name);
    $('.default').find('.centered').text(mylo_textes[0].default_group_name);
    $('.default').css({
        height: mylo_UI_init_variables[0].groupSize+'px',
        width: mylo_UI_init_variables[0].groupSize+'px',
        'margin-left': mylo_UI_init_variables[0].gGutter+'px',
        'margin-top': gMarginTop+'px',
        'font-size': mylo_UI_init_variables[0].gFontSize+'px',
    });
    $('.default').find('p').css({
        'margin-top': Math.floor((mylo_UI_init_variables[0].groupSize-$('.default').find('p').height())/2)+'px',
        width:mylo_UI_init_variables[0].groupSize+'px',
    });
    $('.centered').css({
        width: mylo_UI_init_variables[0].groupSize-$('.centered').css('padding-left')*2+'px',
    });

    /*
    *   LOC CONTAINER
    */
    $('#locContainer').children().wrapAll('<div id="locsWraper"></div>');
    $('#locsWraper').css({
        'width': screenWidth*2+'px',
        //'overflow-x':'auto',
    });

    /*
    * ADD PLACE CONTAINER
    */
    $('#close_add_loc').anima({
        perspective: '100px',
        rotateX: '90deg',
        rotateY: '0deg',
    }, 0, 'linear');
    $('#close_txt').anima({
        perspective: '100px',
        rotateX: '90deg',
        rotateY: '0deg',
    }, 0, 'linear');
    /********/
    $('#addPlace').css({height: locsdivHeight-1-mylo_UI_init_variables[0].addPlacePadding*2+'px'}); 
    //$('#addPlace').css({width: screenWidth-21+'px'});     
    $('#addPlace').css({
        width: addPlaceWidth-1+'px',
        padding: mylo_UI_init_variables[0].addPlacePadding+'px',
    });
    /*$('#table').css({
        width: addPlaceWidth-1-2*mylo_UI_init_variables[0].addPlacePadding+'px',
    });*/
    /*
    * LOADER
    */
    var marginTop = Math.ceil((locsdivHeight-mylo_UI_init_variables[0].loader_size)/2.8);
    var marginLeft = Math.ceil((screenWidth-mylo_UI_init_variables[0].loader_size)/2);
    $('#loader_container').css({
        width: screenWidth+'px',
        height: screenHeight+'px',
        'padding-top': marginTop+'px',
    });
    $('#loader').css({
        width:mylo_UI_init_variables[0].loader_size+'px',
        height:mylo_UI_init_variables[0].loader_size+'px',
        'margin-left': marginLeft+'px',
    });
    $('#loader_end').css({
        width:mylo_UI_init_variables[0].loader_size+'px',
        height:mylo_UI_init_variables[0].loader_size+'px',
        'margin-left': marginLeft+'px',
    });
    /*
    * INPUT FIELDS
    */
    $('#addPlace').find('.textInput').css({width: screenWidth-42-mylo_UI_init_variables[0].addPlacePadding*2+'px'});
    $('#validateButton').text(mylo_textes[0].add_place_form_validate_button);
    $('#validateButton').css({width: screenWidth-mylo_UI_init_variables[0].addPlacePadding*2.2+'px'});
    $('#saveButton').text(mylo_textes[0].edit_place_form_validate_button);
    $('#saveButton').css({width: screenWidth-mylo_UI_init_variables[0].addPlacePadding*2.2+'px'});
    $('#addressField').attr("placeholder",mylo_textes[0].add_place_form_addr_field_helper);
    $('#nameField').attr("placeholder",mylo_textes[0].add_place_form_place_name_field_helper);
    /*
    * TRASH
    */
    $('#trash_bouncer').css({
        'background-color':'#'+mylo_UI_init_variables[0].formActiveColor,
        left:(screenWidth-60)/2+'px',   //60=size of trash_bouncer div
    });
    $('#trash').find('img').css({
        left:(screenWidth-40)/2+'px',   //40=size of trash img div
    });
    callback();
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * *
*   INIT USER DATAS 
* * * * * * * * * * * * * * * * * * * * * * * * * * */
function initUserDatas(stringDatas){
    console.log("in initUserDatas function");
    try{
        console.log("Android data received is"+stringDatas);
        if(stringDatas.length>0){
            //RETRIEVE USER DATA
            var datas = JSON.parse(stringDatas);
            userGroups = datas.groups;
            locations = datas.locs;
        }
        //SET USER GROUPS
        nb_user_group = userGroups.length; 
        //console.log(nb_user_group);
        var i = 0;
        //for(i=locations.length-1;i>=0;i--)
        for(i=0;i<userGroups.length;i++)    //user's groups ids start at 1
        {   //alert(userGroups[i].id);      // 0 id is reserved for default group (gray color)
            groups[userGroups[i].id].name = userGroups[i].name; 
        }
    }catch(e){
       console.log("error : "+e.message);
    }
    
    //DISPLAY USER DATA;
    showUserGroups(displayUserDatas);
    /*
    * GROUPS : get user's groups from server and fill the UI with it
    */
    //getUserGroups(showUserGroups);
    /*
    * LOCATIONS : get user's locations from server and fill the UI with it
    */  
    //getStoredLocations();//User locations object stored in an array
            // location object={id:0,name:"",group:"",lat:0,lon:0,adr:"",country:"",publicName:""}
    /*getUserPosition(function(){//gets user position and start watchposition
        var locsToPrint = getPositions();
        printUserLocation(0,locsToPrint,fadeIN2);
    },1000);
    //after datas init is done
    $('body').anima({
        opacity: '1', 
        filter: 'alpha(opacity=100)',
    }, 350, "linear");*/
}
/* * * * *
*   Display user data
*/
function displayUserDatas(){
    console.log("in displayUserDatas function");
    //getUserPosition(function(){//gets user position and start watchposition
    var locsToPrint = getPositions();
    printUserLocation(0,locsToPrint,fadeIN2);
    //},1000);
    //after datas init is done
    $('body').anima({
        opacity: '1', 
        filter: 'alpha(opacity=100)',
    }, 350, "linear");
}

/*
*
*/
function refreshData(stringDatas){
    console.log("in refreshData function");
    //PARSE NEW USER DATAS
    try{
        console.log("Android data received is"+stringDatas);
        if(stringDatas.length>0){
            //RETRIEVE USER DATA
            var datas = JSON.parse(stringDatas);
            userGroups = datas.groups;
            locations = datas.locs;
        }
        //SET USER GROUPS
        nb_user_group = userGroups.length; 
        //console.log(nb_user_group);
        var i = 0;
        //for(i=locations.length-1;i>=0;i--)
        for(i=0;i<userGroups.length;i++)    //user's groups ids start at 1
        {   //alert(userGroups[i].id);      // 0 id is reserved for default group (gray color)
            groups[userGroups[i].id].name = userGroups[i].name; 
        }
    }catch(e){
       console.log("error : "+e.message);
    }
    //DISPLAY REFRESHED USER DATAS
    var groupToDisplay = $('.currentGroup').attr('name');
    var idGroupToDisplay = parseInt(groupToDisplay);
    var locToDisplay = getPositions(idGroupToDisplay);
    printUserLocation(idGroupToDisplay,locToDisplay,fadeIN2);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
*   MOUSE EVENT
* * * * * * * * * * * * * * * * * * * * * * * * * * */
/*
*   dragStart : called at the end of long press, initiate drag
*/
function isInElement(point, object){
    var objectBox = { 
        x1: object.offset().left, 
        y1: object.offset().top,
        x2: object.offset().left + object.outerWidth(),
        y2: object.offset().top + object.outerHeight()
    };
    if(point.x>=objectBox.x1 && point.x<=objectBox.x2 && point.y>=objectBox.y1 && point.y<=objectBox.y2){
        return true;
    }else{
        return false;
    }
}

function isInDroppable(point){
    var obj = null;
    $('.droppable').each(function(){
        if(isInElement(point,$(this))){
            obj=$(this);
        }
    });

    return obj;
}

function dragStart(xpos, ypos){
    //INITIATE DRAG
    isDragging = 1; //prevent other behavior (scroll) while drag
    //Show trash
    $('#trash').css('display','block');
	var cloneBIS;
    //change look of selected and dragged element color selected and draged item
    if(dragType=='loc'){
        //GA
        GATrackerEvent("Drag", "loc_drag", selectedDraggable.attr('id'));
        //
        if($('.currentGroup').attr('name')!="0"){$('.currentGroup').removeClass('droppable');}
        if(selectedDraggable.hasClass("new")){$('.group').removeClass('droppable');}
        //clone selected loc
        clone=document.getElementById(selectedDraggable.attr('id')).cloneNode(true);
        
        if($('.currentGroup').attr('name')=="0"){
            //aspect 
            selectedDraggable.css('background-color','#f1f1f1');
            selectedDraggable.css({
                opacity: '0.3', 
                filter: 'alpha(opacity=30)',
            });
        }else{
            //aspect 
            selectedDraggable.css({
                opacity: '0', 
                filter: 'alpha(opacity=0)',
            });
        }

        //calculate offset selection
        cloneOffset.x = xpos - selectedDraggable.offset().left-10;// - 20; //20px right so that clone doesn't completely overlap original
        cloneOffset.y = ypos - selectedDraggable.offset().top+10;// + 20; //20px up so that clone doesn't completely overlap original
        

    }else if(dragType=='group'){
        //GA
        GATrackerEvent("Drag", "group_drag", selectedDraggable.attr('id'));
        //
        $('.group').removeClass('droppable');
        //clone selected loc
        clone=document.getElementById(selectedDraggable.attr('id')).cloneNode(true);
        //aspect of selectedDraggable
        selectedDraggable.css({
            'background-color': '#F2F1F1',
            border: mylo_UI_init_variables[0].gborerSize+'px solid #FFFFFF',
        });
        selectedDraggable.children().css({
            opacity: '0', 
            filter: 'alpha(opacity=0)',
        });
        //calculate offset selection
        cloneOffset.x = xpos - selectedDraggable.offset().left + 10; //10px left so that clone doesn't completely overlap original
        cloneOffset.y = ypos - selectedDraggable.offset().top - 5; //10px down so that clone doesn't completely overlap original
    }
    
    //alert(cloneOffset.x+' '+cloneOffset.y);
    //alert($('#'+selectedDraggable).offset().left+' '+$('#'+selectedDraggable).offset().top);
	
    //clone selected loc
    //clone=document.getElementById(selectedDraggable.attr('id')).cloneNode(true);
    clone.className += " disablePointerEvents clone";
    //clone.setAttribute("id", "clone");
    clone.style.position="absolute";
    clone.style.top=ypos-cloneOffset.y+'px';
    clone.style.left=xpos-cloneOffset.x+'px';
    //clone.style.opacity = "0.7";
    //clone.style.filter  = 'alpha(opacity=70)'; // IE fallback
    document.body.appendChild(clone);

    /*if( dragType=='loc'){  
        $('.clone').anima({scaleX:0.7, scaleY:0.7}, 200);
    }*/
    if( dragType=='loc'){  
        $('.clone').css({'border-top':'none'});
    }
    //BIND END OF DRAG
    document.body.onmouseup=dragEnd;

    //TRIGGER DRAG
    //selectedDraggable.trigger('touchmove');
    $('body').trigger('touchmove');
}
/*
* drag : called while dragging
*/
function drag(xpos, ypos){
    
    var point = {x:xpos,y:ypos};
    //make clone followin mouse
    clone.style.top=ypos-cloneOffset.y+'px';
    clone.style.left=xpos-cloneOffset.x+'px';

    if(selectedDroppable!=null){//hovered droppable already entered
        //alert(e.target.attr('name'));
        if(isInElement(point, selectedDroppable)){
            
        }else{
            myMouseLeave(selectedDroppable);
        }
    }else{
        selectedDroppable=isInDroppable(point);
        if(selectedDroppable!=null){// new droppable entered
            myMouseEnter(selectedDroppable);
        }
    }
    
    //if( (isInElement(point, $('.trash')) || isInElement(point, $('#groupsDiv'))) && !mylo_UI_init_variables[0].out_of_draggable){
    if(isInElement(point, $('#groupsDiv')) && !mylo_UI_init_variables[0].out_of_draggable){  
        //if( dragType=='loc' && !mylo_UI_init_variables[0].out_of_draggable){  
            if(dragType=='loc'&& !selectedDraggable.hasClass("new")){
                $('.clone').anima({scaleX:0.6, scaleY:0.6}, 150);
                clone.style.opacity = "0.7";
                mylo_UI_init_variables[0].out_of_draggable=1;
            }//else{
                //$('.clone').anima({scaleX:0.9, scaleY:0.9}, 200);
            //}      
        //}
    }else if(!isInElement(point, $('.trash')) && !isInElement(point, $('#groupsDiv')) && mylo_UI_init_variables[0].out_of_draggable){
    //}else if(!isInElement(point, $('#groupsDiv')) && mylo_UI_init_variables[0].out_of_draggable){  
        if(dragType=='loc'){
            $('.clone').anima({scaleX:1, scaleY:1}, 150);
            clone.style.opacity = "1";
            mylo_UI_init_variables[0].out_of_draggable=0;
        }
    }
}
/*
* dragEnd : called at the end of drag
*/
function afterDrag(){
    //console.log('in afterDrag function');
    //dragged loc css
    if(dragType=='loc'){
        if(selectedDraggable.hasClass("new")){
            $('.group').addClass('droppable');
            selectedDraggable.css('background-color','#f2f1f1');
        }else{
            selectedDraggable.css('background-color','#ffffff');
            $('.currentGroup').addClass('droppable');
        }
    }else{
        var groupID = parseInt(selectedDraggable.attr('name'));
        selectedDraggable.css({
            'background-color': '#ffffff',
            border: mylo_UI_init_variables[0].gborerSize+'px solid '+getGroupColor(groupID),
        });
        selectedDraggable.children().css({
            opacity: '1', 
            filter: 'alpha(opacity=100)',
        });
        $('.group').addClass('droppable');
    }

    selectedDraggable.css({
        opacity: '1', 
        filter: 'alpha(opacity=100)',
    });
    
}
function dragEnd(xpos, ypos){
    try {
        if(isDragging){
            //GA
            GATrackerEvent("Drag_end", "Total", "");
            //
            mylo_UI_init_variables[0].out_of_draggable=0;
            //console.log('in dragend and ready_to_delete:'+mylo_UI_init_variables[0].ready_to_delete);
            // IF drag is a location drag
            if(dragType=='loc'&& selectedDroppable){
                
                // If location was drop on a group => move/add location to group
                if(selectedDroppable.hasClass('group')){
                    //GA
                    GATrackerEvent("Drag_end", "loc_drag_end", "change_group");
                    //
                    var groupId = selectedDroppable.attr('name');
                    //Place draggedloc in selected group
                    changeLocGroup(selectedDraggable.attr('id'), groupId);
                    //mouseleave of slected group
                    selectedDroppable.stopAnima(true);
                    selectedDroppable.anima({
                        width: mylo_UI_init_variables[0].groupSize+'px',
                        height: mylo_UI_init_variables[0].groupSize+'px',
                        'margin-top': gMarginTop+'px',
                        'margin-left': mylo_UI_init_variables[0].gGutter+'px',
                        //'line-height': mylo_UI_init_variables[0].groupSize+'px',
                        }, 100, 'linear', function(){}
                    );
                    selectedDroppable.find('p').anima({
                        'margin-top':Math.floor((mylo_UI_init_variables[0].groupSize-selectedDroppable.find('p').height())/2)+'px',
                        width : mylo_UI_init_variables[0].groupSize-10+'px',
                        'margin-left': Math.floor((mylo_UI_init_variables[0].groupSize-(mylo_UI_init_variables[0].groupSize-5))/2)+'px',
                        }, 100, 'linear', function(){}
                    );
                    //GA
                    //analytics.trackEvent("Drag_end", "loc_drag_end", "change_group", 1);
                //If location was drop on trash => delete location
                }else if(selectedDroppable.hasClass('trash')){
                    
                    if(mylo_UI_init_variables[0].ready_to_delete){
                        //GA
                        GATrackerEvent("Drag_end", "loc_drag_end", "delete_loc");
                        //
                        //console.log('in if else and ready_to_delete:'+mylo_UI_init_variables[0].ready_to_delete);
                        //alert('delete location '+selectedDraggable.attr('id'));
                        deleteStoredLocation(selectedDraggable.attr('id'));
                        selectedDroppable.find('#off').css('display','block');
                        selectedDroppable.find('#focus').css('display','none');
                        selectedDroppable.css({
                            'background-color':'#FBFBFB',
                            'border-top': '1px solid #F2F1F1',
                        });
                        //GA
                        //analytics.trackEvent("Drag_end", "loc_drag_end", "delete_loc", 1);
                        //
                        //myMouseLeave(selectedDroppable);
                        $('#trash_bouncer').stopAnima(true);
                        mylo_UI_init_variables[0].ready_to_delete=0;
                        $('#trash_bouncer').anima({scaleX:1, scaleY:1}, 0,'0.6, 0.04, 0.98, 0.335');
                        $('#trash_bouncer').css('display','none');
                    }else{
                        //GA
                        GATrackerEvent("Drag_end", "loc_drag_end", "delete_loc_not_ready");
                        //
                        myMouseLeave(selectedDroppable);
                        afterDrag();
                    }
                }
            }else if(dragType=='group' && selectedDroppable){
                
                if(selectedDroppable.hasClass('trash')){
                    
                    if(mylo_UI_init_variables[0].ready_to_delete){
                        //GA
                        GATrackerEvent("Drag_end", "group_drag_end", "delete_group");
                        //
                        deleteGroup(selectedDraggable.attr('name'));
                        selectedDroppable.find('#off').css('display','block');
                        selectedDroppable.find('#focus').css('display','none');
                        selectedDroppable.css({
                            'background-color':'#FBFBFB',
                            'border-top': '1px solid #F2F1F1',
                        });
                        
                        var totalGroups = $('.group');
                        // Set groupWraper width equal to total width of all groups outerHeight
                        var wraperWidth = (mylo_UI_init_variables[0].groupSize+2*mylo_UI_init_variables[0].gborerSize+mylo_UI_init_variables[0].gGutter)*(totalGroups.length+1)+mylo_UI_init_variables[0].gGutter;
                        $('#groupWraper').css({
                            'width': wraperWidth+'px',
                            height:mylo_UI_init_variables[0].groupsDivHeight+'px',
                            //'overflow-x':'auto',
                        });
                        if(wraperWidth<$(window).width()){
                            $('#groupsContainer').css({width: wraperWidth+'px'});
                        }else{
                            $('#groupsContainer').css({width: $(window).width()+'px'});
                        }
                        //GA
                        //analytics.trackEvent("Drag_end", "group_drag_end", "delete_group", 1);
                        //
                        //myMouseLeave(selectedDroppable);
                        $('#trash_bouncer').stopAnima(true);
                        mylo_UI_init_variables[0].ready_to_delete=0;
                        $('#trash_bouncer').anima({scaleX:1, scaleY:1}, 0,'0.6, 0.04, 0.98, 0.335');
                        $('#trash_bouncer').css('display','none');
                    }else{
                        //GA
                        GATrackerEvent("Drag_end", "group_drag_end", "delete_group_not_ready");
                        //
                        myMouseLeave(selectedDroppable);
                        afterDrag();
                    }
                }
            }else{
                //GA
                GATrackerEvent("Drag_end", dragType+"_drag", selectedDraggable.attr('id'));
                //
                //console.log('yop?');
                afterDrag();
            }

            //empty slected droppable
            selectedDroppable = null;
            //remove helper
            $('.clone').remove();
            //hide trash
            $('#trash').css('display','none');
            //end dragging
            isDragging=0;
        }
    }
    catch(err) {
        //alert(err.message);
        //GA
        //analytics.trackEvent("Action_fail", "drag_end", err.message, 1);
    }

   
    
}


var pressTimer;
function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    //event.preventDefault();
    if(isDragging){event.preventDefault();}
}

function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);    
}

function myMouseEnter(obj){
    //alert('in myMouseEnter');
    if(obj.hasClass('group')&& dragType=='loc'){//group object entered
        if(obj.hasClass('droppable')){//droppable group object entered
            obj.stopAnima(true);
            obj.anima({
                width: mylo_UI_init_variables[0].groupSize*1.2+'px',
                height: mylo_UI_init_variables[0].groupSize*1.2+'px',
                'margin-top': gMarginTop-((mylo_UI_init_variables[0].groupSize*1.2-mylo_UI_init_variables[0].groupSize)/2)+'px',
                //'margin-left': mylo_UI_init_variables[0].gGutter-((mylo_UI_init_variables[0].groupSize*1.2-mylo_UI_init_variables[0].groupSize)/2)+'px',
                }, 100, 'linear', function(){}
            );
            obj.find('p').anima({
                'margin-top':Math.floor((mylo_UI_init_variables[0].groupSize*1.2-obj.find('p').height())/2)+'px',
                width : mylo_UI_init_variables[0].groupSize-10+'px',
                'margin-left': Math.floor((mylo_UI_init_variables[0].groupSize*1.2-(mylo_UI_init_variables[0].groupSize-5))/2)+'px',
                }, 100, 'linear', function(){}
            );
            //selectedDroppable = $(this);
            var groupId = parseInt(obj.attr('name'));
            $('.clone').find('.container').css({
                'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[groupId].color,
            });
            selectedDraggable.find('.container').css({
                'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[groupId].color,
            }); 
        }
    }else if(obj.attr('id')=='trash'){

        obj.find('#off').css('display','none');
        obj.find('#focus').css('display','block');
        obj.css({
            //'background-color':'#'+mylo_UI_init_variables[0].formActiveColor,
            //'border-top': '1px solid #ffffff',
            'border-top': '1px solid rgba(0,0,0,0)',
        });
        $('#trash_bouncer').stopAnima(true);
        $('#trash_bouncer').css('display','block');
        var s = (screenWidth/60)+1; //60 = size of trash_boucer
        //console.log('in mymouseenter and ready_to_delete:'+mylo_UI_init_variables[0].ready_to_delete);
        if(dragType=='loc'){
            $('.clone').css({
                opacity: '0.7', 
                filter: 'alpha(opacity=70)',
            });
            $('.clone').anima({scaleX:0.6, scaleY:0.6}, 100,{complete:function(){
                $('#trash_bouncer').anima({scaleX:s, scaleY:s}, 350,".6, .04, .98, .335",{complete:function(){
                    mylo_UI_init_variables[0].ready_to_delete=1;
                    if(selectedDraggable.hasClass('loc') && $('.currentGroup').attr('name')=="0"){
                        selectedDraggable.css({
                            opacity: '0', 
                            filter: 'alpha(opacity=0)',
                        });
                    }
                }});
            }});
            mylo_UI_init_variables[0].out_of_draggable=1;
            //console.log('ready_to_delete:'+mylo_UI_init_variables[0].ready_to_delete);
        }else{
            //clone.style.opacity = "0.7";
            $('.clone').anima({scaleX:1, scaleY:1}, 100,{complete:function(){
                $('#trash_bouncer').anima({scaleX:s, scaleY:s}, 350,".6, .04, .98, .335",{complete:function(){
                    mylo_UI_init_variables[0].ready_to_delete=1;
                }});
            }});
            //$('#trash_bouncer').anima({scaleX:s, scaleY:s}, 800,".6, .04, .98, .335");
        }
        
        
        //$(this).css('background-color','#'+mylo_UI_init_variables[0].formActiveColor);
        //selectedDroppable = $(this); 
    }//else{selectedDroppable = null;alert('false alert');}

}

function myMouseLeave(obj){
    //console.log('in myMouseLeave function');
    //console.log('outofdraggable='+mylo_UI_init_variables[0].out_of_draggable);
    if(obj.hasClass('group') && dragType=='loc'){
        if(obj.hasClass('droppable') && isDragging){
            obj.stopAnima(true);
            obj.anima({
                width: mylo_UI_init_variables[0].groupSize+'px',
                height: mylo_UI_init_variables[0].groupSize+'px',
                'margin-top': gMarginTop+'px',
                'margin-left': mylo_UI_init_variables[0].gGutter+'px',
                //'line-height': mylo_UI_init_variables[0].groupSize+'px',
                }, 100, 'linear', function(){}
            );
            obj.find('p').anima({
                'margin-top':Math.floor((mylo_UI_init_variables[0].groupSize-obj.find('p').height())/2)+'px',
                width : mylo_UI_init_variables[0].groupSize-10+'px',
                'margin-left': Math.floor((mylo_UI_init_variables[0].groupSize-(mylo_UI_init_variables[0].groupSize-5))/2)+'px',
                }, 100, 'linear', function(){}
            );
            var loc = getLoc(parseInt($('.clone').attr('id')));
            var groupId = loc.group;
            $('.clone').find('.container').css({
                'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[groupId].color,
            });
            selectedDraggable.find('.container').css({
                'border-left': mylo_UI_init_variables[0].locBorder+'px solid '+groups[groupId].color,
            });
        }
    }else if(obj.attr('id')=='trash'){
        $('#trash_bouncer').stopAnima(true);
        mylo_UI_init_variables[0].ready_to_delete=0;
        obj.find('#off').css('display','block');
        obj.find('#focus').css('display','none');
        obj.css({
            //'background-color':'#fbfbfb',
            'border-top': '1px solid #F2F1F1',
        });
        $('#trash_bouncer').anima({scaleX:1, scaleY:1}, 0,'0.6, 0.04, 0.98, 0.335');
        $('#trash_bouncer').css('display','none');

        if(selectedDraggable.hasClass('loc') && $('.currentGroup').attr('name')=="0"){
            selectedDraggable.css({
                opacity: '0.3', 
                filter: 'alpha(opacity=30)',
            });
        }
        $('.clone').anima({scaleX:1, scaleY:1}, 100);
        clone.style.opacity = "1";
        /*$('.clone').css({
            opacity: '1', 
            filter: 'alpha(opacity=100)',
        });*/
        /*clone.style.opacity = "1";*/
        //$(this).css('background-color','#'+mylo_UI_init_variables[0].formInactiveColor);
        //empty slected droppable
        //selectedDroppable = null;
    }
    //empty slected droppable
    selectedDroppable = null;
}