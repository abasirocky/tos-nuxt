export interface Cell {
    existed: boolean;
    isReefer: boolean;
    is45Foot: boolean;
  }
  
  export interface OnDeckFore {
    rows: number;
    cols: number;
    cells: Cell[];
  }
  
  export enum VesselHatchType {
    Hatch = 1,
    Bridge = 2,
    Engine = 3,
    Crane = 4,
    Blank = 5,
  }
  
  export interface OnDeckAfter {
    rows: number;
    cols: number;
    cells: Cell[];
  }
  
  export interface OnDeck40 {
    rows: number;
    cols: number;
    cells: Cell[];
  }
  
  export interface HoldFore {
    rows: number;
    cols: number;
    cells: Cell[];
  }
  
  export interface HoldAfter {
    rows: number;
    cols: number;
    cells: Cell[];
  }
  
  export interface Hold40 {
    rows: number;
    cols: number;
    cells: Cell[];
  }
  
  export interface VesselProfileHatch {
    id: number;
    vesselHatchType: number;
    sequence: number;
    minHoldTiers: number;
    maxHoldTiers: number;
    holdRows: number;
    minDeckTiers: number;
    maxDeckTiers: number;
    deckRows: number;
    hasBayFore: boolean;
    hasBayAfter: boolean;
    hasBay40: boolean;
    bayFore: number;
    bayAfter: number;
    bay40: number;
    onDeckFore: OnDeckFore;
    onDeckAfter: OnDeckAfter;
    onDeck40: OnDeck40;
    holdFore: HoldFore;
    holdAfter: HoldAfter;
    hold40: Hold40;
  }
  
  export interface VesselProfileData {
    vesselProfileId: number;
    vesselProfileName: string;
    vesselProfileHatches: VesselProfileHatch[];
  }
  
  export interface Message {
    messageText: string;
    messageType: number;
  }
  
  export interface VesselProfileResponse {
    data: VesselProfileData;
    isSuccessful: boolean;
    tag?: any;
    message: Message[];
  }
  
  type State = {
    isLoading: boolean;
    vesselProfile: VesselProfileData;
    vesselProfileHatches: VesselProfileHatch[]
    selectedHatchIndex: number;
    selectedHatchData: VesselProfileHatch;
    vesselProfileId: number;
    mirroredBays: {
      "Fore": boolean,
      "40": boolean
      "After": boolean
    };
    vesselProfileList: VesselProfileHatch[];
    message: Message[];
    errors: Error[];
    totalItems: number;
  };


  const initialVesselProfile: VesselProfileData = {
    vesselProfileId: 0,
    vesselProfileName: "Default Name",
    vesselProfileHatches: [
      {
        id: 0,
        vesselHatchType: 1,
        sequence: 1,
        minHoldTiers: 4,
        maxHoldTiers: 4,
        holdRows: 4,
        minDeckTiers: 12,
        maxDeckTiers: 88,
        deckRows: 10,
        hasBayFore: false,
        hasBayAfter: false,
        hasBay40: false,
        bayFore: 1,
        bayAfter: 2,
        bay40: 3,
        onDeckFore: {
          cols: 4,
          rows: 4,
          cells: [{ existed: true, isReefer: true, is45Foot: false }],
        },
        onDeckAfter: {
          cols: 4,
          rows: 4,
          cells: [{ existed: true, isReefer: true, is45Foot: false }],
        },
        onDeck40: {
          cols: 4,
          rows: 4,
          cells: [{ existed: true, isReefer: true, is45Foot: false }],
        },
        holdFore: {
          cols: 4,
          rows: 4,
          cells: [{ existed: true, isReefer: true, is45Foot: false }],
        },
        holdAfter: {
          cols: 4,
          rows: 4,
          cells: [{ existed: true, isReefer: true, is45Foot: false }],
        },
        hold40: {
          cols: 4,
          rows: 4,
          cells: [{ existed: true, isReefer: true, is45Foot: false }],
        },
      },
    ],
  };

  const reorderLabels = vesselProfileHatches => {
    let clonedVesselProfileHatches = _.cloneDeep(vesselProfileHatches)
    let start = 0
  
    return clonedVesselProfileHatches.map(function (h, index){
      if(h.hasBayFore) {
        h.bayFore = start + 1
      } else {
        h.bayFore = 0
      }
  
      if(h.hasBay40) {
        h.bay40 = start + 2
      } else {
        h.bay40 = 0
      }
  
      if(h.hasBayAfter) {
        h.bayAfter = start + 3
      } else {
        h.bayAfter = 0
      }
  
      if(!h.hasBayAfter && !h.hasBay40 && h.hasBayFore) {
        start += 2
      } else {
        start += 4
      }
      return h
    })
  }



  export const useVesselProfileStore = defineStore('vesselProfile', {
    state: () => ({
        isLoading: false,
        vesselProfile: initialVesselProfile,
        selectedHatchData: initialVesselProfile.vesselProfileHatches[0],
        vesselProfileHatches: initialVesselProfile.vesselProfileHatches,
        selectedHatchIndex: 0,
        vesselProfileId: 0,
        errors: [],
        mirroredBays: {
          Fore: false,
          "40": false,
          After: false,
        },
        totalItems: 0,
        vesselProfileList: [],
        message: [],
      }),
        getters: {
        getIsLoading(state: State) {
          return state.isLoading
        },
        getSelectedHatchData(state: State) {
          
          return state.selectedHatchData
        },
        getVesselProfileHatches(state: State) {
          
          return state.vesselProfileHatches
        },
        getVesselProfileList(state: State) {
          return state.totalItems;
        },
        getVesselProfile(state: State) {
          
          return state.vesselProfile;
        },
        getSelectedVesselProfile(state: State) {
          return state.selectedHatchIndex;
        },
        getSelectedHatchIndex(state: State) {
          return state.selectedHatchIndex;
        },
      },
    actions: {
        setIsLoading(context, payload) {
          context.commit('mutateIsLoading', payload)
        },
        deleteVesselHatch(context, payload) {
          const id = payload.id

          this.$state.vesselProfile.vesselProfileHatches = this.$state.vesselProfile.vesselProfileHatches.filter((h, index) => {
            return index !== this.$state.selectedHatchIndex
          })
          let reorderedProfileHatches = reorderLabels(this.$state.vesselProfile.vesselProfileHatches)
          this.$state.vesselProfile.vesselProfileHatches = reorderedProfileHatches
          this.$state.vesselProfileHatches = reorderedProfileHatches
        },
        postVesselProfile({state, commit, dispatch}: {state: State, commit: any, dispatch: any}, body) {
          return new Promise(resolve => {
            ApiService.setHeader();
            if (!isBaySelectionValid(this.$state.selectedHatchData)) {
              return
            }
            commit('mutateIsLoading', true)
            const response = ApiService.post("/system/vesselprofile/updatehatchdesign", this.$state.vesselProfile)
            .then((data) => {
              if (data.data.isSuccessful) {
                Vue.$toast.open({
                  message: data.data.message[0].messageText,
                  type: "success",
                  position: "top",
                });
                dispatch(FETCH_VESSEL_PROFILE)
              } else {
                commit('mutateIsLoading', false)
      
                Vue.$toast.open({
                  message: data.data.message[0].messageText,
                  type: "error",
                  position: "top",
                });
              }
              return response 
            })
              .finally(() => {
                commit('mutateIsLoading', false)
              })
          });
        },
        setMirroredBays(context, payload) {
          context.commit('setMirroredBaysMutation', payload)
        },
      
        toggleCellProperty({ commit, state }: { commit: any, state: State }, { hatchIndex, deckPosition, bayType, cellIndex, property, currentValue }: { hatchIndex: number, deckPosition: string, bayType: string, cellIndex: number, property: string, currentValue: any }) {
      
      
          // if the clicked bay isn't mirrored only apply changed on itself
          if (!this.$state.mirroredBays[bayType]) {
            commit(TOGGLE_CELL_PROPERTIES, { hatchIndex, deckPosition, bayType: bayType, cellIndex, property, value: !currentValue });
            return
          }
          
          for (const key in this.$state.mirroredBays) {
            const currentBayType = key
            const isCurrentBayMirrored = this.$state.mirroredBays[key]
          
            if (isCurrentBayMirrored){
              commit(TOGGLE_CELL_PROPERTIES, { hatchIndex, deckPosition, bayType: currentBayType, cellIndex, property, value: !currentValue });
            }
          }
          // commit(TOGGLE_CELL_PROPERTIES, { hatchIndex, deckType, cellIndex, property });
          // commit(TOGGLE_CELL_PROPERTIES, { hatchIndex, deckType: deckType, cellIndex, property });
          // TODO set selected hatch data with new changes
        },
        
        setSelectedHatchData(context, payload) {
          
          context.commit("mutateSelectedHatchData", payload);
        },
        setSelectedHatchCells(context, payload) {
          context.commit("mutateSelectedHatchData", payload);
        },
        [FETCH_VESSEL_PROFILE]: async (
          context,
          payload
        ): Promise<VesselProfileResponse> => {
          if(payload) {
            context.commit('setVesselProfileId', payload)
          } 
          return new Promise((resolve, body) => {
            ApiService.setHeader();
            context.commit('mutateIsLoading', true)
            ApiService.post("/system/vesselprofile/gethatchdesignupdate", {
              vesselProfileId: context.this.$state.vesselProfileId ? context.this.$state.vesselProfileId : payload,
            })
              .then(({ data }) => {
      
                if (data.isSuccessful) {
                  context.commit(SET_VESSEL_PROFILE, data);
                }
      
                resolve(data);
              })
              .catch(({ response }) => {
                context.commit(SET_VESSEL_PROFILE_ERROR, response.data.errors);
              })
              .finally(() => {
                context.commit('mutateIsLoading', false)
              })
          });
        },
        [SET_SELECTED_HATCH_INDEX]: ({commit, state} : {commit: any, state: State}, payload) => {
          // commit('updateVesselProfile')
          const { index } = payload;
      
      
      
          if(!isBaySelectionValid(this.$state.selectedHatchData)) {
            return
          }
          
          
          commit(MUTATE_SELECTED_HATCH_INDEX, index)
          // commit('mutateSelectedHatchData', this.$state.vesselProfile.vesselProfileHatches[index]) 
          
        },
      
        [UPDATE_VESSEL_PROFILE]: async (
          context,
          payload
        ): Promise<VesselProfileResponse> => {
          return new Promise((resolve, body) => {
            ApiService.setHeader();
            ApiService.post("/system/vesselprofile/gethatchdesignupdate", {
              vesselProfileId: payload,
            })
              .then(({ data }) => {
                if (data.isSuccessful){
                  context.commit(SET_VESSEL_PROFILE, data);
                }
      
                resolve(data);
              })
              .catch(({ response }) => {
                context.commit(SET_VESSEL_PROFILE_ERROR, response.data.errors);
              });
          });
        },
      }
  })