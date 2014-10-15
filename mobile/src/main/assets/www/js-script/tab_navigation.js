function switch_tab(id_clicked){
	centerMap(mylo_UI_init_variables[0].userpos.lat,mylo_UI_init_variables[0].userpos.lon);
	var id_active = $('.tabs').find('.active').attr('id');
	if(id_active != id_clicked){
		$('#locsWraper').stopAnima(true);
		$('#indicator').stopAnima(true);
		if( id_clicked == "map"){
			//slide locsContainer from right to left
			$('#locsWraper').anima({
				'margin-left': '-'+screenWidth+'px',
				}, 350, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
			$('#indicator').anima({
				'left': screenWidth/2+'px',
				}, 350, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
		}else{
			//slide locsContainer from right to left
			$('#locsWraper').anima({
				'margin-left': '0px',
				}, 350, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
			$('#indicator').anima({
				'left': '0px',
				}, 350, '0.120, 0.715, 0.355, 0.875',{complete:function(){

			}});
		}
		$('#'+id_active).removeClass('active');
		$('#'+id_clicked).addClass('active');
	}
}