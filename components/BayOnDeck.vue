<script setup>
console.log('hi')
</script>

<template>
  <div id="container">
    <v-stage class="hatch-grid" :config="configKonva">
      <v-layer>
        <!-- X Axis labels -->
        <v-text v-for="(value, index) in getXLabels()" :key="`x-label-${index}`"
          :config="getXLabelConfig(value, index)" />

        <!-- Y Axis labels -->
        <v-text v-for="(value, index) in getYLabels()" :key="`y-label-${index}`"
          :config="getYLabelConfig(value, index)" />

        <!-- Rectangles -->
        <v-group v-for="(container, containerIndex) in containers" :key="container.id" :config="{ x: 0, y: 0 }">
          <v-rect :config="container" @click="handleClick(containerIndex, container)" />
          <v-text
            :config="{ ...textConfig, text: container.isReefer ? 'RE' : container.is45Foot ? '45' : '', x: container.x + 2, y: container.y + 2, listening: false }" />
            <!-- <v-text
            :config="{ ...textConfig, text: containerIndex, x: container.x + 2, y: container.y + 2 }" /> -->
        </v-group>
      </v-layer>
    </v-stage>
  </div>
</template>