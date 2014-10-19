function switch_tab(id_clicked){
	var id_active = $('.tabs').find('.active').attr('id');
	var lat = mylo_UI_init_variables[0].userpos.lat;
	var lon = mylo_UI_init_variables[0].userpos.lon;
	centerMap(lat,lon);
	updateUserMarkerPosition(lat,lon);
	if(id_active != id_clicked){
		$('#locsWraper').stopAnima(true);
		$('#indicator').stopAnima(true);
		if( id_clicked == "map"){
			//slide locsContainer from right to left
			/*$('#locsWraper').anima({
				'margin-left': '-'+screenWidth+'px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){
	
			}});*/
			var element = document.getElementById("locsWraper");
			horizontalTranslateAnimation(element,0,-screenWidth,350);
			$('#indicator').anima({
				'left': screenWidth/2+'px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
		}else{
			//slide locsContainer from right to left
			$('#locsWraper').anima({
				'margin-left': '0px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
			$('#indicator').anima({
				'left': '0px',
				}, 200, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
		}
		$('#'+id_active).removeClass('active');
		$('#'+id_clicked).addClass('active');
	}
}