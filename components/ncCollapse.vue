<template>
  <details class="accordeon" :name>
    <summary><h4>{{ data.summary }}</h4></summary>
    <div v-html="data.content"></div>
  </details>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'summary' in value && 'content' in value;
    }
  },
  name: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.accordeon {
  &[open] > summary::after {
    transform: rotate(180deg);
  }

  &[open] summary ~ * {
  animation: sweep .5s ease-in-out;
}

  :deep(a) {
    font-weight: 500;
    text-decoration: underline;
  }


  summary {
    display: flex;
    position: relative;
    width: 100%;
    padding: var(--space-xs-s) 0;
    border-bottom: 1px solid var(--gray-color);

    h4 {
      font-weight: 400;
      font-size: var(--size-0);
    }

    &::after {
      position: absolute;
      right: 0;
      top: calc(50% + 5px);
      transform: translateY(-50%);
      content: '';
      width: 18px;
      height: 10px;
      background: url('./assets/arrow.svg') no-repeat;
      background-size: cover;
      margin-left: .75em;
      transition: 0.5s;
    }
    
  }

  :deep(p), :deep(li) {
    text-wrap: balance;
    font-weight: 300;
  }
}

@keyframes sweep {
  0%    {opacity: 0; margin-left: -10px}
  100%  {opacity: 1; margin-left: 0px}
}
</style>