/* Certificate */
var Lesson405 = {
	pre: function()
	{
      	$('.wrap-course').css({
				'border':'0'
				});
				$('header').css({
				'display':'none'
				});
		//if cont-form does not exist then username is passed automatically
		if($('.body_certificate .cont-form').length < 1)
		{
			if(fSCORM)
			{
				var s;
				s = SCORMDriver.GetStudentName();
				s += " " + SCORMDriver.GetStudentID();
				$('#cert-fullname').html(s);
			}
			else $('#cert-fullname').html(lucyName);
		}
		else
		{
			$('.body_certificate .cont').hide(); //the user enters the name manually
		}
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

		$('#cert-date').html(sdt);
		$('.body_certificate .cont span.score').html(parseInt(Course.oState.allPoints) + '%');
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson405.pre();
				Course.showLesson(405, function()
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
		//remove all lessons except lesson405
		$('.course .holder .lesson').each(function()
		{
			if(!$(this).hasClass('lesson405')) $(this).remove();
		});

		//hide menu
		$('.course header ul.nav li.li-hidestart').css({
			'opacity': '0',
			'pointer-events': 'none',
			'cursor': 'auto'
		});

		$('div.debug-wnd').css('display','none');

		window.print();
	}
};
