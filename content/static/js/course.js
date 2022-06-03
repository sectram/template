(typeof window.lucyQuizAnswer === 'undefined') && (window.lucyQuizAnswer = function (a, b)
{
	console.log("lucyQuizAnswer", a,b);
});

(typeof window.lucyQuizEnd === 'undefined') && (window.lucyQuizEnd = function ()
{
	console.log("lucyQuizEnd");
});

(typeof window.lucyDispatchEvent === 'undefined') && (window.lucyDispatchEvent = function (a)
{
	console.log("lucyDispatchEvent",a);
});

$(function()
{
	topProgress.init(1);
  	Lesson10.next(100);
});

quizAnswers = [
	{
		les: 164, //7 questions
		n: 1
	},

	{
		les: 62, //12 questions
		n: 8
	},
];

$(window).on("load", function() 
{
	//hide loader window
	$('div.fixed-loader').fadeOut(800);
	setTimeout(function()
	{
		Lesson10.next(101);
	}, 700);
});

jQuery.fn.swap = function(b) {
	b = jQuery(b)[0];
	var a = this[0],
		a2 = a.cloneNode(true),
		b2 = b.cloneNode(true),
		stack = this;

	a.parentNode.replaceChild(b2, a);
	b.parentNode.replaceChild(a2, b);

	stack[0] = a2;
	return this.pushStack( stack );
};

var Course = {
	oState: {
		currLesson: 0,
		currFragment: 0,
		lang: 0,
		avatar: -1, //0 - Sam, 1 - Sue

		card51: 0,
		le_51:0,
		card52: 0,
		le_52:0,
		card53: 0,
		le_53:0,

		card60: 0,
	
		card61: 0, //exam
		le_61:0,
		card62: 0, //game
		le_62:0,
		
		//card164: 0, //exam
		//card164n: 0, //count of attempts (0..3)

		nCards: 0, //collected cards
		nPercent:0,
		allPoints: 0.0, //all points (cards and exams)
	},
	minPoints: 60, //minimal points
	expertPoints: 90, //expert

	videoPause: function()
	{
		//LessonXXXXX.videoPause();
	},

	lucyAnswer: function(les, quest, result)
	{
		/*
		console.log("lucyAnswer", les,quest,result);
		if(les == 101)
		{
			Course.setQAnswered(101, quest, result);
			console.log("101ans",Course.oState.chal101);
		}
		*/

		var i;
		for(i=0; i<quizAnswers.length; i++)
		{
			if(les == quizAnswers[i].les)
			{
				console.log("lucyAnswer",quizAnswers[i].n+quest, result);
				lucyQuizAnswer(quizAnswers[i].n+quest, result);
				return;
			}
		}
	},

	setMenuIcons: function(les)
	{
		function setitemclass(nitem, cl)
		{
			var el = $('.dws-menu ul li.les' + nitem);
			switch(cl)
			{
				case 'full':
					el.addClass('full');
					el.removeClass('part disabled');
					break;
				case 'part':
					el.addClass('part');
					el.removeClass('full disabled');
					break;
				default:
					el.removeClass('full');
					el.removeClass('part');
					break;
			}
		}

		function setif(val, n)
		{
			if(val >= 99)
				setitemclass(n, 'full');
			else if(val > 0)
				setitemclass(n, 'part');
			else
				setitemclass(n, '');
		}

		function setifa(arr, n)
		{
			var i;
			var v=0;
			for(i=0; i<arr.length; i++)
			{
				v += parseInt(arr[i]);
			}
			v = v/arr.length;
			if(v >= 99)
				setitemclass(n, 'full');
			else if(v > 0)
				setitemclass(n, 'part');
			else
				setitemclass(n, '');
		}

		var v, n;

		setif(Course.oState.card51, 51);
		setif(Course.oState.card52, 52);
		setif(Course.oState.card53, 53);
		v = [ Course.oState.card51, Course.oState.card52, Course.oState.card53 ];
		setifa(v, 50);

		setif(Course.oState.card61, 61);
		setif(Course.oState.card62, 62);
		n = Course.oState.card61/2 + Course.oState.card62/2;
		if(n > 0) Course.oState.card60 = n;
		setif(Course.oState.card60, 60);
	},

	//debug: go to lesson
	b_lesson_go: function()
	{
		var n = $('.debug-wnd input[name=lesson_n]').val();
		window['Lesson'+n].next(0);
	},

	setLessonFragment: function(les, fragm)
	{
		Course.oState.currLesson = parseInt(les);
		Course.oState.currFragment = parseInt(fragm);
		$('body div.debug-wnd input[name=lesson_n]').val(les);
		$('body div.debug-wnd span.lesson_fr').html(fragm);
	},

	swapLessons: function(nLesHide, nLesShow, fu)
	{
		var LesHide = $('#lesson' + nLesHide);
		var LesShow = $('#lesson' + nLesShow);

		LesHide.fadeOut(1500);
		LesShow.fadeIn(1500, function()
		{
			if(typeof(fu) === "function") fu();
		});
	},

	/* Hide current lesson and show lesson #id */
	showLesson: function(id, fu)
	{
		Course.videoPause();
		Course.setMenuIcons(id);
      //show progress
		topProgress.setLesson(id);

		var elLes = $('#lesson' + id);
		var lesPrev = $('section.holder .lesson:visible');

		//show curr-card-name
		/*
		var i, name="";
		for(i=0; i<lessonName.length; i++)
		{
			if(lessonName[i].les == id)
			{
				name = lessonName[i].name;
				break;
			}
		}

		if(name == "")
		{
			$('.course header .curr-card-name').hide();
		}
		else
		{
			$('.course header .curr-card-name span').html(name);
			$('.course header .curr-card-name').show();
		}
		*/
		//

		if(lesPrev.length < 1)
		{
			if(elLes.length < 1) return;
			if(elLes.is(':visible'))
			{
				Course.setLessonFragment(id,0);
				elLes.css({ 'opacity':'1', 'display':'block' });
				return;
			}

			elLes.fadeIn(1500, function()
			{
				Course.setLessonFragment(id,0);
				if(fu)
				{
					fu();
				}
			});
			Course.showCardPoints();
          topProgress.setPercent();
			return;
		}

		elLes.hide(function()
		{
			lesPrev.fadeOut(1500);
			elLes.fadeIn(1500, function()
			{
				Course.setLessonFragment(id,'0');
				if(typeof(fu) === "function")
				{
					fu();
				}
			});
		});
		
		Course.showCardPoints();
      topProgress.setPercent();
	},

	/* Do not hide current lesson and show lesson #id */
	showLessonOver: function(id, fu)
	{
		var elLes = $('#lesson' + id);
		var lesPrev = $('section.holder .lesson:visible');

		elLes.hide(function()
		{
			elLes.fadeIn(1500, function()
			{
				Course.setLessonFragment(id,'0');
				if(typeof(fu) === "function")
				{
					fu();
				}
			});
		});
		
		Course.showCardPoints();
	},

	//Show/hide bottom buttons of lesson
	showBotButtons: function(les, mode)
	{
		var butt = $('#lesson' + les + ' .bot-buttons button');

		if(mode === false)
		{
			butt.hide();
		}
		else
		{
			if($(butt[0]).is(':visible')) return;
			butt.fadeIn(500);
		}
	},

	showBotNextButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-next');
		if(mode === false)
		{
			but.hide();
		}
		else
		{
			if(but.is(':visible')) return;
			but.fadeIn(500);
		}
	},

	showBotPrevButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-prev');
		if(mode === false)
		{
			but.hide();
		}
		else
		{
			if(but.is(':visible')) return;
			but.fadeIn(500);
		}
	},

	showBotResultButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-show-res');
		if(mode === false)
		{
			but.hide();
		}
		else
		{
			if(but.is(':visible')) return;
			but.fadeIn(500);
		}
	},

	enaBotNextButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-next');
		if(mode === false)
		{
			but.prop('disabled',true);
		}
		else
		{
			but.prop('disabled',false);
		}
	},

	enaBotPrevButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-xx-prev');
		if(mode === false)
		{
			but.prop('disabled',true);
		}
		else
		{
			but.prop('disabled',false);
		}
	},

	enaBotResultButton: function(les, mode)
	{
		var but = $('#lesson' + les + ' .bot-buttons button.b-show-res');
		if(mode === false)
		{
			but.prop('disabled',true);
		}
		else
		{
			but.prop('disabled',false);
		}
	},

	enaBotButtons: function(les, mode)
	{
		var butt = $('#lesson' + les + ' .bot-buttons button');

		if(mode === false)
		{
			butt.prop('disabled',true);
		}
		else
		{
			butt.prop('disabled',false);
		}
	},
	enaBotButtons2: function(les)
	{
		$('#lesson' + les + ' .bot-buttons button').prop('disabled',false);
	},

	calcCardPoints: function()
	{
		var nCards = 0;
		var allPoints = 0.0;
		var i,n;

		if(Course.oState.card51 >= 100) { nCards++; }
		if(Course.oState.card52 >= 100) { nCards++; }
		if(Course.oState.card53 >= 100) { nCards++; }
		Course.oState.nCards = nCards;
/*
		allPoints = (parseFloat(Course.oState.card73) +
					 parseFloat(Course.oState.card101) +
					 parseFloat(Course.oState.card102) +
					 parseFloat(Course.oState.card124) +
					 parseFloat(Course.oState.card125) +
					 parseFloat(Course.oState.card145) +
					 parseFloat(Course.oState.card164) +
					 parseFloat(Course.oState.card244)) / 8;

		Course.oState.allPoints = allPoints;
*/

		allPoints = (parseFloat(Course.oState.card61) +
					 parseFloat(Course.oState.card62)) / 2;
		
		Course.oState.allPoints = allPoints;
		
		//for SCORM: set state
		saveState();
		Course.debugState();
		return allPoints;
	},
  
  	elFadeIn: function(el, t, fu)
	{
		el.css({ 'opacity': '0', 'display': 'block' });
		el.animate({
			'opacity': '1'
		}, t);
		if(fu) fu();
	},

	elFadeOut: function(el, t)
	{
		el.css({ 'opacity': '1', 'display': 'block' });
		el.animate({
			'opacity': '0'
		}, t, function()
		{
			el.css('display', 'none');
		});
	},

	debugState: function()
	{
		//debug
		var s = "";
		s += "les: " + Course.oState.currLesson + "<br>";
		s += "avatar: " + Course.oState.avatar + "<br>";
		s += "lang: " + Course.oState.lang + "<br>";
		$('div.debug-wnd div.state').html(s);
	},


	showCardPoints: function()
	{
		var allPoints = Course.calcCardPoints();

		$('.lesson .lesson-body .cards-points .c span').html(Course.oState.nCards);
		$('.lesson .lesson-body .cards-points .p span').html(parseInt(allPoints));
	},
	
	showProgress: function()
	{
		topProgress.setPercent();
	},

	greyPopup: function(les, n, mode)
	{
		if(mode == true)
		{
			Course.elFadeIn($('.wrap-course .grey-bg'));
			Course.elFadeIn($('#lesson' + les + ' .lesson-msg' + n).fadeIn(400));
		}
		else
		{
			Course.elFadeOut($('.wrap-course .grey-bg'));
			Course.elFadeOut($('#lesson' + les + ' .lesson-msg' + n).fadeOut(400));
		}
	},
};


var OCookies =
{
	nTimeCookie: 31536000, //1 year

	getCookieVal: function(offset)
	{
		var endstr = document.cookie.indexOf(";", offset);
		if(endstr == -1)
		{
			endstr = document.cookie.length;
		}
		return unescape(document.cookie.substring(offset, endstr));
	},

	getCookie: function(name)
	{
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while(i < clen)
		{
			var j = i + alen;
			if(document.cookie.substring(i, j) == arg)
			{
				return OCookies.getCookieVal(j);
			}
			i = document.cookie.indexOf(" ", i) + 1;
			if(i == 0)
			{
				break;
			}
		}
		return null;
	},

	getIntCookie: function(name)
	{
		var co;
		var cc;
		co = parseInt(OCookies.getCookie(name));
		if(co !== co) co = 0;
		return co;
	},

	//name - cookie name
	//value - cookie val (string)
	//options - obj with additional properties:
	//		expires - time of exp.
	//			number - seconds.
	//			Date obj - date.
	//		if expires in past - cookie will be deleted.
	//		if expires = 0 (or miss), cookie will be set as session.
	setCookie: function(name, value, options)
	{
		options = options || { expires: OCookies.nTimeCookie };
		var expires = options.expires;
		if(typeof expires == "number" && expires)
		{
			var d = new Date();
			d.setTime(d.getTime() + expires*1000);
			expires = options.expires = d;
		}

		if(expires && expires.toUTCString)
		{
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);
		var updatedCookie = name + "=" + value;

		for(var propName in options)
		{
			updatedCookie += "; " + propName;
			var propValue = options[propName];   
			if(propValue !== true)
			{
				updatedCookie += "=" + propValue;
			}
		}
		document.cookie = updatedCookie;
	},

	set: function(name, val)
	{
		if(fSCORM)
		{
			//if SCORM: save state oState
			saveState();
		}
		else
		{
			//save cookie
			if(val == undefined) val = "0";
			OCookies.setCookie(name, val);
		}
	},
	/*
	//attr: "passed", "time", ...etc
	setLessonAttr: function(nLesson, attr, val)
	{
		if(val == undefined) val = "0";
		OCookies.setCookie("lesson"+nLesson +"_"+attr, val);

		//if SCORM: save state
		ScormObj.saveState();
	},

	//remove cookie
	resLessonAttr: function(nLesson, attr)
	{
		OCookies.setCookie("lesson"+nLesson +"_"+attr, "0", -3600);
	}
	*/
};

var AudioPlayer = {
	init2: function(elm, src)
	{
		var vaudio = elm.find('audio');

		elm.append(
			'<div class="audiobar left">' +
				'<div class="progress"><span></span></div>' +
				'<div class="audiowrap">' + 
					'<audio>' + vaudio.html() + '</audio>' +
				'</div>' +
			'</div>');

		vaudio.remove();

		au = elm.find('audio');
		if(au.length > 0)
			au[0].addEventListener("timeupdate", function() {
				var a,b;
				var el;
				el = $(this);
				a = el[0].currentTime;
				b = el[0].duration;
				//console.log("play",$(this), $(this)[0].currentTime, $(this)[0].duration);

				var span;
				span = el.parent().parent().find('.progress span');
				//progress
				span.css('width', a/b*100+'%');
				if(a == b) span.css('width', '0');
		});
	},
/*
	init: function(id, fu)
	{
		var au;
		au = document.getElementById(id);
		au.addEventListener("timeupdate", function() {
			//console.log("play",au.currentTime,"/",au.duration);
			if(fu) fu(au.currentTime,au.duration);
		});
		return au;
	},
*/
	load: function(el)
	{
		var au = null;
		if(el.length > 0) au = el.find('audio');
		if(au.length > 0)
		{
			au[0].load();
			el.find('.progress span').css('width','0');
		}
	},

	play: function(el)
	{
		var au = null;
		if(el.length > 0) au = el.find('audio');
		if(au.length > 0) au[0].play();
	},

	pause: function(el)
	{
		var au = null;
		if(el.length > 0) au = el.find('audio');
		if(au.length > 0) au[0].pause();
	}
};
var topProgress = {
	//cxLine: [ 92.0, 176.0, 260.0, 344.0, 428.0, 512.0 ],
	cxLine: [ 330.0, 999.0, 999.0, 999.0, 999.0, 999.0 ],
	cxMax: 260.0,
	lesson: 0,
	elm: null,

	init: function(nItems)
	{
		var p = topProgress;
		switch(nItems)
		{
			case 1:
				$('div.top-progress > div').hide();
				$('div.top-progress .progress1').show();
				p.cxLine[0] = 330;
				p.cxMax = 330;
				break;
			//if you need 'progress2', 'progress3', etc, then you should change this function:
			//cxLine: [ correct segment lengths ]
		}
	},

	hide: function()
	{
		$('div.top-progress').hide();
	},

	show: function()
	{
		LProgress.elm.show();
	},

	setLesson: function(les)
	{
console.log("topProgress.setLesson",les);
		var p = topProgress;

		if($('div.top-progress').is(':hidden'))
			$('div.top-progress').show();

		p.lesson = les;
		p.elm = $('div.top-progress');
	},

	setPercent: function()
	{
		function fperc(arrles)
		{
			var i, pc=0.0;
			for(i=0; i<arrles.length; i++)
			{
				pc += parseInt(Course.oState["le_" + arrles[i]]);
			}

			return pc / arrles.length;
		}

console.log("topProgress.setPercent",topProgress.lesson);
		var p = topProgress;
		var i;
		var cx;
		var perc;

		p.elm.find('.pr-item .ball').css('opacity','0');
		p.elm.find('.pr-end .ball').css('opacity','0');
		p.elm.find('.item1 .ball').css('opacity','1');

		//           les1  les2 les3 les4 les5   les6
		var ales = [51,52,53,61,62];
		perc = fperc(ales);

		if(perc >= 99)
		{
			p.elm.find('.pr-end .ball').css('opacity','1');
		}

		p.elm.find('.txt span.overall-perc').html(parseInt(perc) + '%');
		cx = parseInt(perc * topProgress.cxMax / 100);

		for(i=0; i<p.cxLine.length; i++)
		{
			if(cx >= p.cxLine[i])
			{
				var iball = parseInt(i+2);
				var ball = p.elm.find('.item' + iball + ' .ball');
				p.elm.find('.item' + iball + ' .ball').css('opacity','1');
			}
		}
		p.elm.find('.item1 .line').css('width', cx + 'px');

		var les = 0;

		switch(p.lesson)
		{
			//lesson1
			
			case 51:

				les = 1;
				ales = [51];
				perc = fperc(ales);
				break;
			//lesson2
			
			case 52:
          case 521:

				les = 2;
				ales = [52];
				perc = fperc(ales);
				break;
			//lesson3
			
			case 53:

				les = 3;
				ales = [53];
				perc = fperc(ales);
				break;
		
			//lesson5
			case 164:
			case 165:
	

				les = 4;
				ales = [61];
				perc = fperc(ales);
				break;
			//lesson6
			
			case 62:
			case 621:

				les = 5;
				ales = [62];
				perc = fperc(ales);
				break;
			
		}

		var les_t = p.elm.find('.txt span.lesson-txt');
		var tst_t = p.elm.find('.txt span.test-txt');
		var les_p = p.elm.find('.txt span.lesson-perc');

		if(les > 0)
		{
			les_t.css('display', 'inline-block');
			les_p.css('display', 'inline-block');

			if(les == 4) //exam
			{
				$('.txt span.test-txt').html(" &nbsp;|&nbsp;"+"Exam");
				tst_t.css('display', 'inline-block');
				les_t.css('display', 'none');
				les_p.html(': ' + parseInt(perc) + '%');
			}
			else if(les == 5)
			{
				$('.txt span.test-txt').html("&nbsp;|&nbsp; "+"Game");
				tst_t.css('display', 'inline-block');
				les_t.css('display', 'none');
				les_p.html(': ' + parseInt(perc) + '%');
			}
			else
			{
				tst_t.css('display', 'none');
				les_t.css('display', 'inline-block');
				les_p.html(les + ': ' + parseInt(perc) + '%');
			}
		}
		else
		{
			tst_t.css('display', 'none');
			les_t.css('display', 'none');
			les_p.css('display', 'none');
		}
	}
};

;(function($){

    $.path = {};
  
    $.path.arc = function(params, rotate) {
      for ( var i in params ) {
        this[i] = params[i];
      }
  
      this.dir = this.dir || 1;
  
      while ( this.start > this.end && this.dir > 0 ) {
        this.start -= 360;
      }
  
      while ( this.start < this.end && this.dir < 0 ) {
        this.start += 360;
      }
  
      this.css = function(p) {
        var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
          css = {};
  
        if (rotate) {
          css.prevX = this.x;
          css.prevY = this.y;
        }
        css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
        css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
        css.left = css.x + "px";
        css.top = css.y + "px";
        return css;
      };
    };
  
    $.fx.step.path = function(fx) {
      var css = fx.end.css( 1 - fx.pos );
      if ( css.prevX != null ) {
        $.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
      }
      fx.elem.style.top = css.top;
      fx.elem.style.left = css.left;
    };
  })(jQuery);