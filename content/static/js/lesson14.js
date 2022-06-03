var Lesson14 = {
	pre: function()
	{
		Course.showBotButtons(14,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson14.pre();
				Course.swapLessons(Course.oState.currLesson, 14, function()
				{
                  	$('#lesson30').fadeOut();
					Course.showBotButtons(14,true);
				});
		}
	},

	//move to last shown/viewed page
	back: function()
	{
		Course.swapLessons(14, Course.oState.currLesson,function(){
        	if(Course.oState.currLesson == 30){
            	$(window).resize();
        		$('#lesson30').fadeIn(800, function(){
        			$('#lesson30 .slides').slick('slickGoTo', 0);
        		});
            }
        });
	}
};
