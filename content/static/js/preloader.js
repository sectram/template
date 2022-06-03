//preloader
loadFiles_obj = {
	scontent: ".wrap-course section.holder",
	curr_fname: 0, //number of current file name
	fnames: [],
	end_fu: null,
	nimg: 0, //# images: preload_objects() ... objs
	nAll: 0, //number of preloaded files (htmls+imgs)
	progress_el: null,

	loadFiles: function(fnames, fu)
	{
		loadFiles_obj.end_fu = fu;
		loadFiles_obj.fnames = fnames;
		loadFiles_obj.curr_fname = 0;

		loadFiles_obj.mergeFile();
	},

	mergeFile: function()
	{
		if(loadFiles_obj.curr_fname >= loadFiles_obj.fnames.length)
		{
			//all lessons are downloaded
			//$('div.contentwrap div.progress').css('display', 'none');

			//init fragments
			loadFiles_obj.end_fu();
			return;
		}

		fname = pathStatic + '/htm/' + loadFiles_obj.fnames[loadFiles_obj.curr_fname];
		console.log("mergeFile",fname);

		$.ajax(
		{
			type: 'GET',
			cache: false,
			dataType: 'html',
			success: function(res)
			{
				$(loadFiles_obj.scontent).append(res.replace(/static/g, pathStatic));
				loadFiles_obj.curr_fname++;
				loadFiles_obj.progress();
				loadFiles_obj.mergeFile();
			}, 
			url: fname
		});
	},

	progress: function()
	{
		var cxmax = loadFiles_obj.progress_el.width();
		var cx = loadFiles_obj.curr_fname * cxmax / loadFiles_obj.nAll;
		cx = cx.toFixed(1);
		loadFiles_obj.progress_el.find('.line').css('width', cx+'px');
	}
};
