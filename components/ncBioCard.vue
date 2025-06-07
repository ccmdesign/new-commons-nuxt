<template>
  <div class="nc-bio-card">
    <div class="nc-bio-card__border"></div>
    <div class="nc-bio-card__content">
      <div
        class="nc-bio-card__avatar"
        :style="img ? { backgroundImage: `url('${img}')` } : {}"
      ></div>
      <div class="nc-bio-card__info">
        <div class="nc-bio-card__name">{{ name }}</div>
        <div class="nc-bio-card__desc">{{ description }}</div>
      </div>
      <div class="nc-bio-card__readmore">Read More</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
})
</script>

<style scoped>
.nc-bio-card {
  background: #fff;
  border-radius: 16px;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.nc-bio-card__border {
  position: absolute;
  inset: 0;
  border: 1px solid #f2f2f2;
  border-radius: 16px;
  pointer-events: none;
}

.nc-bio-card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 12px 12px 59px 12px;
  box-sizing: border-box;
  gap: 16px;
}

.nc-bio-card__avatar {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #eee;
  background-size: cover;
  background-position: 50% 50%;
  border-radius: 8px;
  margin-bottom: 8px;
  flex-shrink: 0;
}

.nc-bio-card__info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.nc-bio-card__name {
  font-family: 'FreightSansProBold-Regular', 'trade-gothic-next', sans-serif;
  font-size: 18px;
  line-height: 1.5;
  color: #0e2f40;
  font-weight: 400;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.nc-bio-card__desc {
  font-family: 'FreightSansProBook-Italic', 'trade-gothic-next', sans-serif;
  font-size: 16px;
  line-height: 1.2;
  color: #0e2f40;
  font-style: italic;
  text-align: center;
  width: 100%;
}

.nc-bio-card__readmore {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 24px;
  font-family: 'FreightSansProSemibold-Regular', 'trade-gothic-next', sans-serif;
  font-size: 16px;
  line-height: 1.2;
  color: #009ed4;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
</style> 