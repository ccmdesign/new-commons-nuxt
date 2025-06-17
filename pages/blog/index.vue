<template>
    <nc-base-section>
      <h4>News, Insights, and Impact</h4>  
      <h1>Blog</h1>
      <p>News and updates on the New Commons Challenge and its partners.</p>
    </nc-base-section>

    <nc-base-section>
      <nc-blog-featured>
        
      </nc-blog-featured>
    </nc-base-section>

    <nc-base-section>
        <div class="grid blog-grid">
          <div class="card-aux" v-for="i in 9" :key="i"></div>
        </div>
    </nc-base-section>
    
</template>

<script setup>

</script>

<style scoped>
.blog-grid {
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}

</style>