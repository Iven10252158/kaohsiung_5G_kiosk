<template>
<div class="merchant-wrap">
    <div class="merchant-content d-flex">
        <div class="merchant-left">
            <button
              type="button"
              class="text-center py-2 rounded-0 border-0 w-100 text-dark"
              v-for="(store) in categories" :key="store"
              @click="chooseStore(store)"
              :class="{'bg-success': store === storeBtnSource}">
              {{ store }}</button>
        </div>
        <div class="merchant-right bg-dark">
          <div class="container" v-for="(store) in merchantName" :key="store.name">
            <MerchantsInfo v-if="showComponent">
              <ul class="list-unstyled">
                <li class="d-flex mt-3">
                  <h5>電話 :</h5>
                  <p>{{ store.telephone }}</p>
                </li>
                <li class="d-flex">
                  <h5>地址 :</h5>
                  <p>{{ store.address }}</p>
                </li>
              </ul>
            </MerchantsInfo>
              <vue-qr :text="store.url" :margin="0"
                lorDark="#f67b29" colorLight="#fff"
                :logoSrc="store.icon" :logoScale="0.2"
                :size="150">
              </vue-qr>
          </div>
          <div v-if="showMerchants">
            <div class="merchan-top container">
              <div class="d-flex justify-content-around">
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
              </div>
            </div>
            <div class="merchant-bottom container">
              <div class="row g-0">
                <div class="col-sm-4 d-flex justify-content-center" v-for="(store) in filterMerchant" :key="store.name">
                  <button
                    type="button"
                    class="text-center my-2 py-2 px-4 rounded-0 border-0 text-white bg-secondary"
                    @click="openInformation(store)"
                  >
                  {{ store.name }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import MerchantsInfo from '@/components/MerchantsInfo.vue'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
export default {
  components: {
    vueQr,
    MerchantsInfo
  },
  props: {
    sendStoresData: {
      type: Array
    }
  },
  data () {
    return {
      stores: this.sendStoresData,
      types: [],
      storeBtnSource: '',
      typeBtn: '',
      categories: [],
      showComponent: false,
      showMerchants: true,
      merchantName: {}
    }
  },
  computed: {
    filterMerchant () {
      return this.stores.filter((item) => item.type.match(this.typeBtn))
    }
  },
  methods: {
    openInformation (merchantItem) {
      this.merchantName = this.stores.filter(item => {
        if (merchantItem.source === item.source && merchantItem.name === item.name) {
          return item
        }
      })
      this.showComponent = true
      this.showMerchants = false
    },
    chooseStore (item) {
      this.stores.filter(store => {
        if (store.source === item) {
          this.storeBtnSource = item
          return item
        }
      })
      this.filterType()
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
    filterType () {
      const types = new Set()
      this.stores.filter(item => {
        if (item.source === this.storeBtnSource) {
          types.add(item.type)
        }
        this.types = [...types]
      })
    }
  },
  mounted () {
    this.filterCategories()
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
