function horizontalTranslateAnimation(HTMLElement,startPos,endPos,endTime){
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
		var newMarginLeft = easeOutCircNew(t, start, end, duration);
		if(endSuperiorToStart){
			if(newMarginLeft>endPos){newMarginLeft=endPos;}
		}else{
			if(newMarginLeft<endPos){newMarginLeft=endPos;}
		}
		HTMLElement.style.marginLeft= newMarginLeft+"px";
		if(endSuperiorToStart){
			if(newMarginLeft<endPos){
				//repeat
				requestAnimationFrame(horizontalTranslate);
			}
		}else{
			if(newMarginLeft>endPos){
				//repeat
				requestAnimationFrame(horizontalTranslate);
			}
		}
	}
	//ANIMATE
	initHorizontalTranslate();
	requestAnimationFrame(horizontalTranslate);
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