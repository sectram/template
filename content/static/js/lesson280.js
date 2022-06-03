/* end page & certificate */
var Lesson280 = {
	pre: function()
	{
	$('#lesson280 .ava-name').hide();

		if(Course.oState.avatar == 0) //0 - Sam
		{
			$('#lesson280 .is_sam').show();
			$('#lesson280 .is_sue').hide();
		}
		else if(Course.oState.avatar == 1) //1 - Sue
		{
			$('#lesson280 .is_sam').hide();
			$('#lesson280 .is_sue').show();
		}
		else if(Course.oState.avatar == 2) //2 - Arab Man
		{
			$('#lesson280 .is_arM').show();
			$('#lesson280 .is_arW').hide();
		}
		else if(Course.oState.avatar == 3) //3 - Arab Woman
		{
			$('#lesson280 .is_arM').hide();
			$('#lesson280 .is_arW').show();
		}
		else if(Course.oState.avatar == 4) //2 - Indian Man
		{
			$('#lesson280 .is_inM').show();
			$('#lesson280 .is_inW').hide();
		}
		else if(Course.oState.avatar == 5) //3 - Indian Woman
		{
			$('#lesson280 .is_inM').hide();
			$('#lesson280 .is_inW').show();
		}
		else if(Course.oState.avatar == 6) //2 - African Man
		{
			$('#lesson280 .is_afM').show();
			$('#lesson280 .is_afW').hide();
		}
		else if(Course.oState.avatar == 7) //3 - African Woman
		{
			$('#lesson280 .is_afM').hide();
			$('#lesson280 .is_afW').show();
		}
		else if(Course.oState.avatar == 8) //2 - Asian Man
		{
			$('#lesson280 .is_asM').show();
			$('#lesson280 .is_asW').hide();
		}
		else if(Course.oState.avatar == 9) //3 - Asian Woman
		{
			$('#lesson280 .is_asM').hide();
			$('#lesson280 .is_asW').show();
		}
		else //show avatar sue
		{
			$('#lesson280 .is_sue').show();
		}

		var i,j, nn;
		var s="";

		if(Course.oState.allPoints >= Course.minPoints)
		{
			$('#lesson280 .col-bad').hide();
			$('#lesson280 .col-ok').show();
		}
		else
		{
			$('#lesson280 .col-bad').show();
			$('#lesson280 .col-ok').hide();
		}

		$('#lesson280 span.n_cards').html(Course.oState.nCards); //Cards
		$('#lesson280 span.n_score').html(parseInt(Course.oState.allPoints)); //Achieved points

		//Your level
		$('#lesson280 p.level span').hide();
		if(Course.oState.allPoints >= Course.expertPoints) $('#lesson280 p.level span.l3').show();
		else if(Course.oState.allPoints >= Course.minPoints) $('#lesson280 p.level span.l2').show();
		else $('#lesson280 p.level span.l1').show();
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Course.calcCardPoints();
				Lesson280.pre();
            	$('#lesson280 .bot-buttons button.b-xx-close').hide();
				Course.showLesson(280, function()
				{
                  	$('#lesson280 .bot-buttons button.b-xx-prev').fadeIn(700);
					endCourse();
				});
				break;
            
		}
	},

	back: function()
	{
		//Lesson261.next(0);
      Lesson50.next(1);
	}
};


/* Certificate */
var Lesson281 = {
	pre: function()
	{
      	
		var d = new Date();
		var h = d.getHours(), m = d.getMinutes();
		var day = d.getDate();
		var mon = d.getMonth();
		var sdt = "";

		mon = parseInt(mon) + 1;

		if(day < 10) sdt = " 0" + day;
		else sdt = " " + day;
		sdt += ".";
		if(mon < 10) sdt += "0" + mon;
		else sdt += mon;
		sdt += "." + d.getFullYear();
		sdt = sdt.substr(1);
	
		var stime;

		if(h < 10) stime = " 0" + h;
		else stime = " " + h;
		stime += ":";
		if(m < 10) stime += "0" + m;
		else stime += m;
		Lesson281.SubmitFullName();
		$('#cert-date').html(sdt);
		$('#cert-time').html(stime);
		$('.body_certificate .cont span.score').html(parseInt(Course.oState.allPoints) + '%');
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				
				Course.showLesson(281, function()
				{
				});
				break;
            case 1:
				Lesson281.pre();
				Course.showLesson(281, function()
				{
					
				});
				break;
		}
	},

	SubmitFullName: function()
	{
		var fullname = $('#fullname').val();
		$('#cert-fullname').html(fullname);

		$('.body_certificate').css('opacity','0');
		$('.body_certificate .cont-form').hide();
		$('.body_certificate .cont').show();
		$('.body_certificate').animate({ opacity:1 }, 600);
    

		return false;
	},

	printCert: function()
	{
		//remove all lessons except lesson93
		$('.course .holder .lesson').each(function()
		{
			if(!$(this).hasClass('lesson281')) $(this).remove();
		});

		window.print();
	}
};
