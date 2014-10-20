function horizontalTranslateAnimation(HTMLElement,startPos,endPos,endTime,propertyToAnimate){
	//console.log("In horizontalTranslateAnimation function");
	var startTime;
	var start = startPos;
	var end = endPos;
	var change = end-start;
	var duration = endTime;
	var endSuperiorToStart;

	function initHorizontalTranslate(){
		//console.log("In initHorizontalTranslate function");
		startTime = null;
		if(end-start>0){endSuperiorToStart=true;}else{endSuperiorToStart=false;}
	}
	function horizontalTranslate(timestamp){
		if(startTime==null){
			startTime = timestamp;
		}
		var t = timestamp-startTime;
		console.log("t="+t+", marginLeft="+easeOutCircNew(t, start, end, duration)+", endPos="+endPos);
		//translate
		var newLeft = easeOutCircNew(t, start, end, duration);
		if(endSuperiorToStart){
			if(newLeft>endPos){newLeft=endPos;}
		}else{
			if(newLeft<endPos){newLeft=endPos;}
		}
		if(propertyToAnimate=="marginLeft"){
			HTMLElement.style.marginLeft= newLeft+"px";	
		}else if(propertyToAnimate=="left"){
			HTMLElement.style.left= newLeft+"px";	
		}
		
		if(endSuperiorToStart){
			if(newLeft<endPos){
				//repeat
				requestAnimationFrame(horizontalTranslate);
			}
		}else{
			if(newLeft>endPos){
				//repeat
				requestAnimationFrame(horizontalTranslate);
			}
		}
	}
	//ANIMATE
	initHorizontalTranslate();
	var id = requestAnimationFrame(horizontalTranslate);
	return id;
}

function linear(t,deb,fin,endTime){//t, b, c, d
	return Math.floor(deb + t/endTime * (fin-deb)); 
}

function easeOutCircNew (t,deb,fin,endTime) {
	var delta = fin - deb;
	var coeff1 = Math.sqrt(t / endTime);
	var coeff = Math.sqrt(coeff1);
	return delta * coeff + deb;

}