<script lang="ts" setup>
import { uuid } from 'uuidv4';

const CELL_WIDTH = 20


const textConfig = {
  fontSize: 10,
  fill: '#D0D0D0'
}

// const props = defineProps([
//   'data',
//   'mirrorMode'
// ])
const props = defineProps({
  data: {
    default: {
      cols: 12,
      rows: 12,
      cells: [{ existed: true, isReefer: true, is45Foot: false }]
    }
  },
  mirrorMode: {
    default: true,
    type: Boolean
  }
})



const selectedHatchIndex = 1
const selectedContainerType = 'standard' ||
  'reefer' ||
  '45foot'


const containers = computed(function () {
  const cols = props.data.cols
  const rows = props.data.rows
  // Add properties neeeded for ui
  const newContainers = props.data.cells.map((c, index) => ({ ...c, id: uuid(), index: index, x: ((index % cols)) * CELL_WIDTH + 50, y: (rows - 1 - Math.floor(index / cols)) * CELL_WIDTH + 20, width: CELL_WIDTH, height: CELL_WIDTH, fill: c.existed ? '#5B646B' : 'white', stroke: '#A0A0A0', strokeWidth: 0.3, type: 'standard' }))
  return newContainers
})

function getXLabels() {
  let labels: string[] = []
  let middle = props.data.cols % 2 === 0 ? props.data.cols / 2 : Math.floor(props.data.cols / 2)
  let startNumber = props.data.cols % 2 === 0 ? 1 : 0
  for (let i = 0; i < props.data.cols; i++) {
    if (props.data.cols % 2 === 0) {
      labels[middle + Math.floor((i * ((-1) ** i)) / 2)] = (i + 1).toString().padStart(2, '0')
    } else {
      labels[middle + Math.ceil((i * ((-1) ** (i - 1))) / 2)] = (startNumber + i).toString().padStart(2, '0')
    }
  }
  return labels
}

function toggleCellProperty(hatchIndex, cellIndex, property, currentValue) {
  console.log('dummy');
}

function getYLabels() {
  let labels: string[] = []
  for (let i = props.data.rows - 1; i >= 0; i--) {
    labels.push((80 + i * 2).toString())
  }
  return labels
}

function updateContainer(container, cellIndex) {
  // const Foundcontainer = this.containers.find(c => c.id === id)
  if (selectedContainerType === 'standard') {
    toggleCellProperty(selectedHatchIndex, cellIndex, 'existed', container.existed)
  } else if (selectedContainerType === 'reefer') {
    toggleCellProperty(selectedHatchIndex, cellIndex, 'isReefer', container.isReefer)
  } else if (selectedContainerType === '45foot') {
    toggleCellProperty(selectedHatchIndex, cellIndex, 'is45Foot', container.is45Foot)
  }
}

const configKonva = () => {
  return {
    width: 100 + props.data.cols * CELL_WIDTH,
    height: props.data.rows * CELL_WIDTH + 20
  }
}

function getYLabelConfig(value: string, index: number) {
  return {
    text: value.toString(),
    x: props.data.cols * CELL_WIDTH + 55,
    y: 5 + CELL_WIDTH + index * CELL_WIDTH,
    fontSize: 11,
    listening: false,
    fill: '#707070'
  }
}

function getXLabelConfig(value: string, index: number) {
  return {
    text: value,
    x: 55 + index * CELL_WIDTH,
    y: 5,
    fontSize: 11,
    listening: false,
    fill: '#707070'
  }
}

function handleClick(containerIndex: number, container: any) {
  updateContainer(container, containerIndex)


  if (props.mirrorMode === true) {
    const currentRowIndex = Math.floor(containerIndex / props.data.cols)
    const currentColumnIndex = containerIndex % props.data.cols
    const mirrorColumnIndex = (props.data.cols) - currentColumnIndex
    const mirrorIndex = currentRowIndex * props.data.cols + mirrorColumnIndex - 1

    if (mirrorIndex !== containerIndex)
      updateContainer(container, mirrorIndex)
    if (containers[mirrorIndex].fill !== containers[containerIndex].fill) {
      updateContainer(container, mirrorIndex)
    }
  }
}


</script>

<template>
  <div id="container">
    <LazyClientOnly>
      <v-stage class="hatch-grid" :config="configKonva()">
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
    </LazyClientOnly>
  </div>
</template>

<style></style>