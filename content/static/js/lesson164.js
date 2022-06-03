//EXAM
var Lesson164 = {
	f_pre: false,
	nCorrAnsw: 0, //count of correct answers
	exam_copy: null, //Lesson164.exam_copy.length - count of questions
	f_showresults: 1, //1 - enable 'Show Results' (see fin_exam164[])
	threshold: 80, //must be >=80% correct answers

	nCurrQuestion: 0, //# of curr question
	countAnsw: 0, //count of answers (1...5) for the curr question
	currAnsw: 0, //right answer (bits)
	currType: 0, //type of the curr question

	setCard: function(perc)
	{
		if(perc > 1) Course.oState.card61 = perc;
		else Course.oState.card61 = 1;
		OCookies.set("card61", Course.oState.card61);
	},

	initQ: function()
	{
		Lesson164.nCurrQuestion = 0;

		if(Lesson164.exam_copy[0].randQ)
		{
			var i,n;
			for(i=0; i<Lesson164.exam_copy.length; i++)
			{
				Lesson164.exam_copy[i].usedQ = 0;
				Lesson164.exam_copy[i].nQ = i;
			}

			fin_exam164 = [];
			for(i=0; i<Lesson164.exam_copy[0].countQ; i++)
			{
				n = Lesson164.randQ();
				fin_exam164.push(Lesson164.exam_copy[n]);
			}
			fin_exam164[0].showResults = Lesson164.exam_copy[0].showResults;
			Lesson164.f_showresults = fin_exam164[0].showResults;
			fin_exam164[0].skipExam = Lesson164.exam_copy[0].skipExam;
			fin_exam164[0].randQ = Lesson164.exam_copy[0].randQ;
			fin_exam164[0].countQ = Lesson164.exam_copy[0].countQ;
		}
		else //all questions
		{
			var i,n;
			for(i=0; i<Lesson164.exam_copy.length; i++)
			{
				Lesson164.exam_copy[i].usedQ = 0;
				Lesson164.exam_copy[i].nQ = i;
			}

			fin_exam164 = Lesson164.exam_copy;
		}

		for(i=0; i<fin_exam164.length; i++)
		{
			fin_exam164[i].user_result = undefined;
		}
	},

	randQ: function()
	{
		var i;
		for(i=0; i<1000; i++)
		{
			var n = Math.floor(Math.random() * Lesson164.exam_copy.length);
			if(n >= Lesson164.exam_copy.length) continue;

			if(Lesson164.exam_copy[n].usedQ == 0)
			{
				Lesson164.exam_copy[n].usedQ = 1;
				return n;
			}
		}

		return 0;
	},

	//Load questions. n = 0..9
	loadQuestion: function(n)
	{
		/*
		question: "1 Phishing: What is phishing?",
		answer: 1, //1-first, 2-second, 4-third, 8-fourth, 5-first and third...
		answers:
		[
			"...answer1...",
			"...answer2...",
			"...answer3...",
			"...answer4..."
		]
		*/
		if(fin_exam164.length <= n) return false;

		var q = fin_exam164[n];

		Course.enaBotNextButton(164,false);
		Course.enaBotResultButton(164,false);

		Lesson164.nCurrQuestion = n; //# of question
		Lesson164.countAnsw = q.answers.length; //count of answers (1..5)
		Lesson164.currAnsw = q.answer;
		Lesson164.currType = q.type;

		if(q.question == "") $('#lesson164 .title2 h1').hide();
		else $('#lesson164 .title2 h1').html(q.question);

		$('#lesson164 .title2 h2').html(q.question2);

		var ians;
		for(ians=0; ians<5; ians++) //5 answers max
		{
			if(q.answers.length > ians)
			{
				$('#lesson164 .d-exam .fin-exam-a' + ians).show();
				$('#lesson164 .d-exam .fin-exam-a' + ians + ' td.text').html(q.answers[ians]);

				if(q.answers.length > (ians+1))
				{
					$('#lesson164 .d-exam .fin-exam-a' + ians).addClass('dotted');
				}
				else
				{
					$('#lesson164 .d-exam .fin-exam-a' + ians).removeClass('dotted');
				}
			}
			else
			{
				$('#lesson164 .d-exam .fin-exam-a' + ians).hide();
			}
		}

		//uncheck all
		$('#lesson164 .d-exam input[type=checkbox]').prop("checked",false);
		$('#lesson164 .d-exam input[type=checkbox] + label').removeClass("ch-label-green ch-label-red");

		return true;
	},

	chboxChange: function(el)
	{
		el = $(el);

		//only one answer is possible (no multicheck)
		//uncheck all except el
		if(Lesson164.currType == 'radio')
		{
			var el_id = el.attr('id');
			$('#lesson164 .tbl-check input:checked').each(function()
			{
				if($(this).attr('id') != el_id)
					$(this).prop('checked',false);
			});
		}
		//else assume currType = 'check'

		var id = el.attr('id');
		//id = "ch-exam164-1a"..."ch-exam164-5a"
		var nch = parseInt(id.substr(9,1)); //number of checkbox: 1..5

		//is answered?
		for(i=0; i<=5; i++)
		{
			if($('#ch-exam164-'+i+'a').is(':checked'))
			{
				//answered
				Course.enaBotNextButton(164,true);
				if(Lesson164.f_showresults == 1) Course.enaBotResultButton(164,true);
				break;
			}
		}
	},

	//show results
	showResults: function()
	{
		Lesson164.chBg();
		return false;
	},

	//next
	nextQuestion: function()
	{
		var nquest = Lesson164.nCurrQuestion; //# of question
		nquest++;

		Lesson164.chBg();
		Lesson164.next(nquest);
	},

	getCheckedCode: function()
	{
		var code = 0;
		if($('#ch-exam164-1a').is(':checked')) code += 1;
		if($('#ch-exam164-2a').is(':checked')) code += 2;
		if($('#ch-exam164-3a').is(':checked')) code += 4;
		if($('#ch-exam164-4a').is(':checked')) code += 8;
		if($('#ch-exam164-5a').is(':checked')) code += 16;
		return code;
	},

	chBg: function()
	{
		var correct_answer; //1 or 2 or 4 or 8 or 16 or '1,2,3,4,5'
		var nquest = Lesson164.nCurrQuestion; //# of question
		var nq = nquest;

		correct_answer = Lesson164.currAnsw; //1 or 2 or 4 or 8 or 16

		$('#lesson164 .d-exam input[type=checkbox]').removeClass('ch-label-green ch-label-red');

		if(correct_answer & 1)
			$('#ch-exam164-1a + label').addClass('ch-label-green');

		if(correct_answer & 2)
			$('#ch-exam164-2a + label').addClass('ch-label-green');

		if(correct_answer & 4)
			$('#ch-exam164-3a + label').addClass('ch-label-green');

		if(correct_answer & 8)
			$('#ch-exam164-4a + label').addClass('ch-label-green');

		if(correct_answer & 16)
			$('#ch-exam164-5a + label').addClass('ch-label-green');

		var userAnswer = Lesson164.getCheckedCode();
		var userAnswerN = fin_exam164[nq].nQ;

		if(fin_exam164[nq].user_result == undefined)
		{
			if(userAnswer == correct_answer)
			{
				Course.lucyAnswer(164, userAnswerN,true);
				fin_exam164[nq].user_result = 1;
				Lesson164.nCorrAnsw++;
			}
			else
			{
				Course.lucyAnswer(164, userAnswerN,false);
				fin_exam164[nq].user_result = 0;
			}

			Lesson164.setCard(Lesson164.nCorrAnsw / fin_exam164.length * 100);
			Course.oState.le_61=Lesson164.nCorrAnsw / fin_exam164.length * 100;
				OCookies.set("le61", Course.oState.le_61);
			//Course.oState.card61 = Lesson164.nCorrAnsw / fin_exam164.length * 100;
			console.log("%%:",Course.oState.card61, Lesson164.nCorrAnsw, fin_exam164.length);
          	//OCookies.set("card61", Course.oState.card164);
		}
	},

	pre: function()
	{
		$('#lesson164 .lesson-msg').hide(); 

		Course.showBotButtons(164,false);
		Course.enaBotNextButton(164,false);
		Course.enaBotResultButton(164,false);

		if(Course.oState.card61 < 1)
		{
			Lesson164.setCard(1);
			//Course.oState.card61 = 1;
          	//OCookies.set("card61", Course.oState.card164);
		}

		//only once
		if(!Lesson164.f_pre)
		{
			Lesson164.f_pre = true;

			Lesson164.exam_copy = fin_exam164;

			$('#lesson164 input[type=checkbox]').change(function()
			{
				Lesson164.chboxChange(this);
			});

			//show results
			$('#lesson164 .b-show-res').click(function()
			{
				Lesson164.showResults();
			});

			//next
			$('#lesson164 .b-164-next').click(function()
			{
				Lesson164.nextQuestion();
			});
		}
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson164.pre();

				$('#lesson164 .title2, #lesson164 .d-exam').show();
				Lesson164.initQ();
				Lesson164.nCorrAnsw = 0;
				Lesson164.loadQuestion(0);
				$('#lesson164 .title span.q').html(1);
				$('#lesson164 .title span.n').html(fin_exam164.length);

				Course.showLesson(164, function()
				{
					Course.showBotButtons(164,true);
				});
				break;

			default: //1..9 - go to the next question
				Lesson164.pre();
				$('#lesson164 .title2').fadeOut(500);
				$('#lesson164 .d-exam').fadeOut(500, function()
				{
					if(!Lesson164.loadQuestion(n))
					{
						//end of exam
						Lesson165.next(0);
						return;
					}

					$('#lesson164 .title span.q').html(n+1);

					$('#lesson164 .title2, #lesson164 .d-exam').fadeIn(500, function()
					{
						Course.showBotButtons(164,true);
					});
				});
				break;
/*
			case 100:
				//hide message
				Course.greyPopup(164, 1, false);
				break;
*/
		}
	},

	back: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson60.next(0);
				break;
		}
	}
};

var Lesson165 = {
	pre: function()
	{
		Course.showBotButtons(165,false);
	},

	next: function(n)
	{
		switch(n)
		{
			case 0:
				Lesson165.pre();
				Lesson165.loadAnswers();

				//100 points = all correct answers
				Lesson164.setCard(Lesson164.nCorrAnsw / fin_exam164.length * 100);
				//Course.oState.card61 = Lesson164.nCorrAnsw / fin_exam164.length * 100;
				console.log("end %%:",Course.oState.card61, Lesson164.nCorrAnsw, fin_exam164.length);
				
				//OCookies.set("card61", Course.oState.card164);

				Course.showLesson(165, function()
				{
					Course.showBotButtons(165,true);
				});
				break;
			case 1:
				Lesson60.next(0);
				break;
		}
	},

	back: function(n)
	{
		Lesson60.next(0);
	},

	loadAnswers: function()
	{
		if(fin_exam164.length < 1) return false;

		var n;
		var tbl = $('#lesson165 .d-exam table tbody');
		tbl.html("");
		var nresults = 0;

		for(n=0; n<fin_exam164.length; n++)
		{
			var q = fin_exam164[n];
			var tr;
			var nq = parseInt(n)+1;
			var q_class = "q bad";
			if(q.user_result > 0) { q_class = "q good"; nresults++; }

			//question
			if(q.question == "")
			{
				tr = '<tr><td class="' + q_class +
						'">Q:&nbsp;</td><td class="question"><strong>' + nq + '</strong> ' +
						q.question2 + '</td></tr>';
			}
			else
			{
				tr = '<tr><td class="' + q_class +
						'">Q:&nbsp;</td><td class="question"><strong>' + nq +
						' '+ q.question + '</strong> ' + q.question2 + '</td></tr>';
			}
			tbl.append(tr);

			//answers
			if(q.answer & 1)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[0] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 2)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[1] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 4)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[2] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 8)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[3] + '</td></tr>';
				tbl.append(tr);
			}
			if(q.answer & 16)
			{
				tr = '<tr><td class="a">A:&nbsp;</td><td class="answer">' + q.answers[4] + '</td></tr>';
				tbl.append(tr);
			}

			//comments
			tr = '<tr class="rem"><td></td><td class="rem">' + q.remark + '</td></tr>';
			tbl.append(tr);
		}
		
		console.log("results", nresults, fin_exam164.length, nresults / fin_exam164.length);
		lucyDispatchEvent('"EXAM: E-Mail" results: ' + nresults + ' out of ' + fin_exam164.length);

		$('#lesson165 .d-exam h3 span.l').html(nresults);

		$('#lesson165 .d-exam h3 span.r').html(fin_exam164.length);
	}
};
