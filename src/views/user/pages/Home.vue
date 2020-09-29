<!--
 * @Descripttion: 
 * @version: 
 * @Author: mafengyan
 * @Date: 2020-09-22 09:27:07
 * @LastEditors: mafengyan
 * @LastEditTime: 2020-09-22 18:38:40
-->
<template>
  <div class="home"> 
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
