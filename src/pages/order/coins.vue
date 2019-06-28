<template>
    <div>
        <Tabs name="tab1-1">
            <TabPane 
            :label="this.$t('exchange.curdelegation')" 
            tab="tab1-1"
            >             
                <EntrustCurrent /> 
            </TabPane>
            <TabPane 
            :label="this.$t('exchange.hisdelegation')" 
            tab="tab1-1"
            >            
                <EntrustHistory />
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import EntrustCurrent from './EntrustCurrent.vue'
import EntrustHistory from './EntrustHistory.vue'

export default {
  components: {
    EntrustCurrent,
    EntrustHistory
  }
}
</script>
