<template>
  <div class="wrap">
    <!-- 跑馬燈元件 -->
    <Marquee></Marquee>
    <!-- 影片元件 -->
    <div class="video" :class="{ clickContentStyle: showBackArrow }">
      <div class="video">
        <iframe class="liveVideo" ref="liveVideo"
          style='display:block'
          :src="youtubeSrc"
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
      </div>
    </div>

    <!-- 按鈕、頁面底部 -->
    <div class="btn-group d-flex">
      <div v-if="showBackArrow" class="bg-color py-3 d-flex align-items-center" @click="arrowBtn">
        <div class="arrowBtn text-center mx-auto">
          <a href="#" class="text-decoration-none">
            <i class="fas fa-chevron-left"></i>
          </a>
        </div>
      </div>
      <router-link :to="
        {path : '/contentA/merchants' ,
        query: {
          uuid: `${$route.query.uuid}`,
          merchants: 'total'
        }}"
        v-if="showMerchantBtn"
        class= "merchants text-center py-3 rounded-0 border-0 text-decoration-none"
        @click="clickMerchant"
        :class="{ afterMerchantBtn: showBackArrow }">
          商家
        </router-link>

      <button type="button"
      v-if="showEventBtn"
      class="events text-center py-3 rounded-0 border-0"
      @click="clickEvent"
      :class="{ afterEventBtn: showEventsList}">活動</button>
    </div>
    <TimeTable v-if="showTimeTable"></TimeTable>
  <router-view></router-view>
  </div>
</template>

<script>
import Marquee from '@/components/Marquee.vue'
import TimeTable from '@/components/TimeTable.vue'
// import MerchantList from '@/components/Merchants.vue'
// import EventsList from '@/components/Events.vue'
export default {
  inject: ['useWebsocket'],
  components: {
    Marquee,
    TimeTable
    // MerchantList,
    // EventsList
  },
  data () {
    return {
      useWebSocket: null,
      isShow: true,
      showTimeTable: true,
      showMerchantList: false, // 控制顯示商家清單的元件，預設不顯示
      showEventsList: false, // 控制顯示活動清單的元件，預設不顯示
      showBackArrow: false, // 控制返回按鈕的顯示，預設為不顯示
      showEventBtn: true, // 控制活動按鈕顯示，預設顯示
      showMerchantBtn: true, // 控制商家按鈕顯示，預設顯示
      youtubeSrc: 'https://www.youtube.com/embed/',
      messages: [],
      videos: [],
      marquees: [],
      images: [],
      stores: [
        {
          name: 'StoreA',
          source: '商家區分A',
          type: '餐飲',
          address: '高雄市鴨蛋區中華路3巷17號1樓',
          telephone: '07-12345678',
          url: 'https://www.oexpo.io/vb/6141d5906e128e325be1127f',
          icon: 'https://i.imgur.com/VsAVJc1.png'
        },
        {
          name: 'Store_a',
          source: '商家區分A',
          type: '景點'
        },
        {
          name: 'Store_A',
          source: '商家區分A',
          type: '娛樂'
        },
        {
          name: 'StoreB',
          source: '商家區分B',
          type: '住宿'
        },
        {
          name: 'Store_b',
          source: '商家區分B',
          type: '購物'
        },
        {
          name: 'Store_B',
          source: '商家區分B',
          type: '購物'
        }
      ],
      pageUUID: ''

    }
  },
  methods: {
    getStatus () {
      this.useWebSocket.send(JSON.stringify({ command: `get_status ${this.pageUUID}` }))
    },
    clickMerchant () {
      this.showBackArrow = true
      this.showEventBtn = false
      this.showMerchantList = true
      this.showTimeTable = false
    },
    clickEvent () {
      this.showBackArrow = true
      this.showMerchantBtn = false
      this.showEventsList = true
    },
    arrowBtn () {
      console.log(this.$route.query)
      if (this.$route.query.merchants !== 'total') {
        // this.$router.go(-1)
        this.$router.push({ path: '/contentA/merchants', query: { uuid: this.pageUUID, merchants: 'total' } })
        this.showBackArrow = true
        this.showTimeTable = false
      } else {
        this.$router.push({ path: '/contentA', query: { uuid: this.pageUUID } })
        console.log(this.$route)
        this.showBackArrow = false
        this.showTimeTable = true
      }
      this.showEventBtn = true
      this.showMerchantBtn = true
      this.showEventsList = false
      this.showMerchantList = false
    },
    check (id, type, item) {
      switch (id) {
        case 'e4cd7d1c-713f-4970-b553-f9d5fe563f12' :
          switch (type) {
            case 'youtube' :
              this.videos.unshift(item)
              if (this.videos.length === 2) {
                this.videos.pop()
                this.videos.forEach(item => {
                  this.youtubeSrc = `https://www.youtube.com/embed/${item.source}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1&playlist=${item.source}`
                  console.log(item.source)
                })
              }
              break
            case 'image' :
              this.images.unshift(item)
              if (this.images.length === 2) {
                this.images.pop()
              }
              break
            case 'kukuclock' :
              this.videos.unshift(item)
              if (this.videos.length === 2) {
                this.videos.pop()
                this.videos.forEach(item => {
                  this.youtubeSrc = `https://www.youtube.com/embed/${item.source}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1&playlist=${item.source}`
                })
              }
              break
          }
          break
        case '3ed0033e-2f31-4614-83df-879f24c84715' :
          this.marquees.unshift(item)
          if (this.marquees.length === 2) {
            this.marquees.pop()
          }
          break
      }
    },
    filterData (data) {
      this.messages.push(data)
      this.messages.forEach((item) => {
        this.check(item.listID, item.type, item)
        this.get_status = item.id
        this.initData = item.content
        if (this.get_status === this.pageUUID) {
          this.initData.forEach(item => {
            this.check(item.listID, item.type, item)
          })
        } else {
          return {}
        }
      })
    }
  },
  mounted () {
    this.pageUUID = this.$route.query.uuid
    this.useWebSocket = this.useWebsocket()
    this.useWebSocket.onopen = (e) => {
      console.log('This is ContentA page 成功連線至 WebSocket Server')
      this.getStatus()
    }

    this.useWebSocket.onmessage = (e) => {
      console.log('1. this is onmessage')
      const obj = JSON.parse(e.data)
      this.filterData(obj)
    }
  }

}
</script>

<style lang="scss" scoped>
.wrap{
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.btn-group {
  position: relative;
  .merchants{
    background: linear-gradient(180deg, #1CA9EE 0%, #1873B4 51.56%, #1CA9EE 100%);
    width: 50%;
    color: #fff;
    font-weight: 700;
  }
  // 點擊商家按鈕後的樣式
  .afterMerchantBtn {
    position: absolute;
    right: 0;
    background: linear-gradient(180deg, #86D4FA 0%, #52A1D9 51.56%, #86D4FA 100%);
    width: 70%;
    height: 100%;
    color: #213341;
  }
  .events{
    background: linear-gradient(180deg, #86D4FA 0%, #52A1D9 51.56%, #86D4FA 100%);
    width: 50%;
    color: #213341;
    font-weight: 700;
  }
  // 點擊活動按鈕後的樣式
   .afterEventBtn {
    position: absolute;
    right: 0;
    background: linear-gradient(180deg, #86D4FA 0%, #52A1D9 51.56%, #86D4FA 100%);
    width: 70%;
    height: 100%;
  }
  .bg-color{
    width: 30%;
    cursor: pointer;
    background: linear-gradient(180deg, #1CA9EE 0%, #1873B4 51.56%, #1CA9EE 100%);
  }
  .arrowBtn{
    background-color: #D6EBF0;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    transition: .5s all;
    a{
      color:#1CA9EE;
    }
  }
}
.flex-1{
  flex: 1;
}
.basis-2{
  flex: 0 0;
  flex-basis: 30vw;
}
.video{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 0;
  flex-basis: 40vh;
}
.clickContentStyle{
  flex:0 0;
  flex-basis:30vh;
  transition: .5s all;
}
.liveVideo{
  flex:0 0;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>
