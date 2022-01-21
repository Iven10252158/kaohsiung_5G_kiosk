<template>
    <div class="text-white" v-for="item in merchants" :key="item.name">
        {{ item.name }}
    </div>
</template>

<script>
export default {
  props: {
    merchants: {
      type: Object
    }
  },
  mounted () {
    console.log('props merchants', this.merchants)
  }
}
</script>
