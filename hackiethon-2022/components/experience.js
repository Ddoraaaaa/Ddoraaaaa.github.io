const backgroundSwiper = new Swiper('#background-swiper', {
  // direction: 'horizontal',
  effect: 'fade',
  // loop: true,
});
var yearIds = ['2021', '2022', '2023', '2024']; 
const contentSwiper = new Swiper('#content-swiper', {
    direction: 'vertical',
    speed: 3000,
    // effect: 'fade',
    // loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
			clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
    },
  });

  contentSwiper.controller.control = [backgroundSwiper];
