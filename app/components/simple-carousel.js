import Component from '@ember/component';
import Swiper from 'npm:swiper';

export default Component.extend({

    didInsertElement() {
        this.setupSwiper();
    },

    swiper: null,

    setupSwiper() {
      this.set('swiper', new Swiper('.swiper-container', {
          slidesPerView: 1,
          spaceBetween: 10,
          // effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          loop: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay:7000,
          speed: 1000,
          coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
          },
    }))
  },
});
