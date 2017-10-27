<template>
  <div>Loading</div>
</template>
<script>

import { setIdToken, setAccessToken } from './../utils/auth'

export default {
  name: 'Callback',
  mounted () {
    this.$nextTick(() => {
      setAccessToken()
      setIdToken()
      window.location.href = '/barometer'
    })
  }
}
</script>