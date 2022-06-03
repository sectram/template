var SCORMDriver = window.parent;
var fSCORM = false;

$(function()
{
	loadState();
});

//load state
function loadState()
{
	var sChunk = "";

	if(typeof SCORMDriver.SetScore === 'undefined')
	{
		console.log("no SCORM", SCORMDriver);

		//read state from cookies
		Course.oState.lang = OCookies.getIntCookie("lang");
		Course.oState.avatar = OCookies.getIntCookie("avatar");

		Course.oState.card51 = OCookies.getIntCookie("card51");
		Course.oState.card52 = OCookies.getIntCookie("card52");
		Course.oState.card53 = OCookies.getIntCookie("card53");

		Course.oState.card60 = OCookies.getIntCookie("card60");
		Course.oState.card61 = OCookies.getIntCookie("card61");
		Course.oState.card62 = OCookies.getIntCookie("card62");
		Course.oState.le_51 = OCookies.getIntCookie("le51");
		Course.oState.le_52 = OCookies.getIntCookie("le52");
		Course.oState.le_53 = OCookies.getIntCookie("le53");
		Course.oState.le_61 = OCookies.getIntCookie("le61");
		Course.oState.le_62 = OCookies.getIntCookie("le62");
	}
	else
	{
		console.log("SCORM");
		fSCORM = true;

		sChunk = SCORMDriver.GetDataChunk();
		console.log("chunk:",sChunk);
	}

	if(sChunk)
		Course.oState = JSON.parse(sChunk);
	else
		sChunk = "empty";
	console.log("loadState",Course.oState);

	Course.oState.autoaudio = 0; //disable auto play

	//sChunk = sChunk.replace(/,/g,",<br>");
	//$('div.debug-scorm').html(sChunk);
}

//save state
function saveState()
{
	var s = JSON.stringify(Course.oState);
	var score = Course.oState.allPoints; //100 points max

	if(fSCORM)
	{
		SCORMDriver.SetDataChunk(s);

		SCORMDriver.SetScore(score, 100, 0);

		SCORMDriver.CommitData();
	}
	//console.log("saveState", s, score);
}

function endCourse()
{
	console.log("End of Course");
	lucyQuizEnd();

	if(fSCORM)
	{
		if(Course.oState.allPoints >= 60)
			SCORMDriver.SetPassed();
		else
			SCORMDriver.SetFailed();

		SCORMDriver.SetReachedEnd();
		SCORMDriver.SetCompleted();
		SCORMDriver.CommitData();
	}
}

function closeCourse()
{
	if(fSCORM)
	{
		var answer = confirm("Are You Sure You Wish To Exit This Course?");
		
		if(answer)
		{
			SCORMDriver.ConcedeControl();
		}
	}
	else
		Lesson10.next(0);
}
