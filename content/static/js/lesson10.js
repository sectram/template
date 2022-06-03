var Lesson10 = {
  loadBg: function () {
    $("#lesson10 .bg").fadeIn(700);
  },

  next: function (n) {
    switch (n) {
      case 100: //first start - show bg
        $("#lesson10 .bg").fadeIn(700);
        break;
      case 101: //first start - bg already shown
        // enable menu
        if (Course.oState.fEnaLesson40) Course.enaLessonMenu(50, "nosave");
        if (Course.oState.fEnaLesson40) Course.enaLessonMenu(51, "nosave");
        if (Course.oState.fEnaLesson40) Course.enaLessonMenu(52, "nosave");
        if (Course.oState.fEnaLesson40) Course.enaLessonMenu(53, "nosave");
        if (Course.oState.fEnaLesson60) Course.enaLessonMenu(60, "nosave");
        if (Course.oState.fEnaLesson60) Course.enaLessonMenu(61, "nosave");
        if (Course.oState.fEnaLesson60) Course.enaLessonMenu(62, "nosave");

        Course.elFadeIn($("#lesson10 .pop-msg"), 1000, function () {
          var arc_params = {
            center: [0, 207],
            radius: 207,
            start: 180, //180 degrees = top
            end: 90,
            dir: -1,
          };

          $("#lesson10 .slide-object").fadeIn(1500, function () {
            $("#lesson10 .slide-object").css({
              width: "110px",
              height: "110px",
            });
            $("#lesson10 .slide-object").animate(
              {
                path: new $.path.arc(arc_params),
              },
              1000,
              function () {
                $("#lesson10 .pop-msg .welc-txt").fadeIn(800);
              }
            );
          });
          return false;
        });
        break;

      case 0: //next start (return from other lessons)
        $("#lesson10 .bg").show();
        $("#lesson10 .pop-msg").hide();
        $(".course header ul.nav li.li-hidestart").hide();

        Course.showLesson(10, function () {
          Course.selMenu("li-right-tri");
          $("#lesson10 .pop-msg").fadeIn(500);
        });
        break;
    }
  },

  lang: function (n) {
    $("#lesson10 button.i-play").prop("disabled", true);

    Course.oState.lang = parseInt(n);
    //0 - english
    //1 - german
    OCookies.set("lang", n);

    //load additional HTMLs
    var fnames_en = [
      "exam.html", //exams
      "0020.html",
      "0014.html", //glossary, links
      "0050.html", //3 cards: PROTECT DATA AND UNDERSTAND DATA CLASSIFICATION
      "0060.html", //challenges
      "0164.html", //exam
      "exam.html", //exam

      "0280.html", //end page
      "405.html", //certificate
    ];

    var fnames_de = [
      "de/exam.html", //exams
      "de/0020.html",
      "de/0014.html", //glossary, links
      "de/0050.html", //3 cards: PROTECT DATA AND UNDERSTAND DATA CLASSIFICATION
      "de/0060.html", //challenges
      "de/0164.html", //exam
      "de/exam.html", //exam

      "de/0280.html", //end page
      "de/405.html", //certificate
    ];

    var fnames;
    if (Course.oState.lang == 1) {
      fnames = fnames_de;
    } //German
    else {
      fnames = fnames_en;
    } //English

    loadFiles_obj.nAll = fnames.length;
    loadFiles_obj.progress_el = $("#lesson10 .progress");

    loadFiles_obj.loadFiles(fnames, function () {
      //all HTMLs loaded
      //...
      //console.log("all HTMLs loaded");
      setTimeout(function () {
        //console.log("Lesson20.next(0)");
        Lesson20.next(0);
        $("div.top-progress").hide();
      }, 100);
    });
  },
};

var Lesson20 = {
  pre: function () {
    Course.showBotButtons(20, false);
    $("nav.dws-menu ul.nav").hide();
  },

  next: function (n) {
    switch (n) {
      case 0:
        //show menu
        //$('.course header nav.dws-menu').show();
        if (Course.oState.lang == 1) {
          $(".course header nav.menu-de").show();
          $(".course header .close-but-de").show();
        } else {
          $(".course header nav.menu-en").show();
          $(".course header .close-but-en").show();
        }

        Lesson20.pre();
        Course.showLesson(20, function () {
          Course.showBotButtons(20, true);
        });
    }
  },
};

var Lesson30 = {
  f_pre: false,

  selAvatar: function (
    el_av //0 - Sam, 1 - Sue, 2 - Arab M, 3 - Arab F, 4 - Kumar, 5 - Divya, 6 - Darnell, 7 - Shanice
  ) {
    const aav = [
      "man-sam", //0 Sam
      "woman-sue", //1 Sue
      "man-ar", //2 Arab man
      "woman-ar", //3 Arab woman
      "man-in", //4 Kumar
      "woman-in", //5 Divya
      "man-af", //6 Darnell
      "woman-af", //7 Shanice
      "man-as", //8 Chen
      "woman-as", //9 Choi
    ];
    const ainfoav = [
      "info-man",
      "info-woman",
      "info-man-ar",
      "info-woman-ar",
      "info-man-in",
      "info-woman-in",
      "info-man-af",
      "info-woman-af",
      "info-man-as",
      "info-woman-as",
    ];
    var i;

    for (i = 0; i <= aav.length; i++) {
      $("#lesson30 ." + aav[i]).removeClass("unselected");

      if (el_av.hasClass(aav[i])) {
        $("#lesson30 ." + aav[i]).addClass("selected");
        $("#lesson30.lesson .lesson-body .infobox1 ." + ainfoav[i]).show();
        Course.oState.avatar = i;

        $("#lesson30 button.b-xx-next").prop("disabled", true);
      } else {
        $("#lesson30 ." + aav[i]).removeClass("selected");
        $("#lesson30.lesson .lesson-body .infobox1 ." + ainfoav[i]).hide();
        $("#lesson30 button.b-xx-next").prop("disabled", false);
      }
    }
    OCookies.set("avatar", Course.oState.avatar);
    console.log("avatar " + Course.oState.avatar);
  },

  pre: function () {
    Course.showBotButtons(30, true);
    $("#lesson30 .avatar").removeClass("selected unselected");

    $("#lesson30 .woman-sue, #lesson30 .man-sam, #lesson30 .infobox").hide();
    $("#lesson30.lesson .lesson-body .infobox1").css({
      top: "108px",
      left: "396px",
      width: "213px",
    });
    $("#lesson30.lesson .lesson-body .infobox1 .info1").show();
    $(
      "#lesson30.lesson .lesson-body .infobox1 .info2, #lesson30.lesson .lesson-body .infobox1 .info-man, #lesson30.lesson .lesson-body .infobox1 .info-woman"
    ).hide();
    $("#lesson30.lesson .lesson-body div.infobox .ava-name").hide();
    $("#lesson30 .slides").css("opacity", "0");

    if (!Lesson30.f_pre) {
      Lesson30.f_pre = true;

      $("#lesson30 .item-inner").on("click", ".avatar.ava", function () {
        Lesson30.selAvatar($(this));

        var infox,
          infoy = "90px",
          infocx = "498px";

        if (parseInt(Course.oState.avatar) & 1)
          //woman
          infox = "463px";
        //man
        else infox = "55px";

        $("#lesson30.lesson .lesson-body .infobox1 .info1").hide();

        $("#lesson30.lesson .lesson-body .infobox1").animate(
          {
            top: infoy,
            left: infox,
            width: infocx,
          },
          500,
          function () {
            $("#lesson30.lesson .lesson-body .infobox1 .info2").show(500);
          }
        );
      });

      $("#lesson30 .slides")
        .slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: true,
          arrows: true,
          cssEase: "ease",
          asNavFor: ".slider-nav",
        })
        .on("afterChange", function (event, slick, currentSlide) {
          $("#lesson30 .slides .slick-slide .item-inner .avatar").removeClass(
            "ava"
          );
          $("#lesson30 .slides .slick-current .item-inner .avatar").addClass(
            "ava"
          );
        });

      $("#lesson30 button.slick-prev, #lesson30 button.slick-next").click(
        function () {
          $("#lesson30 .avatar").removeClass("selected unselected");
          $("#lesson30.lesson .lesson-body .infobox1 .info2").hide();
          $("#lesson30.lesson .lesson-body .infobox1 .info1").fadeIn(1000);
          $("#lesson30.lesson .lesson-body .infobox1").css({
            top: "108px",
            left: "396px",
            width: "213px",
          });
          $("#lesson30.lesson .lesson-body div.infobox .ava-name").hide();
        }
      );
    }
    // show menu
    $("nav.dws-menu ul.nav").show();
    $("div.top-progress").show();
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson30.pre();
        Course.showLesson(30, function () {
          Course.showBotButtons(30, true);
        });
        break;
      case 1:
        Lesson40.next(0);
        break;
    }
  },

  back: function () {
    Lesson20.next(0);
  },
};

var Lesson40 = {
  pre: function () {
    $("#lesson40 .ava-name").hide();
    Course.showBotButtons(40, false);
    if (Course.oState.avatar == 0) {
      //sam
      $("#lesson40 .woman-sue").hide();
      $("#lesson40 .man-sam").show();
    } else if (Course.oState.avatar == 1) {
      //sue
      $("#lesson40 .woman-sue").show();
      $("#lesson40 .man-sam").hide();
    } else if (Course.oState.avatar == 2) {
      //man
      $("#lesson40 .woman-ar").hide();
      $("#lesson40 .man-ar").show();
    } else if (Course.oState.avatar == 3) {
      //woman
      $("#lesson40 .woman-ar").show();
      $("#lesson40 .man-ar").hide();
    } else if (Course.oState.avatar == 4) {
      //man
      $("#lesson40 .woman-in").hide();
      $("#lesson40 .man-in").show();
    } else if (Course.oState.avatar == 5) {
      //woman
      $("#lesson40 .woman-in").show();
      $("#lesson40 .man-in").hide();
    } else if (Course.oState.avatar == 6) {
      //man
      $("#lesson40 .woman-af").hide();
      $("#lesson40 .man-af").show();
    } else if (Course.oState.avatar == 7) {
      //woman
      $("#lesson40 .woman-af").show();
      $("#lesson40 .man-af").hide();
    } else if (Course.oState.avatar == 8) {
      //man
      $("#lesson40 .woman-as").hide();
      $("#lesson40 .man-as").show();
    } else if (Course.oState.avatar == 9) {
      //woman
      $("#lesson40 .woman-as").show();
      $("#lesson40 .man-as").hide();
    }
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson40.pre();
        Course.showLesson(40, function () {
          Course.showBotButtons(40, true);
        });
        break;
      case 1:
        Lesson50.next(0);
        break;
    }
  },

  back: function () {
    Lesson30.next(0);
  },
};
