<template>
    <div>
        <Tabs
            name="tab1-1"
            v-model="activeName"
            @on-click="changeTab"
        >
            <TabPane
            :label="this.$t('exchange.curdelegation')"
            name="EntrustCurrent"
            tab="tab1-1"
            >
                <EntrustCurrent v-if="activeName === 'EntrustCurrent'" />
            </TabPane>
            <TabPane
            :label="this.$t('exchange.hisdelegation')"
            name="EntrustHistory"
            tab="tab1-1"
            >
                <EntrustHistory v-if="activeName === 'EntrustHistory'" />
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import EntrustCurrent from './EntrustCurrent.vue'
import EntrustHistory from './EntrustHistory.vue'

export default {
    data() {
        return {
            activeName: 'EntrustCurrent'
        }
    },
  components: {
    EntrustCurrent,
    EntrustHistory
  },
  methods: {
      changeTab(name) {
          console.log(name)
      }
  },
}
</script>
