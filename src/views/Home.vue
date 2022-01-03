<template>
  <div class="home">
    <h3>This is Home Page!</h3>
    <div>
      <router-link to="/home1">To Home 1!</router-link>
    </div>
    <div>
      <router-link to="/home2">To Home 2!</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
