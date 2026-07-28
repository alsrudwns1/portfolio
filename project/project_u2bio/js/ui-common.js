$(function () {
  const header = $("#header");

  // 헤더 고정
  $(window).on("scroll", function () {
    let st = $(window).scrollTop();
    if (st > 0) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  });

  // 언어메뉴
  $("#header .lang_btn").on("click", function () {
    $("#header .lang_wrap").toggleClass("on");
  });

  // 모바일 메뉴
  $("#header .open_btn").on("click", function () {
    $("body").toggleClass("on");
    header.toggleClass("on");
    $(this).toggleClass("on");
    $("#header .m_gnb_wrap").toggleClass("on");
  });

  // 모바일 아코디언 메뉴
  $(".m_gnb>li>a").on("click", function () {
    $(this).parent().toggleClass("on");
    $(this).parent().siblings().removeClass("on");
  });

  // 메인 슬라이더
  if ($(".main_swiper").length) {
    const swiper = new Swiper(".main_swiper", {
      loop: true,
      allowTouchMove: false,
      speed: 1000,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    const $progressBar = $(".progress_bar");
    let isPlaying = false;

    // 총 슬라이드 수
    const totalSlide = $(".main_swiper .swiper-slide").not(
      ".swiper-slide-duplicate",
    ).length;
    $(".total").text(String(totalSlide).padStart(2, "0"));

    // 현재 슬라이드 번호
    function updateNumber() {
      $(".current").text(String(swiper.realIndex + 1).padStart(2, "0"));
    }
    updateNumber();
    swiper.on("slideChange", updateNumber);

    // 진행바 시작
    function startProgress() {
      $progressBar.stop(true, false);
      $progressBar.css({ width: 0 });
      $progressBar.animate(
        {
          width: "100%",
        },
        5000,
        "linear",
        function () {
          if (isPlaying) {
            swiper.slideNext();
          }
        },
      );
    }

    // 진행바 초기화
    function resetProgress() {
      $progressBar.stop(true, false);
      $progressBar.css({ width: 0 });
    }

    // 재생 / 정지 버튼
    $(".play_btn").on("click", function () {
      if (isPlaying) {
        isPlaying = false;
        resetProgress();
        $(this).removeClass("pause");
      } else {
        isPlaying = true;
        startProgress();
        $(this).addClass("pause");
      }
    });
    swiper.on("slideChangeTransitionEnd", function () {
      if (isPlaying) {
        startProgress();
      }
    });

    // 이전 버튼
    $(".swiper-button-prev").on("click", function () {
      if (isPlaying) {
        startProgress();
      } else {
        resetProgress();
      }
    });

    // 다음 버튼
    $(".swiper-button-next").on("click", function () {
      if (isPlaying) {
        startProgress();
      } else {
        resetProgress();
      }
    });

    // 화면 리사이징 시 스와이퍼 업데이트
    $(window).on("resize", function () {
      swiper.update();
    });

    // 메인 슬라이더 화살표 클릭
    $(".main_slider .scroll_down").on("click", function (e) {
      e.preventDefault();

      $("html, body").animate({
        scrollTop: $(".main_business").offset().top,
      });
    });
  }

  // aos 초기화
  AOS.init({
    duration: 1000,
    once: true,
  });

  //주식 정보 숫자 카운팅
  function countNum(cnt, final, amount) {
    if (!$(".main_info").length) return;

    let isscroll = false;
    $(window)
      .on("scroll", function () {
        // 요소가 창 아래에서 위로 스크롤
        const posY =
          $(".main_info .info_left").offset().top - $(this).outerHeight();
        if ($(this).scrollTop() >= posY && !isscroll) {
          //숫자 카운팅
          const numEl = $(".main_info .num strong");
          const interval = setInterval(() => {
            cnt += amount;
            numEl.text(cnt);
            if (cnt >= final - amount) {
              numEl.text(final);
              clearInterval(interval);
            }
          }, 10);
          isscroll = true;
        }
      })
      .trigger("scroll");
  }
  countNum(0, 4185, 17);

  $("#footer .family_btn").on("click", function () {
    $(this).parent().toggleClass("on");
  });

  //#footer .top_btn 클릭 시 위로 애니메이션 되며 올라가기
  $("#footer .top_btn").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 });
  });

  // 모바일 서브 탭 메뉴
  $(".sub_tab2 .tab_btn").on("click", function () {
    $(this).parent().toggleClass("on");
  });
});
