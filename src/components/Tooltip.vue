<template>
    <div class="tooltip">
        {{ title + ': ' + tooltipData.body }}
    </div>
</template>

<script>
export default {
    name: 'Tooltip',
    data() {
        return {

        }
    },
    props: {
        tooltipData: Object,
        title: String
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.toolip {
  //background: #00000099;
  //backdrop-filter: saturate(180%) blur(20px);
  background: red;
  width: 12%;
  height: 2%;
  color: white;
  border-radius: 12px;
  padding: 12px 24px;
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>