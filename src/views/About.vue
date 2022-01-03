<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <router-link to="/about/about1">To About1 1!</router-link>
    </div>
    <div>
      <router-link to="/about/about2">To About2 1!</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "About"
}
</script>
