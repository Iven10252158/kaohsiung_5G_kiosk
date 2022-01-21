<template>
<div class="merchantDetail-wrap">
    <div class="merchantDetail-content">
        <div class="merchantDetail-left">
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
        <div class="merchantDetail-right bg-dark text-white">
            <div v-for="store in stores" :key="store.name">
                {{ store.name }}
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
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
      categories: [],
      merchantsValue: ''
    }
  },
  methods: {
    filterCategories () {
      const categories = new Set()
      this.stores.filter(item => {
        categories.add(item.source)
      })
      this.categories = [...categories]
    },
    chooseStore (item) {
      console.log(item)
      this.stores.filter(store => {
        if (store.source === item) {
          this.merchantsValue = item
          return item
        }
      })
    },
    totalMerchants (item) {
      this.stores.filter(element => {
        this.merchantsValue = ''
        if (item === undefined) {
          return this.stores
        }
      })
    }
  },
  mounted () {
    this.filterCategories()
  }
}
</script>

<style lang="scss" scoped>
.merchantDetail-wrap{
    display: flex;
    height: 55vh;
    position: relative;
}
.merchantDetail-content{
    background-color: #213341;
    flex: 1;

    .merchantDetail-left{
        background-color:  #3E708B;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 30%;
    }
    .merchantDetail-left > button{
        background-color: transparent;
    }

    .merchantDetail-right{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 70%;
    }
}
</style>
