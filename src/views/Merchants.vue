<template>
<div class="merchant-wrap">
    <div class="merchant-content d-flex">
        <div class="merchant-left">
            <button
              type="button"
              class="text-center py-2 rounded-0 border-0 w-100 text-dark"
              @click="totalMerchants(store)"
              :class="{'bg-success':merchantsValue === ''}"
            >全部商家</button>
            <button
              type="button"
              class="text-center py-2 rounded-0 border-0 w-100 text-dark"
              v-for="(store) in categories" :key="store"
              @click="chooseStore(store)"
              :class="{'bg-success': store === merchantsValue}">
              {{ store }}</button>
        </div>
        <div class="merchant-right bg-dark">
          <div v-if="showMerchants">
            <div class="merchan-top container">
              <div class="d-flex justify-content-around">
                <p
                    class="badge pointer rounded-pill bg-secondary d-flex align-items-center mt-2 mb-0"
                    @click="totalTypes(type)"
                    :class="{'bg-success': typeBtn === ''}"
                >
                <span
                    class="badge-circle pe-1 text-light"
                    :class="{'text-dark': typeBtn === ''}"
                >
                    <i class="fas fa-circle"></i>
                </span>
                <span class="text-dark">全部</span>
                </p>
                <template v-if="merchantsValue === ''">
                <p
                  class="badge pointer rounded-pill bg-secondary d-flex align-items-center mt-2 mb-0"
                  v-for="(type) in allTypes" :key="type"
                  @click="chooseType(type)"
                  :class="{'bg-success': type === typeBtn}"
                >
                  <span
                    class="badge-circle pe-1 text-light"
                    :class="{'text-dark': type === typeBtn}"
                  >
                    <i class="fas fa-circle"></i>
                  </span>
                  <span class="text-dark">{{ type }}</span>
                </p>
                </template>

                <template v-if="merchantsValue !== ''">
                <p
                  class="badge pointer rounded-pill bg-secondary d-flex align-items-center mt-2 mb-0"
                  v-for="(type) in types" :key="type"
                  @click="chooseType(type)"
                  :class="{'bg-success': type === typeBtn}"
                >
                  <span
                    class="badge-circle pe-1 text-light"
                    :class="{'text-dark': type === typeBtn}"
                  >
                    <i class="fas fa-circle"></i>
                  </span>
                  <span class="text-dark">{{ type }}</span>
                </p>
                </template>
              </div>
            </div>
            <div class="merchant-bottom container">
              <div class="row g-0">
                    <div class="col-sm-4 d-flex justify-content-center" v-for="(store) in filterMerchants" :key="store.name"
                    @click="openInformation(store)">
                        <button class= "text-center my-2 py-2 px-4 rounded-0 border-0 text-white bg-secondary text-white text-decoration-none">{{ store.name }}</button>
                    <MerchantInfo :merchants="merchantName" v-if="showComponent"></MerchantInfo>
                    <!-- <router-link :to="
                        {path : '/contentA/merchantDetail' ,
                        query: {
                        uuid: `${$route.query.uuid}`,
                        merchantsName: `${store.name}`
                        }}"
                        class= "text-center my-2 py-2 px-4 rounded-0 border-0 text-white bg-secondary text-white text-decoration-none">
                        {{ store.name }}
                    </router-link> -->
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
<router-view/>
</template>

<script>
import MerchantInfo from '@/components/MerchantsInfo.vue'
// import vueQr from 'vue-qr/src/packages/vue-qr.vue'
export default {
  components: {
    // vueQr,
    MerchantInfo
  },
  data () {
    return {
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
      types: [],
      allTypes: [],
      totalTypeValue: '',
      typeBtn: '',
      categories: [],
      showComponent: false, // 預設不顯示單一商家資訊
      showMerchants: true, // 預設顯示 所有商家的資訊
      merchantName: {},
      merchantsValue: ''
    }
  },
  computed: {
    filterMerchants () {
      return this.stores.filter((item) => {
        if (item.type.match(this.typeBtn) && item.source.match(this.merchantsValue)) {
          return item
        }
      })
    }
  },
  methods: {
    totalMerchants (item) {
      this.stores.filter(element => {
        this.merchantsValue = ''
        if (item === undefined) {
          return this.stores
        }
      })
      this.allType()
    },
    totalTypes (type) {
      this.stores.filter(element => {
        this.typeBtn = ''
        if (type === undefined) {
          return this.stores
        }
      })
    },
    openInformation (merchantItem) {
      this.stores.forEach(item => {
        if (merchantItem.source === item.source && merchantItem.name === item.name) {
          this.merchantName = item
        }
      })
      //   console.log(this.merchantName)
      this.showComponent = true
    //   this.showMerchants = false
    },
    chooseStore (item) {
      this.stores.filter(store => {
        if (store.source === item) {
          this.merchantsValue = item
          return item
        }
      })
      this.filterTypes()
    },
    chooseType (item) {
      this.stores.filter(store => {
        if (store.type === item) {
          this.typeBtn = item
          return this.typeBtn
        }
      })
    },
    filterCategories () {
      const categories = new Set()
      this.stores.filter(item => {
        categories.add(item.source)
      })
      this.categories = [...categories]
    },
    allType () {
      const allType = new Set()
      this.stores.filter(item => {
        allType.add(item.type)
        this.allTypes = [...allType]
      })
    },
    filterTypes () {
      const types = new Set()
      this.stores.filter(item => {
        if (item.source === this.merchantsValue) {
          types.add(item.type)
        }
        this.types = [...types]
      })
    }
  },
  mounted () {
    this.filterCategories()
    this.totalMerchants()
  }
}
</script>

<style lang="scss" scoped>
.merchant-wrap{
    display: flex;
    height: 55vh;
    position: relative;
}
.merchant-content{
    background-color: #213341;
    flex: 1;

    .merchant-left{
        background-color:  #3E708B;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 30%;
    }
    .merchant-left > button{
        background-color: transparent;
    }
    .merchant-right{
        background-color:  #3E708B;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 70%;
    }
    .circle{
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #81CFF7;
    }
}
.triangle{
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 39.5px 49px 39.5px 0;
    border-color: transparent #007bff transparent transparent;
}

.badge-circle{
  font-size: .75em;
}
.pointer{
  cursor: pointer;
}
</style>
