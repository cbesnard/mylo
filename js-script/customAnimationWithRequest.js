function translationAnimation(HTMLElement,startPos,endPos,endTime,propertyToAnimate,easingFunction){
	//console.log("In horizontalTranslateAnimation function");
	var startTime;
	var start = startPos;
	var end = endPos;
	var change = end-start;
	var duration = endTime;
	var endSuperiorToStart;

	function initTranslation(){
		//console.log("In initTranslation function");
		startTime = null;
		if(end-start>0){endSuperiorToStart=true;}else{endSuperiorToStart=false;}
	}
	function translate(timestamp){
		if(startTime==null){
			startTime = timestamp;
		}
		var t = timestamp-startTime;
		//console.log("t="+t+", marginLeft="+easeOutCircNew(t, start, end, duration)+", endPos="+endPos);
		//GET NEW POS WITH EASING FUNCTION
		var newPos;
		if(easingFunction=="easeOutCircNew"){
			newPos = easeOutCircNew(t, start, end, duration);
		}else if(easingFunction=="linear"){
			newPos = linear(t, start, end, duration);
		}
		
		//TRESHOLD to stay under given endPos
		if(endSuperiorToStart){
			if(newPos>endPos){newPos=endPos;}
		}else{
			if(newPos<endPos){newPos=endPos;}
		}
		//TRANSLATE
		if(propertyToAnimate=="marginLeft"){
			HTMLElement.style.marginLeft= newPos+"px";	
		}else if(propertyToAnimate=="left"){
			HTMLElement.style.left= newPos+"px";	
		}else if(propertyToAnimate=="bottom"){
			HTMLElement.style.bottom= newPos+"px";	
		}
		
		if(endSuperiorToStart){
			if(newPos<endPos){
				//repeat
				requestAnimationFrame(translate);
			}
		}else{
			if(newPos>endPos){
				//repeat
				requestAnimationFrame(translate);
			}
		}
	}
	//ANIMATE
	initTranslation();
	var id = requestAnimationFrame(translate);
	return id;
}

function cascadeTranslationAnimation(HTMLElementArray,startPos,endPos,endTime,propertyToAnimate,easingFunction,delay){
	//console.log("In horizontalTranslateAnimation function");
	var nb_el = HTMLElementArray.length;
	//TIME
	var startTime;
	//POSITION
	var start = startPos;
	var end = endPos;
	var change = end-start;
	//DURATION
	var duration = endTime;
	var total_duration;
	//
	var endSuperiorToStart;
	
	function initCascadeTranslation(){
		//console.log("In initTranslation function");
		startTime = null;
		if(end-start>0){endSuperiorToStart=true;}else{endSuperiorToStart=false;}
		total_duration = duration+delay*(nb_el-1);
	}
	function cascadeTranslate(timestamp){
		if(startTime==null){
			startTime = timestamp;
		}
		var t = timestamp-startTime;
		//console.log("t="+t+", marginLeft="+easeOutCircNew(t, start, end, duration)+", endPos="+endPos);
		//GET NEW POS WITH EASING FUNCTION
		var i=0;
		for(i=0;i<nb_el;i++){
			var time = t - delay*i;
			if(time>=0){
				var newPos;
				if(easingFunction=="easeOutCircNew"){
					newPos = easeOutCircNew(time, start, end, duration);
				}else if(easingFunction=="linear"){
					newPos = linear(time, start, end, duration);
				}
				//TRESHOLD to stay under given endPos
				if(endSuperiorToStart){
					if(newPos>endPos){newPos=endPos;}
				}else{
					if(newPos<endPos){newPos=endPos;}
				}
				//TRANSLATE
				if(propertyToAnimate=="marginLeft"){
					HTMLElementArray[i].style.marginLeft = newPos+"px";
				}else if(propertyToAnimate=="left"){
					HTMLElementArray[i].style.left = newPos+"px";	
				}else if(propertyToAnimate=="bottom"){
					HTMLElementArray[i].style.bottom = newPos+"px";
				}	
			}
		}

		if(endSuperiorToStart){
			if(parseInt($("#"+HTMLElementArray[nb_el-1].id).css("marginLeft"))<endPos){
				//repeat
				requestAnimationFrame(cascadeTranslate);
			}
		}else{
			if(parseInt($("#"+HTMLElementArray[nb_el-1].id).css("marginLeft"))>endPos){
				//repeat
				requestAnimationFrame(cascadeTranslate);
			}
		}
	}
	//ANIMATE
	initCascadeTranslation();
	var id = requestAnimationFrame(cascadeTranslate);
	return id;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*
*	EASING FUNCTIONS
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function linear(t,deb,fin,endTime){//t, b, c, d
	return Math.floor(deb + t/endTime * (fin-deb)); 
}

function easeOutCircNew (t,deb,fin,endTime) {
	var delta = fin - deb;
	var coeff1 = Math.sqrt(t / endTime);
	var coeff = Math.sqrt(coeff1);
	var coeff2 = Math.sqrt(coeff);
	return delta * coeff2 + deb;

}