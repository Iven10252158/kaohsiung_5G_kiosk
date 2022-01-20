<template>
    <div class="video">
        <YoutubeVue3 class="liveVideo" videoid="2mCSYvcfhtc"
        style='width:100% ; height: 40vh; display:block'
        ref="youtube"
        :autoplay="autoplay"
        @played="onPlayed"
        @ended="onEnded"/>
    </div>
</template>

<script>
import { YoutubeVue3 } from 'youtube-vue3'

export default {
//   props: {
//     height: {
//       default: '40vh'
//     }
//   },
  components: {
    YoutubeVue3
  }
}
</script>

<style lang="scss" scoped>
.video{
  display: flex;
  flex-direction: column;
  position: relative;
//   flex:0 0;
//   flex-basis: 40vh;
}
.liveVideo{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>
