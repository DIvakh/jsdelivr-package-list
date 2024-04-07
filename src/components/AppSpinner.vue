<template>
  <div class="spinner-container">
    <svg
      class="spinner"
      viewBox="0 0 256 256"
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm33.25488,62.74512a11.96308,11.96308,0,0,0,8.48535-3.51465l22.627-22.62695a12.0001,12.0001,0,0,0-16.97071-16.97071l-22.62695,22.627a12,12,0,0,0,8.48535,20.48535ZM224,116H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.25977,48.76953a12.0001,12.0001,0,0,0-16.9707,16.9707l22.62695,22.627a12.0001,12.0001,0,0,0,16.97071-16.97071ZM128,180a12.0006,12.0006,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12.0006,12.0006,0,0,0,128,180ZM74.25977,164.76953l-22.627,22.62695a12.0001,12.0001,0,0,0,16.97071,16.97071l22.62695-22.627a12.0001,12.0001,0,0,0-16.9707-16.9707ZM76,128a12.0006,12.0006,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12.0006,12.0006,0,0,0,76,128ZM68.60352,51.63281A12.0001,12.0001,0,0,0,51.63281,68.60352l22.627,22.62695a12.0001,12.0001,0,0,0,16.9707-16.9707Z"
        style="
          paint-order: stroke;
          fill-rule: nonzero;
          fill: rgb(118, 120, 124);
        "
      />
    </svg>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style lang="scss">
.spinner-container {
  width: 50px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.spinner {
  width: 50px;
  animation: spin 2.5s linear infinite;

  &.hidden {
    visibility: hidden;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
