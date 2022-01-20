<template>
    <swiper class="mySwiper"
    :loop="true"
    :pagination='{
        "type": "progressbar"
    }'
    :mousewheel="true"
    :autoplay='{ "delay": 2500, "disableOnInteraction": false }' >
        <swiper-slide>
            <div class="box flex-1"></div>
        </swiper-slide>
    </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
// swiper bundle styles
import 'swiper/swiper-bundle.min.css'

// swiper core styles
import 'swiper/swiper.min.css'

// modules styles
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

// import Swiper core and required modules
import SwiperCore, {
  Navigation, Pagination, Autoplay
} from 'swiper'

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay])

export default {
  components: {
    Swiper,
    SwiperSlide
  }
}

</script>

<style lang="scss" scoped>
.mySwiper {
  display: flex;
  width: 100%;
}
.box{
  background-image: url(https://images.unsplash.com/photo-1490430657723-4d607c1503fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
  background-size: cover;
  background-position: center top;
  height: 50vh;
}
.flex-1{
    flex: 1;
}

</style>
