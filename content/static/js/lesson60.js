/* 2 exams
	61 - exam
	62 - game
*/
var Lesson60 = {
  f_pre: false,

  pre: function () {
    Course.showBotButtons(60, false);
    $("#lesson60 .ava-name").hide();

    if (Course.oState.avatar == 0) {
      //0 - Sam
      $("#lesson60 .is_sam").show();
      $("#lesson60 .is_sue").hide();
    } else if (Course.oState.avatar == 1) {
      //1 - Sue
      $("#lesson60 .is_sam").hide();
      $("#lesson60 .is_sue").show();
    } else if (Course.oState.avatar == 2) {
      //2 - Arab Man
      $("#lesson60 .is_arM").show();
      $("#lesson60 .is_arW").hide();
    } else if (Course.oState.avatar == 3) {
      //3 - Arab Woman
      $("#lesson60 .is_arM").hide();
      $("#lesson60 .is_arW").show();
    } else if (Course.oState.avatar == 4) {
      //2 - Indian Man
      $("#lesson60 .is_inM").show();
      $("#lesson60 .is_inW").hide();
    } else if (Course.oState.avatar == 5) {
      //3 - Indian Woman
      $("#lesson60 .is_inM").hide();
      $("#lesson60 .is_inW").show();
    } else if (Course.oState.avatar == 6) {
      //2 - African Man
      $("#lesson60 .is_afM").show();
      $("#lesson60 .is_afW").hide();
    } else if (Course.oState.avatar == 7) {
      //3 - African Woman
      $("#lesson60 .is_afM").hide();
      $("#lesson60 .is_afW").show();
    } else if (Course.oState.avatar == 8) {
      //2 - Asian Man
      $("#lesson60 .is_asM").show();
      $("#lesson60 .is_asW").hide();
    } else if (Course.oState.avatar == 9) {
      //3 - Asian Woman
      $("#lesson60 .is_asM").hide();
      $("#lesson60 .is_asW").show();
    } //show avatar sue
    else {
      $("#lesson60 .is_sue").show();
    }

    $("#lesson60 div.card").hide();

    Lesson60.setCardIco();

    if (Course.oState.card60 < 1) {
      Course.oState.card60 = 1;
      OCookies.set("card60", Course.oState.card60);
    }

    if (!Lesson60.f_pre) {
      Lesson60.f_pre = true;

      $("#lesson60 div.card").click(function () {
        if ($(this).hasClass("card61")) Lesson164.next(0);
        if ($(this).hasClass("card62")) Lesson62.next(0);
      });
    }
  },

  setCardIco: function () {
    function setIco(el, ico_class) {
      if (ico_class == "a") el.addClass("active").removeClass("partial");
      else if (ico_class == "p") el.addClass("partial").removeClass("active");
      else el.removeClass("active partial");
    }

    if (Course.oState.card61 >= 100) setIco($("#lesson60 div.card61"), "a");
    else if (Course.oState.card61 >= 1) setIco($("#lesson60 div.card61"), "p");
    else setIco($("#lesson60 div.card61"), "");

    if (Course.oState.card62 >= 100) setIco($("#lesson60 div.card62"), "a");
    else if (Course.oState.card62 >= 1) setIco($("#lesson60 div.card62"), "p");
    else setIco($("#lesson60 div.card62"), "");
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson60.pre();
        Course.showLesson(60, function () {
          Course.showBotButtons(60, true);
        });
        break;
      case 1:
        Lesson280.next(0);
        break;
    }
  },

  back: function () {
    Lesson50.next(0);
  },
};

var Lesson62 = {
  f_pre: false,
  list_cx: 1758,
  list_item_cx: 0,
  list_cnt: 0,
  list_debug: false, //true - show card#
  nPoints62: 0,

  setCard: function (perc) {
    if (perc > 1) Course.oState.card62 = perc;
    else Course.oState.card62 = 1;
    OCookies.set("card62", Course.oState.card62);
  },

  pre: function () {
    Course.showBotButtons(62, false);
    Course.enaBotNextButton(62, false);

    var folders = $("#lesson62 .folders .fld");
    var list = $("#lesson62 .list .list-wrap");
    Lesson62.list_cx = 1758;
    list.css("width", "1758px");
    $("#lesson62 .list .list-wrap > div")
      .css({
        display: "inline-block",
        left: "auto",
        top: "auto",
      })
      .attr("data-ok", "0");

    if (!Lesson62.f_pre) {
      //init list-wrap
      var lw = $("#lesson62 .list .list-wrap");
      lw.html("");

      var i;
      for (i = 0; i < fin_exam062.length; i++) {
        lw.append(
          '<div class="ui-widget-content ans" data-ok="0">' +
            '<img src="' +
            pathStatic +
            '/lessons/0062-inote.png">' +
            '<div class="tit"></div>' +
            "</div>"
        );
      }
    }

    $("#lesson62 .list .list-wrap div.ui-widget-content img").css(
      "height",
      "145px"
    );
    $("#lesson62 .list .list-wrap div.ui-widget-content div.tit").show();

    Lesson62.nPoints62 = 0.0;
    Lesson62.list_cnt = 0;

    if (Course.oState.card62 < 1) {
      Lesson62.setCard(1);
    }

    //randomize
    var i;
    for (i = 0; i < fin_exam062.length; i++) {
      fin_exam062[i].usedQ = 0;
    }

    function randQ() {
      var i;
      for (i = 0; i < 10000; i++) {
        var n = Math.floor(Math.random() * fin_exam062.length);
        if (n >= fin_exam062.length) continue;

        if (fin_exam062[n].usedQ == 0) {
          fin_exam062[n].usedQ = 1;
          return n;
        }
      }
      return 0;
    }

    $("#lesson62 .list .list-wrap div.ui-widget-content").each(function (i) {
      var n = randQ();
      console.log("rand n", n);

      $(this).removeClass("item-c1 item-c2 item-c3 item-c4 item-c5");
      $(this).removeClass("ans1 ans2 ans3 ans4 ans5 ans6 ans7 ans8 ans9 ans10");

      var q = fin_exam062[n].q;
      q = q.replace("Projectdokumentation", "Project-<br>dokumentation");
      var f = fin_exam062[n].f;
      n++;

      if (Lesson62.list_debug)
        $(this)
          .find("div.tit")
          .html(q + " C" + f);
      else $(this).find("div.tit").html(q);

      $(this).addClass("item-c" + f);
      $(this).addClass("ans" + n);
    });

    if (!Lesson62.f_pre) {
      Lesson62.f_pre = true;

      Lesson62.list_item_cx = $(
        "#lesson62 .list .list-wrap > div:first"
      ).outerWidth(true);
      console.log("f_pre list_item_cx", Lesson62.list_item_cx);

      $("div.ui-widget-content", list).draggable({
        revert: "invalid", // when not dropped, the item will revert back to its initial position
        containment: "document",
        cursor: "move",
      });

      folders.droppable({
        drop: function (event, ui) {
          var nans = 0;
          var nitem = 0;
          var nfld = 0;

          if (ui.draggable.hasClass("item-c1")) nitem = 1;
          if (ui.draggable.hasClass("item-c2")) nitem = 2;
          if (ui.draggable.hasClass("item-c3")) nitem = 3;
          if (ui.draggable.hasClass("item-c4")) nitem = 4;

          if (ui.draggable.hasClass("ans1")) nans = 1;
          if (ui.draggable.hasClass("ans2")) nans = 2;
          if (ui.draggable.hasClass("ans3")) nans = 3;
          if (ui.draggable.hasClass("ans4")) nans = 4;
          if (ui.draggable.hasClass("ans5")) nans = 5;
          if (ui.draggable.hasClass("ans6")) nans = 6;
          if (ui.draggable.hasClass("ans7")) nans = 7;
          if (ui.draggable.hasClass("ans8")) nans = 8;
          if (ui.draggable.hasClass("ans9")) nans = 9;
          if (ui.draggable.hasClass("ans10")) nans = 10;
          if (ui.draggable.hasClass("ans11")) nans = 11;

          if ($(this).hasClass("fld-c1")) nfld = 1;
          if ($(this).hasClass("fld-c2")) nfld = 2;
          if ($(this).hasClass("fld-c3")) nfld = 3;
          if ($(this).hasClass("fld-c4")) nfld = 4;

          if (nfld == nitem) {
            Course.lucyAnswer(62, nans, true);
            console.log(62, nans, true);
            Lesson62.nPoints62++;
            ui.draggable.attr("data-ok", "1");
          } else {
            Course.lucyAnswer(62, nans, false);
          }

          Lesson62.setCard((Lesson62.nPoints62 / fin_exam062.length) * 100);
          Course.oState.le_62 = (Lesson62.nPoints62 / fin_exam062.length) * 100;
          OCookies.set("le62", Course.oState.le_62);

          ui.draggable.find("div.tit").fadeOut(200);
          ui.draggable.find("img").animate(
            {
              height: "30px",
            },
            500,
            function () {}
          );

          ui.draggable.fadeOut(600, function () {
            //Lesson62.list_cx -= Lesson62.list_item_cx;
            //list.css('width', Lesson62.list_cx);
          });

          Lesson62.list_cnt++;
          if (Lesson62.list_cnt == fin_exam062.length)
            Course.enaBotNextButton(62, true);
        },
      });
    }
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson62.pre();
        Course.showLesson(62, function () {
          Course.showBotButtons(62, true);
        });
        break;
      case 1:
        Lesson621.next(0);
        break;
    }
  },

  back: function () {
    Lesson60.next(0);
  },
};

var Lesson621 = {
  pre: function () {
    Course.showBotButtons(621, false);

    if (Lesson62.nPoints62 >= fin_exam062.length) {
      $("#lesson621 .result-msg-ok").show();
      $("#lesson621 .result-msg-bad").hide();
    } else {
      $("#lesson621 .result-msg-ok").hide();
      $("#lesson621 .result-msg-bad").show();
    }

    //C1...C5
    var i;
    var sC1 = "",
      sC2 = "",
      sC3 = "",
      sC4 = "";
    for (i = 0; i < fin_exam062.length; i++) {
      var sElm;
      var c, q;

      c = "C" + fin_exam062[i].f;

      q = fin_exam062[i].q;

      var ico;

      var n = i;
      n++;
      var ans = $("#lesson62 .list .list-wrap .ans" + n).attr("data-ok");
      if (parseInt(ans)) {
        ico =
          '<div class="ico-res ico-ok"><img src="' +
          pathStatic +
          '/lessons/card-check.png"></div>';
      } else {
        ico =
          '<div class="ico-res ico-bad"><img src="' +
          pathStatic +
          '/lessons/card-cross.png"></div>';
      }

      sElm =
        '<div class="doc-cx">' +
        '<div class="img"><img src="' +
        pathStatic +
        '/lessons/0062-doc.png"></div>' +
        '<span class="cx">' +
        c +
        "</span>" +
        '<div class="txt">' +
        q +
        "</div>" +
        ico +
        "</div>";

      if (fin_exam062[i].f == 1) sC1 += sElm;
      if (fin_exam062[i].f == 2) sC2 += sElm;
      if (fin_exam062[i].f == 3) sC3 += sElm;
      if (fin_exam062[i].f == 4) sC4 += sElm;
    }

    $("#lesson621 .row2 .col-md-12").html(sC1 + sC2 + sC3 + sC4);
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson621.pre();
        Course.showLesson(621, function () {
          Course.showBotButtons(621, true);
        });
        break;

      case 1:
        Lesson60.next(0);
        break;
    }
  },

  back: function () {
    Lesson60.next(0);
  },
};
