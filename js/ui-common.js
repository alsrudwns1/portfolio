$(function () {
  const $window = $(window);
  const $body = $("body");
  const POPCON_URL = "http://www.popcon.p-e.kr/";
  const BINGGRAE_URL = "https://alsrudwns1.github.io/Project-Binggrae/";
  const U2BIO_URL =
    "https://alsrudwns1.github.io/portfolio/project/project_u2bio/index.html";

  let typingStarted = false;
  // 모바일 화면 AOS 설정
  if (window.innerWidth <= 767) {
    $(".about_wrap, .face_wrap").attr("data-aos", "fade-up");
  }

  // 스크롤 이벤트
  $window.on("scroll", function () {
    const sct = $window.scrollTop();
    $("#header").toggleClass("on", sct > 0);
    $(".down_btn").toggle(sct === 0);
    $(".top_btn").toggle(sct > 0);

    // 에필로그 섹션 도달 시 타이핑 애니메이션 시작
    if (!typingStarted) {
      const epTop = $(".epilogue_section").offset().top;
      const winH = $window.height();
      if (sct + winH > epTop + 100) {
        typingStarted = true;
        new Typed("#ep_typing", {
          strings: [
            'Driven to <span class="point1">Learn</span>,<br>Committed to <span class="m_br"><br/></span><span class="point2">Publishing</span>',
          ],
          typeSpeed: 40,
          startDelay: 300,
          showCursor: false,
          contentType: "html",
        });
        $(".ep_txt").addClass("active");
      }
    }
  });
  $window.trigger("scroll");

  // 탑버튼
  $(".down_btn").on("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  });
  $(".top_btn").on("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 메인화면 타이핑 애니메이션
  new Typed("#typing", {
    strings: [
      '<span class="power1">PUB</span> &amp; <span class="power2">DEV</span><span class="min_txt"> MIN</span><span class="pc_br"><br/></span>Portfolio',
    ],
    typeSpeed: 60,
    startDelay: 500,
    showCursor: false,
    contentType: "html",
  });

  // 메인화면 목업 탭
  $(".tab_num_wrap li").on("click", function () {
    const index = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    $(".mockup_tab li")
      .eq(index)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });

  // 프로젝트 스와이퍼
  const projectSwiper = new Swiper(".projectSwiper", {
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  $(".project_name li").on("click", function () {
    const idx = $(this).index();
    $(this).addClass("active").siblings().removeClass("active");
    projectSwiper.slideTo(idx);
  });
  projectSwiper.on("slideChange", function () {
    $(".project_name li")
      .removeClass("active")
      .eq(projectSwiper.activeIndex)
      .addClass("active");
  });

  // 깃헙
  $(".github_btn").on("click", function () {
    window.open($(this).data("url"), "_blank", "noopener,noreferrer");
  });

  // 팝콘 PC, 모바일
  $(".popcon_pc").on("click", function () {
    window.open(POPCON_URL, "_blank", "noopener,noreferrer");
  });
  $(".popcon_m").on("click", function () {
    window.open(
      POPCON_URL,
      "mobileView",
      "width=390,height=844,noopener,noreferrer",
    );
  });

  // 빙그레 PC
  $(".binggrae_pc").on("click", function () {
    $.featherlight({
      iframe: BINGGRAE_URL,
      iframeWidth: "100%",
      iframeHeight: "100%",
    });
  });

  // 빙그레 모바일
  $(".binggrae_m").on("click", function () {
    $("#mobile_iframe").attr("src", BINGGRAE_URL);

    $(".mobile_modal").addClass("active");
    $body.addClass("scroll_lock");
  });

  // 유튜바이오 PC
  $(".u2bio_pc").on("click", function () {
    $.featherlight({
      iframe: U2BIO_URL,
      iframeWidth: "100%",
      iframeHeight: "100%",
    });
  });

  // 유튜바이오 모바일
  $(".u2bio_m").on("click", function () {
    $("#mobile_iframe").attr("src", U2BIO_URL);

    $(".mobile_modal").addClass("active");
    $body.addClass("scroll_lock");
  });

  // 모바일 목업
  $(".mobile_view_btn").on("click", function () {
    $(".mobile_modal").addClass("active");
    $body.addClass("scroll_lock");
  });
  $(".mobile_close").on("click", closeMobileModal);
  $(".mobile_modal").on("click", function (e) {
    if (e.target === this) {
      closeMobileModal();
    }
  });
  function closeMobileModal() {
    $(".mobile_modal").removeClass("active");
    $("#mobile_iframe").attr("src", "");
    $body.removeClass("scroll_lock");
  }

  // 기능정의서
  const manualSwiper = new Swiper(".manual_swiper", {
    slidesPerView: 1,
    speed: 600,
    navigation: {
      nextEl: ".manual_next",
      prevEl: ".manual_prev",
    },
  });
  $(".manual_btn").on("click", function () {
    $(".manual_modal").addClass("active");
    $body.addClass("scroll_lock");
    manualSwiper.update();
  });
  $(".modal_close").on("click", function () {
    $(".manual_modal").removeClass("active");
    $body.removeClass("scroll_lock");
  });

  // 프로젝트 팝콘
  const popconSwiper = new Swiper(".popcon_swiper", {
    slidesPerView: 1,
    speed: 600,
    navigation: {
      nextEl: ".popcon_next",
      prevEl: ".popcon_prev",
    },
  });
  $(".popcon_devnote").on("click", function () {
    $(".popcon_modal").addClass("active");
    $body.addClass("scroll_lock");
    popconSwiper.update();
  });
  $(".popcon_close").on("click", function () {
    $(".popcon_modal").removeClass("active");
    $body.removeClass("scroll_lock");
  });

  // ESC로 풀스크린 모달 화면 나가기
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(".manual_modal, .popcon_modal, .mobile_modal").removeClass("active");
      $body.removeClass("scroll_lock");
    }
  });

  // AOS
  AOS.init({
    duration: 1200,
    easing: "ease-out-cubic",
    once: true,
  });
});
