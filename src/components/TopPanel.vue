<template>
<div class="top-panel">
  <div class="top-panel--themes"></div>
  <div class="top-panel--lock"></div>
  <div class="top-panel--edit"></div>
</div>
</template>

<style scoped>
.top-panel {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.top-panel--themes {
  height: 20px;
  width: 20px;
  background-color: red;
  -webkit-mask: url("./assets/color.svg") no-repeat center;
  mask: url("./assets/color.svg") no-repeat center;
}
</style>