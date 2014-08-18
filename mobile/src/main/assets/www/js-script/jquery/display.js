/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*	SET CSS PROPERTIES OF DISPLAYED GROUPS + ADD "ADDGROUP" BUTTON
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function initializeGroup(){	//Set css properties of group div
	$('#groupsDiv').append('<div class="group addGroup">+</div>');
	
	$('.group').css({
		height: groupSize+'px',
		width: groupSize+'px',
		'margin-left': gGutter+'px',
		'margin-top': gMarginTop+'px',
		'line-height': groupSize+'px',
		'font-size': gFontSize+'px',
	});
	
	$('.addGroup').css({
		height: addGroupSize+'px',
		width: addGroupSize+'px',
		'margin-left': gGutter+'px',
		'margin-top': gMarginTop+'px',
		'line-height': addGroupSize+'px',
		'font-size': addGroupFontSize+'px',
		border: addGroupBorder+'px dashed #CCCCCC',
		color: '#999999',
	});
	var totalGroups = $('.group');
	$('.group').wrapAll('<div id="groupWraper"></div>')
	// Set groupWraper width equal to total width of all groups
	$('#groupWraper').css('width', (groupSize+2*gborerSize+gGutter)*(totalGroups.length+1));
	$('#groupsDiv').css('overflow-x', 'scroll');
}

/* * * * * * * * * * * * * * * * * * * * * * *
*	showUserGroups() : display user's group
* * * * * * * * * * * * * * * * * * * * * * */
function showUserGroups(callback){
	var i=0;
	for(i=0;i<groups.length;i++){
		if(groups[i].name!=""){
			$('#groupsDiv')
			.append('<div class="group" name="'+groups[i].id+'"><!--p class="groupname"-->'+groups[i].name+'<!--/p--></div>');
			//$('#'+groups[i].id).css({
				//alert(groups[i].id+' color: '+groups[i].color);
				$('[name="'+groups[i].id+'"]').css({
				border: gborerSize+'px solid '+groups[i].color,
				//'background-color': groups[i].color,
				//display:'none',
			});
		}
	}
	initializeGroup();
}