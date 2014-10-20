var globalID;
var globalID2;
function switch_tab(id_clicked){
	var id_active = $('.tabs').find('.active').attr('id');
	var lat = mylo_UI_init_variables[0].userpos.lat;
	var lon = mylo_UI_init_variables[0].userpos.lon;
	centerMap(lat,lon);
	updateUserMarkerPosition(lat,lon);
	//
	var element = document.getElementById("locsWraper");
	var element2 = document.getElementById("indicator");
	if(id_active != id_clicked){
		$('#locsWraper').stopAnima(true);
		$('#indicator').stopAnima(true);
		window.cancelAnimationFrame(globalID);
		window.cancelAnimationFrame(globalID2);
		var locsWraperPos = parseInt($('#locsWraper').css("marginLeft"));
		var indicatorPos = parseInt($('#indicator').css("left"));
		console.log("locsWraperPos: "+locsWraperPos+", indicatorPos:"+indicatorPos);
		if( id_clicked == "map"){
			//slide locsContainer from right to left
			/*$('#locsWraper').anima({
				'margin-left': '-'+screenWidth+'px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){
	
			}});*/
			globalID = translationAnimation(element,locsWraperPos,-screenWidth,200,"marginLeft","easeOutCircNew");
			globalID2 = translationAnimation(element2,indicatorPos,screenWidth/2,200,"left","easeOutCircNew");
			/*$('#indicator').anima({
				'left': screenWidth/2+'px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});*/
		}else{
			//slide locsContainer from right to left
			globalID = translationAnimation(element,locsWraperPos,0,200,"marginLeft","easeOutCircNew");
			globalID2 = translationAnimation(element2,indicatorPos,0,200,"left","easeOutCircNew");
			/*
			$('#locsWraper').anima({
				'margin-left': '0px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
			$('#indicator').anima({
				'left': '0px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});*/
		}
		$('#'+id_active).removeClass('active');
		$('#'+id_clicked).addClass('active');
	}
}