<template>
  <router-view/>
  <session-warning-modal v-if="showModal"></session-warning-modal>
  
</template>

<script>
import SessionWarningModal from '@/components/SessionWarningModal.vue';
import endSession from './MIxins/endSession';


export default {
  name: 'AppView',
  mixins: [endSession],
  data() {
    return {
      showModal: false
    }
  },
  components: {
    'session-warning-modal': SessionWarningModal
  },
  mounted() {
    this.expirationSession()
  },
  methods: {
    
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  background-color: #D9D9D9;

}
</style>
