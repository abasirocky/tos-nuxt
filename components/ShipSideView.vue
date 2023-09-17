<script lang="ts">
  import Vue, { computed } from 'vue';
  import ShipBody from './ShipBody.vue';
  import { VesselHatchType, SET_SELECTED_HATCH_INDEX, DELETE_VESSEL_HATCH, ADD_VESSEL_HATCH } from '@/core/services/store/vesselProfile.module';
  import { mapActions, mapGetters } from 'pinia';
  // import Bow from '@/components/vesselOperationMonitoring/assets/Bow.svg'
  
  const SECTION_WIDTH = 70
  const TAIL_WIDTH = 100
  const WIDTH_20_FOOT_CONTAINER = 25
  const WIDTH_40_FOOT_CONTAINER = 50
  const HEIGHT_CONTAINER = 10
  
  
  interface Section {
    id: string;
    type: VesselHatchType;
    hasBayFore: boolean
    bayFore: number
    bayAfter: number
    bay40: number
    hasBay40: boolean
    hasBayAfter: boolean
    underDeck: {
      rowCount: number
    }
    onDeck: {
      rowCount: number
    }
  }
  
  
  
  interface Ship {
    head: Section;
    tail: Section;
    middle: Section[];
  }
  
  export default ({
    components: {
      ShipBody: ShipBody
    },
    data: function () {
      return {
        headImage: process.env.VUE_APP_BASE_URL + "media/svg/vesselProfile/Stern.svg",
        tailImage: process.env.VUE_APP_BASE_URL + "media/svg/vesselProfile/Bow.svg",
        UnderDeckCellConfig: {},
        SECTION_WIDTH: SECTION_WIDTH,
        TAIL_WIDTH: TAIL_WIDTH,
        selectedHatchIndex: 0,
        isHighlightActive: false,
        VesselHatchType: VesselHatchType,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
        sternImage: null,
        bowImage: null,
        bodyImage: null,
        cellImage: null,
        fortyFootImage: null,
        ship: {
          head: {
            id: 'head',
            type: 'head',
            position: 0
          },
          middle: [
            {
              id: '001',
              type: VesselHatchType.Hatch,
              bg: '#ffffff00',
              hasBay40: false,
              hasBayAfter: true,
              hasBayFore: true,
              underDeck: {
                rowCount: 2,
              },
              onDeck: {
                rowCount: 3,
              }
            },
          ]
        },
        showContextMenu: false,
        contextMenuX: 0,
        contextMenuY: 0,
        selectedSection: null as Section | null,
      };
    },
    // created() {
    //   window.addEventListener('contextmenu', (event) => {
    //     event.preventDefault();
    //   });
    // },
    destroyed() {
      window.removeEventListener('contextmenu', (event) => {
        event.preventDefault();
      });
    },
    methods: {
      getSectionGroupConfig() {
        return {
  
        }
  
  
      },
      getSectionConfig(section: Section, index) {
        return {
          x: - SECTION_WIDTH * index + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)),
          y: 150,
          width: SECTION_WIDTH,
          height: 182,
  
          // image: thi1s.bodyImage,
          sceneFunc: (context, shape) => {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(SECTION_WIDTH, 0);
            context.lineTo(SECTION_WIDTH, 89);
            context.lineTo(0, 89);
            context.closePath();
  
            // upper part color
            context.fillStyle = '';
            context.fill();
  
            // bottom part color
            context.beginPath();
            context.moveTo(0, 89);
            context.lineTo(SECTION_WIDTH, 89);
            context.lineTo(SECTION_WIDTH, 182);
            context.lineTo(0, 182);
            context.closePath();
  
            context.fillStyle = '#1C5B7C';
            context.fill();
  
  
          },
  
        };
      },
  
      getHatchForeLabelsConfig(section: Section, index) {
        return {
          x: - SECTION_WIDTH * index + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)) + SECTION_WIDTH * 6 / 12 + 6,
          y: 370,
          fill: 'blue',
          listening: false,
          fontStyle: 'normal',
          fontSize: 13,
          text: section.hasBayFore ? String(section.bayFore).padStart(2, '0') : '',
        }
      },
      getHatch40FootLabelsConfig(section: Section, index) {
        return {
          x: - SECTION_WIDTH * index + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)) + SECTION_WIDTH * 4 / 12 + 6,
          y: 350,
          fill: 'red',
          listening: false,
          fontStyle: 'normal',
          fontSize: 13,
          text: section.hasBay40 ? String(section.bay40).padStart(2, '0') : '',
        }
      },
  
      getHatchAfterLabelsConfig(section: Section, index) {
        return {
          x: - SECTION_WIDTH * index + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)) + SECTION_WIDTH * 2 / 12 + 6,
          y: 370,
          fill: 'blue',
          fontStyle: 'normal',
          listening: false,
          fontSize: 13,
          text: section.hasBayAfter ? String(section.bayAfter).padStart(2, '0') : '',
        }
      },
  
  
  
      getHighlightConfig: function (section, sectionIndex) {
        return {
          // x: - SECTION_WIDTH * sectionIndex + TAIL_WIDTH,
          x: - SECTION_WIDTH * sectionIndex + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)),
          y: 0,
          onMouseEnter: function (e: any) {
            const container = e.target.getStage().container();
            container.style.cursor = "crosshair";
  
          },
          width: SECTION_WIDTH,
          height: 500,
          fill: this.$store.state.vesselProfile.selectedHatchIndex === sectionIndex ? '#ff000022' : '#ffffff00',
          onClick: () => {
  
            // this.selectedHatchId = sectionIndex
            // this.setSelectedHatchId(section.id)
  
  
            this.showContextMenu = false;
            this.$store.dispatch({ type: 'setSelectedHatchIndex', index: sectionIndex })
  
  
            // this.$emit('selectSection', section.id)
  
  
            // Add event listener to reset section.bg on click outside of rectangle
            // document.addEventListener('click', (event) => {
            //   const rect = document.querySelector('#bg' + section.id); // Replace with the appropriate selector for your rectangle
            //   
            //   if (!rect.contains(event.target as Node)) {
            //     section.bg = '#ffffff00';
            //   }
            // });
          },
        }
      },
  
      getOnDeckCellConfig: function(section, index, sectionIndex) {
        
        
        const x = (() => -SECTION_WIDTH * sectionIndex + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)) + SECTION_WIDTH / 2)()
        const y = (() => 145 - index * HEIGHT_CONTAINER + .3)()
        const width = (() => {
            if (section.hasBayFore) return WIDTH_20_FOOT_CONTAINER;
            return 0;
          })()
        const height = (() => {
          if (section.hasBayFore) return HEIGHT_CONTAINER;
          return 0;
        })()
  
  
        return {
          x,
          y,
          width,
          height,
          fill: 'white',
          listening: false,
          strokeWidth: 0.4,
          stroke: 'black',
        };
        
      },
  
  
  
      getOnDeckAfterCellConfig(section: Section, index, sectionIndex) {
        return {
          x: - SECTION_WIDTH * sectionIndex + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)) + SECTION_WIDTH / 2 - WIDTH_40_FOOT_CONTAINER / 2,
          y: 145 - index * HEIGHT_CONTAINER + .3,
          width: (() => {
            if (section.hasBayAfter) return WIDTH_20_FOOT_CONTAINER
            if (section.hasBay40) return WIDTH_40_FOOT_CONTAINER
            return 0
          })(),
          height: (() => {
            if (section.hasBayAfter || section.hasBay40) return HEIGHT_CONTAINER
            return 0
          })(),
          fill: 'white',
          listening: false,
          strokeWidth: 0.4,
  
          stroke: '#black',
        }
      },
  
      getUnderDeckCellConfig(section: Section, index, sectionIndex) {
        return {
          x: - SECTION_WIDTH * sectionIndex + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)) + SECTION_WIDTH / 2,
          y: 145 + index * HEIGHT_CONTAINER + .3,
          width: (() => {
            if (section.hasBayFore) return WIDTH_20_FOOT_CONTAINER
            return 0
          })(),
          height: (() => {
            if (section.hasBayFore) return HEIGHT_CONTAINER
            return 0
          })(),
          fill: 'white',
          listening: false,
          strokeWidth: 0.4,
          stroke: '#black',
        }
      },
      getUnderDeckAfterCellConfig(section: Section, index, sectionIndex) {
        return {
          x: - SECTION_WIDTH * sectionIndex + (TAIL_WIDTH + SECTION_WIDTH * (this.vesselProfileHatches.length - 1)) + SECTION_WIDTH / 2 - WIDTH_40_FOOT_CONTAINER / 2,
          y: 145 + index * HEIGHT_CONTAINER + .3,
          width: (() => {
            if (section.hasBayAfter) return WIDTH_20_FOOT_CONTAINER
            if (section.hasBay40) return WIDTH_40_FOOT_CONTAINER
            return 0
          })(),
          height: (() => {
            if (section.hasBayAfter || section.hasBay40) return HEIGHT_CONTAINER
            return 0
          })(),
          fill: 'white',
          listening: false,
          strokeWidth: 0.4,
  
          stroke: '#black',
        }
      },
      getDeckBridgeConfig(section, sectionIndex) {
        return {
          x: SECTION_WIDTH * sectionIndex + TAIL_WIDTH + WIDTH_20_FOOT_CONTAINER + SECTION_WIDTH / 2 - WIDTH_40_FOOT_CONTAINER / 2,
          y: 50,
          width: 100,
          height: 100,
          fill: 'white',
          strokeWidth: 0.4,
          listening: false,
          stroke: '#black',
        }
      },
      getDeckEngineConfig(section, sectionIndex) {
        return {
          x: SECTION_WIDTH * sectionIndex + TAIL_WIDTH + WIDTH_20_FOOT_CONTAINER + SECTION_WIDTH / 2 - WIDTH_40_FOOT_CONTAINER / 2,
          y: 50,
          width: 100,
          height: 100,
          fill: 'white',
          strokeWidth: 0.4,
          listening: false,
          stroke: '#black',
        }
      },
      getDeckCraneConfig(section, sectionIndex) {
        return {
          x: SECTION_WIDTH * sectionIndex + TAIL_WIDTH + WIDTH_20_FOOT_CONTAINER + SECTION_WIDTH / 2 - WIDTH_40_FOOT_CONTAINER / 2,
          y: 50,
          width: 100,
          height: 100,
          fill: 'white',
          listening: false,
          stroke: '#black',
        }
      },
      open(evt) {
        // updates position of context menu 
        this.contextMenuX = evt.pageX || evt.clientX;
        this.contextMenuY = evt.pageY || evt.clientY;
        // make element focused 
        // @ts-ignore
        Vue.nextTick(() => this.$el.focus());
      },
      handleRightClick(section: Section, event: any) {
        // event.evt.preventDefault();
        
        this.showContextMenu = !this.showContextMenu;
        this.contextMenuX = event.evt.pageX || event.evt.clientX;
        this.contextMenuY = event.evt.pageY || event.evt.clientY;
        this.selectedSection = section;
      },
      /*     addSection(direction: 'left' | 'right', section: Section) {
            const index = this.ship.middle.findIndex((s) => s.id === section.id);
            const newSection: Section = {
              id: `${Date.now()}`, // This should be unique
              type: 'hatch', // Set the default type to 'hatch'
              position: direction === 'left' ? section.position - 110 : section.position + 110,
              hatchType: VesselHatchType.Blank
            };
      
            if (direction === 'left') {
              this.ship.middle.splice(index, 0, newSection);
            } else {
              this.ship.middle.splice(index + 1, 0, newSection);
            }
      
            this.showContextMenu = false;
          }, */
      deleteSection(section: Section) {
        this.showContextMenu = false;
        this.$store.dispatch({ type: DELETE_VESSEL_HATCH, id: this.selectedHatchData.id })
      },
      addSectionToRight(section: Section) {
        this.showContextMenu = false;
        this.$store.dispatch({ type: ADD_VESSEL_HATCH, position: "right" })
      },
      addSectionToLeft(section: Section) {
        this.showContextMenu = false;
        this.$store.dispatch({ type: ADD_VESSEL_HATCH, position: "left" })
      },
    },
    watch:{
  
    },
    computed: {
      vesselProfile() {
        
        const vesselProfile = this.$store.state.vesselProfile.vesselProfile
        setTimeout(() => this.$forceUpdate(), 10)
          return vesselProfile
      },
      vesselProfileHatches() {
        return this.vesselProfileHatches
      },
      ...mapGetters({
        selectedHatchData: 'getSelectedHatchData',
        // vesselProfile: 'getVesselProfile',
        vesselProfileHatches: 'getVesselProfileHatches'
      }),
  
      ...mapActions({
        setSelectedHatchIndex: SET_SELECTED_HATCH_INDEX,
        deleteVesselHatch: DELETE_VESSEL_HATCH
      }),
      headConfig() {
        return {
          x: 0,
          y: 150,
          width: TAIL_WIDTH,
          height: 200,
  image: this.sternImage,
        };
      },
      tailConfig() {
        return {
          x: (this.vesselProfileHatches.length ?? 0) * (SECTION_WIDTH) + TAIL_WIDTH,
          y: 120,
          width: TAIL_WIDTH,
          height: 212,
  image: this.bowImage,
        };
      },
  
      // get position of context menu
      style() {
        return {
          top: this.contextMenuY + 'px',
          left: this.contextMenuX + 'px',
        };
      },
    },
  
    created() {
  
      
  
    },
    
    
    mounted() {
      const sternImage = new window.Image();
      sternImage.src = 'media/svg/vesselProfile/Stern.svg';
      sternImage.onload = () => {
        // set image only when it is loaded
        this.sternImage = sternImage;
      };
      const bowImage = new window.Image();
      bowImage.src = 'media/svg/vesselProfile/Bow.svg';
      bowImage.onload = () => {
        // set image only when it is loaded
        this.bowImage = bowImage;
      };
      const bodyImage = new window.Image();
      bodyImage.src = 'media/svg/vesselProfile/Body.svg';
      bodyImage.onload = () => {
        // set image only when it is loaded
        this.bodyImage = bodyImage;
      };
      const cellImage = new window.Image();
      cellImage.src = 'media/svg/vesselProfile/Cell.svg';
      cellImage.onload = () => {
        // set image only when it is loaded
        this.cellImage = cellImage;
      };
  
      const fortyFootImage = new window.Image();
      fortyFootImage.src = 'media/svg/vesselProfile/Cell.svg';
      fortyFootImage.onload = () => {
        // set image only when it is loaded
        this.fortyFootImage = fortyFootImage;
      };
  
      
    },
  });
  </script>

<template>
    <div dir="rtl">
      <!-- <inline-svg src="media/svg/vesselProfile/Stern.svg" />
      <inline-svg src="media/svg/vesselProfile/Bow.svg" /> -->
  
      <div class="stage-wrapper">
        <v-stage
          :config="{ width: (this.vesselProfileHatches.length) * this.SECTION_WIDTH + 2 * TAIL_WIDTH, height: 400 }">
          <v-layer>
            <v-image :config="headConfig" :src="headImage" />
            <v-image :config="tailConfig" :src="tailImage" />
  
            <!-- <v-image :config="getTailConfig()" " /> -->
  
            <v-group v-for="(section, sectionIndex) in this.vesselProfileHatches" :key="section.id"
              :config="getSectionGroupConfig()">
              <!-- section -->
              <v-image :config="getSectionConfig(section, sectionIndex)"
                @contextmenu.prevent="this.handleRightClick(section, $event)" :key="section.id" />
  
              <v-text :config="getHatchForeLabelsConfig(section, sectionIndex)" :key="'section-label-fore' + section.id" />
              <v-text :config="getHatch40FootLabelsConfig(section, sectionIndex)" :key="'section-label-40' + section.id" />
              <v-text :config="getHatchAfterLabelsConfig(section, sectionIndex)"
                :key="'section-label-after' + section.id" />
  
  
              <!-- ondeck hatch  -->
              <v-rect :config="getOnDeckCellConfig(section, i, sectionIndex)" v-for="i in section.onDeckFore?.rows ?? 0"
                :key="section.id + 'onDeck' + i" />
  
              <!-- ondeck after hatch  -->
              <v-rect :config="getOnDeckAfterCellConfig(section, i, sectionIndex)"
                v-for="i in (section.onDeckAfter?.rows ?? 0)" :key="section.id + 'onDeckFore' + i" />
  
              <!-- underDeck hatch  -->
              <v-rect :config="getUnderDeckCellConfig(section, i, sectionIndex)" v-for="i in section.holdFore?.rows ?? 0"
                :key="section.id + 'underDeck' + i" />
  
              <!-- underDeck after hatch  -->
              <v-rect :config="getUnderDeckAfterCellConfig(section, i, sectionIndex)"
                v-for="i in section.holdAfter.rows ?? 0" :key="section.id + 'underDeckFore' + i" />
  
              <!-- bridge  -->
              <v-rect v-if="section.vesselHatchType === VesselHatchType.Bridge"
                :config="getDeckBridgeConfig(section, sectionIndex)" :key="section.id + 'bridge'" />
  
              <!-- engine  -->
              <v-rect v-if="section.vesselHatchType === VesselHatchType.Engine"
                :config="getDeckEngineConfig(section, sectionIndex)" :key="section.id + 'engine'" />
  
              <!-- crane  -->
              <v-rect v-if="section.vesselHatchType === VesselHatchType.Crane"
                :config="getDeckCraneConfig(section, sectionIndex)" :key="section.id + 'crane'" />
  
              <v-rect :id="'bg' + section.id" :config="getHighlightConfig(section, sectionIndex)"
                :key="section.id + 'highlight'" />
  
  
  
            </v-group>
            <!-- <v-image v-for="section in ship.middle" :key="section.id" :config="getSectionConfig(section)"
             /> -->
  
          </v-layer>
        </v-stage>
      </div>
      <div v-if="showContextMenu" class="context-menu" :style="style">
        <div class="context-menu-container">
          <button @click="addSectionToRight(selectedSection)">Add to right</button>
          <button @click="addSectionToLeft(selectedSection)">Add to left</button>
          <button @click="deleteSection(selectedSection)">Delete</button>
        </div>
      </div>
    </div>
  </template>
    
  
    
  <style>
  .context-menu {
    position: fixed;
    background: white;
    z-index: 999;
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    cursor: pointer;
  }
  
  .context-menu-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 5px;
  }
  
  .stage-wrapper {
    overflow-x: auto;
    /* display: flex; */
    margin: 0 auto;
    min-width: 100%;
    /* width: 100vh; */
  }
  </style>
    