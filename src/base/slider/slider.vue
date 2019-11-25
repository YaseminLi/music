<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item,index) in slider" :key="index">
      <a :href="item.linkUrl">
        <img :src="item.picUrl" @load='loadImg'>
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  props: {
    slider: Array
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true ,//此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
        },
        autoplay: true,
        speed: 2000 //图片切换的速度
      }
    };
  },
  methods:{
    loadImg(){
      this.$emit('loadImg');
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style lang='stylus' rel="stylesheet/stylus">
a
  overflow: hidden
  width: 100%
  height: 0
  padding-bottom: 40%
  img
    width: 100%
.swiper-pagination-bullet-active
  background: white
</style>
