/* 3 cards
	51 - Accessing and processing data
	52 - Data classification
	53 - Protect Data
*/
var Lesson50 = {
  f_pre: false,

  pre: function () {
    $("#lesson50 .ava-name").hide();

    if (Course.oState.avatar == 0) {
      //0 - Sam
      $("#lesson50 .is_sam").show();
      $("#lesson50 .is_sue").hide();
    } else if (Course.oState.avatar == 1) {
      //1 - Sue
      $("#lesson50 .is_sam").hide();
      $("#lesson50 .is_sue").show();
    } else if (Course.oState.avatar == 2) {
      //2 - Arab Man
      $("#lesson50 .is_arM").show();
      $("#lesson50 .is_arW").hide();
    } else if (Course.oState.avatar == 3) {
      //3 - Arab Woman
      $("#lesson50 .is_arM").hide();
      $("#lesson50 .is_arW").show();
    } else if (Course.oState.avatar == 4) {
      //2 - Indian Man
      $("#lesson50 .is_inM").show();
      $("#lesson50 .is_inW").hide();
    } else if (Course.oState.avatar == 5) {
      //3 - Indian Woman
      $("#lesson50 .is_inM").hide();
      $("#lesson50 .is_inW").show();
    } else if (Course.oState.avatar == 6) {
      //2 - African Man
      $("#lesson50 .is_afM").show();
      $("#lesson50 .is_afW").hide();
    } else if (Course.oState.avatar == 7) {
      //3 - African Woman
      $("#lesson50 .is_afM").hide();
      $("#lesson50 .is_afW").show();
    } else if (Course.oState.avatar == 8) {
      //2 - Asian Man
      $("#lesson50 .is_asM").show();
      $("#lesson50 .is_asW").hide();
    } else if (Course.oState.avatar == 9) {
      //3 - Asian Woman
      $("#lesson50 .is_asM").hide();
      $("#lesson50 .is_asW").show();
    } //show avatar sue
    else {
      $("#lesson50 .is_sue").show();
    }

    $("#lesson50 div.card").hide();

    Lesson50.setCardIco();

    if (!Lesson50.f_pre) {
      Lesson50.f_pre = true;

      $("#lesson50 div.card").click(function () {
        if ($(this).hasClass("card51")) Lesson51.next(0);
        if ($(this).hasClass("card52")) Lesson52.next(0);
        if ($(this).hasClass("card53")) Lesson53.next(0);
      });
    }
  },

  setCardIco: function () {
    function setIco(el, ico_class) {
      if (ico_class == "a") el.addClass("active").removeClass("partial");
      else if (ico_class == "p") el.addClass("partial").removeClass("active");
      else el.removeClass("active partial");
    }

    if (Course.oState.card51 >= 100) setIco($("#lesson50 div.card51"), "a");
    else if (Course.oState.card51 >= 1) setIco($("#lesson50 div.card51"), "p");
    else setIco($("#lesson50 div.card51"), "");

    if (Course.oState.card52 >= 100) setIco($("#lesson50 div.card52"), "a");
    else if (Course.oState.card52 >= 1) setIco($("#lesson50 div.card52"), "p");
    else setIco($("#lesson50 div.card52"), "");

    if (Course.oState.card53 >= 100) setIco($("#lesson50 div.card53"), "a");
    else if (Course.oState.card53 >= 1) setIco($("#lesson50 div.card53"), "p");
    else setIco($("#lesson50 div.card53"), "");
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson50.pre();
        Course.showLesson(50, function () {
          $("#lesson50 div.card51").fadeIn(400, function () {
            $("#lesson50 div.card52").fadeIn(400, function () {
              $("#lesson50 div.card53").fadeIn(400, function () {
                Course.showBotButtons(50, true);
              });
            });
          });
        });
        break;
      case 1:
        Lesson60.next(0);
        break;
    }
  },

  back: function () {
    Lesson40.next(0);
  },
};

var Lesson51 = {
  f_pre: false,
  f_info: 0,
  percent: 0,

  pre: function () {
    Course.showBotButtons(51, false);

    $("#lesson51 .infobox").hide();
    $("#lesson51 .infoico").hide();

    if (!Lesson51.f_pre) {
      Lesson51.f_pre = true;

      $("#lesson51 .infoico").click(function () {
        $("#lesson51 .infobox_xx .info_xx").hide();
        $("#lesson51 .infobox_xx").show();

        if ($(this).hasClass("infoico_1")) {
          $("#lesson51 .infobox_xx .info_1").show();
          $("#lesson51 .infoico_1 .d-img .blink").css("animation", "none");
          Lesson51.f_info |= 1;
          Lesson51.percent = (1 / 3) * 100;
        }
        if ($(this).hasClass("infoico_2")) {
          $("#lesson51 .infobox_xx .info_2").show();
          $("#lesson51 .infoico_2 .d-img .blink").css("animation", "none");
          Lesson51.f_info |= 2;
          Lesson51.percent = (3 / 3) * 100;
        }

        if (Lesson51.f_info == 3) {
          Lesson51.percent = (3 / 3) * 100;
          Course.oState.le_51 = Lesson51.percent;
          OCookies.set("le51", Course.oState.le_51);
          //$('.txt span.lesson-perc').html(Course.oState.le_51+'%');
          Course.oState.card51 = 100;
          OCookies.set("card51", Course.oState.card51);
        }

        Course.showCardPoints();
        Course.showProgress();
      });
    }
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson51.pre();
        Course.showLesson(51, function () {
          setTimeout(function () {
            $("#lesson51 .infoico_1").fadeIn(300, function () {
              setTimeout(function () {
                $("#lesson51 .infoico_2").fadeIn(300);
              }, 300);
            });
          }, 300);
          Course.showBotButtons(51, true);
        });
        break;
      case 1:
        Lesson50.next(0);
        break;
    }
  },

  back: function () {
    Lesson50.next(0);
  },
};

var Lesson52 = {
  pre: function () {
    Course.showBotButtons(52, false);

    $("#lesson52 .ava-name").hide();

    var avatar = Course.oState.avatar;

    if (
      avatar == 1 ||
      avatar == 3 ||
      avatar == 5 ||
      avatar == 7 ||
      avatar == 9
    ) {
      //show woman avatar
      $("#lesson52 .bg img.is_sam").hide();
      $("#lesson52 .bg img.is_sue").show();
      console.log(Course.oState.avatar);
    } else {
      $("#lesson52 .bg img.is_sam").show();
      $("#lesson52 .bg img.is_sue").hide();
    }

    if (Course.oState.avatar == 0) {
      //0 - Sam
      $("#lesson52 .is_sam").show();
      $("#lesson52 .is_sue").hide();
    } else if (Course.oState.avatar == 1) {
      //1 - Sue
      $("#lesson52 .is_sam").hide();
      $("#lesson52 .is_sue").show();
    } else if (Course.oState.avatar == 2) {
      //2 - Arab Man
      $("#lesson52 .is_arM").show();
      $("#lesson52 .is_arW").hide();
    } else if (Course.oState.avatar == 3) {
      //3 - Arab Woman
      $("#lesson52 .is_arM").hide();
      $("#lesson52 .is_arW").show();
    } else if (Course.oState.avatar == 4) {
      //2 - Indian Man
      $("#lesson52 .is_inM").show();
      $("#lesson52 .is_inW").hide();
    } else if (Course.oState.avatar == 5) {
      //3 - Indian Woman
      $("#lesson52 .is_inM").hide();
      $("#lesson52 .is_inW").show();
    } else if (Course.oState.avatar == 6) {
      //2 - African Man
      $("#lesson52 .is_afM").show();
      $("#lesson52 .is_afW").hide();
    } else if (Course.oState.avatar == 7) {
      //3 - African Woman
      $("#lesson52 .is_afM").hide();
      $("#lesson52 .is_afW").show();
    } else if (Course.oState.avatar == 8) {
      //2 - Asian Man
      $("#lesson52 .is_asM").show();
      $("#lesson52 .is_asW").hide();
    } else if (Course.oState.avatar == 9) {
      //3 - Asian Woman
      $("#lesson52 .is_asM").hide();
      $("#lesson52 .is_asW").show();
    } //show avatar sue
    else {
      $("#lesson52 .is_sue").show();
    }

    $("#lesson52 .bub4folders").hide();
    //Lesson521.clickDataClassiffication();
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson52.pre();
        //Lesson521.clickDataClassiffication();
        Course.showLesson(52, function () {
          $("#lesson52 .bub4folders").fadeIn(500, function () {
            if (Course.oState.card52 < 1) {
              Course.oState.card52 = 1;
              OCookies.set("card52", Course.oState.card52);
            }
            Course.showBotButtons(52, true);
          });
        });
        break;
      case 1:
        Lesson521.next(0);
        break;
    }
  },

  back: function () {
    Lesson50.next(0);
  },
};

var Lesson521 = {
  f_pre: false,
  f_info: 0,
  percent: 0,

  pre: function () {
    Course.showBotButtons(521, false);

    $("#lesson521 .ava-name").hide();

    if (Course.oState.avatar == 0) {
      //0 - Sam
      $("#lesson521 .is_sam").show();
      $("#lesson521 .is_sue").hide();
    } else if (Course.oState.avatar == 1) {
      //1 - Sue
      $("#lesson521 .is_sam").hide();
      $("#lesson521 .is_sue").show();
    } else if (Course.oState.avatar == 2) {
      //2 - Arab Man
      $("#lesson521 .is_arM").show();
      $("#lesson521 .is_arW").hide();
    } else if (Course.oState.avatar == 3) {
      //3 - Arab Woman
      $("#lesson521 .is_arM").hide();
      $("#lesson521 .is_arW").show();
    } else if (Course.oState.avatar == 4) {
      //2 - Indian Man
      $("#lesson521 .is_inM").show();
      $("#lesson521 .is_inW").hide();
    } else if (Course.oState.avatar == 5) {
      //3 - Indian Woman
      $("#lesson521 .is_inM").hide();
      $("#lesson521 .is_inW").show();
    } else if (Course.oState.avatar == 6) {
      //2 - African Man
      $("#lesson521 .is_afM").show();
      $("#lesson521 .is_afW").hide();
    } else if (Course.oState.avatar == 7) {
      //3 - African Woman
      $("#lesson521 .is_afM").hide();
      $("#lesson521 .is_afW").show();
    } else if (Course.oState.avatar == 8) {
      //2 - Asian Man
      $("#lesson521 .is_asM").show();
      $("#lesson521 .is_asW").hide();
    } else if (Course.oState.avatar == 9) {
      //3 - Asian Woman
      $("#lesson521 .is_asM").hide();
      $("#lesson521 .is_asW").show();
    } //show avatar sue
    else {
      $("#lesson521 .is_sue").show();
    }

    $("#lesson521 .infobox").hide();

    if (!Lesson521.f_pre) {
      Lesson521.f_pre = true;

      $("#lesson521 .folders .fld").click(function () {
        $("#lesson521 .infobox_xx .info_xx").hide();
        $("#lesson521 .infobox_xx").show();

        if ($(this).hasClass("fld1")) {
          $("#lesson521 .infobox_xx .info_c1").show();
          $("#lesson521 .folders .fld1 .blink").removeClass("blink");
          Lesson521.f_info |= 1;
          Lesson521.percent = (Lesson521.f_info / 15) * 100;
        }
        if ($(this).hasClass("fld2")) {
          $("#lesson521 .infobox_xx .info_c2").show();
          $("#lesson521 .folders .fld2 .blink").removeClass("blink");
          Lesson521.f_info |= 2;
          Lesson521.percent += (Lesson521.f_info / 15) * 100;
        }
        if ($(this).hasClass("fld3")) {
          $("#lesson521 .infobox_xx .info_c3").show();
          $("#lesson521 .folders .fld3 .blink").removeClass("blink");
          Lesson521.f_info |= 4;
          Lesson521.percent += (Lesson521.f_info / 15) * 100;
        }
        if ($(this).hasClass("fld4")) {
          $("#lesson521 .infobox_xx .info_c4").show();
          $("#lesson521 .folders .fld4 .blink").removeClass("blink");
          Lesson521.f_info |= 8;
          Lesson521.percent += (Lesson521.f_info / 15) * 100;
        }

        if (Lesson521.f_info == 15) {
          Lesson521.percent = (Lesson521.f_info / 15) * 100;
          Course.oState.card52 += 100;
          OCookies.set("card52", Course.oState.card52);
        }
        Course.oState.le_52 = Lesson521.percent;
        OCookies.set("le52", Course.oState.le_52);
        Course.showCardPoints();
        Course.showProgress();
      });
    }
    //Lesson521.clickDataClassiffication();
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson521.pre();
        Course.showLesson(521, function () {
          Course.showBotButtons(521, true);
        });
        break;
      case 1:
        Lesson50.next(0);
        break;
    }
  },

  back: function () {
    Lesson52.next(0);
  },
};

var Lesson53 = {
  pre: function () {
    $("#lesson53 .ava-name").hide();

    if (Course.oState.avatar == 0) {
      //0 - Sam
      $("#lesson53 .is_sam").show();
      $("#lesson53 .is_sue").hide();
    } else if (Course.oState.avatar == 1) {
      //1 - Sue
      $("#lesson53 .is_sam").hide();
      $("#lesson53 .is_sue").show();
    } else if (Course.oState.avatar == 2) {
      //2 - Arab Man
      $("#lesson53 .is_arM").show();
      $("#lesson53 .is_arW").hide();
    } else if (Course.oState.avatar == 3) {
      //3 - Arab Woman
      $("#lesson53 .is_arM").hide();
      $("#lesson53 .is_arW").show();
    } else if (Course.oState.avatar == 4) {
      //2 - Indian Man
      $("#lesson53 .is_inM").show();
      $("#lesson53 .is_inW").hide();
    } else if (Course.oState.avatar == 5) {
      //3 - Indian Woman
      $("#lesson53 .is_inM").hide();
      $("#lesson53 .is_inW").show();
    } else if (Course.oState.avatar == 6) {
      //2 - African Man
      $("#lesson53 .is_afM").show();
      $("#lesson53 .is_afW").hide();
    } else if (Course.oState.avatar == 7) {
      //3 - African Woman
      $("#lesson53 .is_afM").hide();
      $("#lesson53 .is_afW").show();
    } else if (Course.oState.avatar == 8) {
      //2 - Asian Man
      $("#lesson53 .is_asM").show();
      $("#lesson53 .is_asW").hide();
    } else if (Course.oState.avatar == 9) {
      //3 - Asian Woman
      $("#lesson53 .is_asM").hide();
      $("#lesson53 .is_asW").show();
    } //show avatar sue
    else {
      $("#lesson53 .is_sue").show();
    }

    Course.showBotButtons(53, false);

    $("#lesson53 .block1").show();
    $("#lesson53 .block2").hide();
  },

  next: function (n) {
    switch (n) {
      case 0:
        Lesson53.pre();
        Course.showLesson(53, function () {
          if (Course.oState.card53 < 1) {
            Course.oState.card53 = 1;
            OCookies.set("card53", Course.oState.card53);
          }

          Course.showBotButtons(53, true);
        });
        break;
      case 1:
        if (Course.oState.currFragment == 0) {
          Course.showBotButtons(53, false);
          setTimeout(function () {
            $("#lesson53 .block1").fadeOut(1000);
          }, 500);

          $("#lesson53 .block2").fadeIn(1500);
          setTimeout(function () {
            Course.setLessonFragment(53, 1);

            Course.oState.card53 = 100;
            OCookies.set("card53", Course.oState.card53);

            Course.showBotButtons(53, true);
          }, 1500);
          Lesson53.percent = 50;
        } else {
          Lesson50.next(0);
          Lesson53.percent += 50;
        }
        Course.oState.le_53 = Lesson53.percent;
        OCookies.set("le53", Course.oState.le_53);
        Course.showProgress();
        break;
    }
  },

  back: function () {
    if (Course.oState.currFragment == 0) {
      Lesson50.next(0);
    } else {
      Course.showBotButtons(53, false);
      setTimeout(function () {
        $("#lesson53 .block2").fadeOut(1000);
      }, 500);

      $("#lesson53 .block1").fadeIn(1500);
      setTimeout(function () {
        Course.setLessonFragment(53, 0);

        Course.showBotButtons(53, true);
      }, 1500);
    }
  },
};
