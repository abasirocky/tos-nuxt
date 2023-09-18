import _ from "lodash";
import { updateVesselProfile } from "~/api/vesselProfile.api";
import {
  isBaySelectionValid,
  reorderShipLabels,
} from "~/utils/vesselProfile.util";

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
  vesselProfileHatches: VesselProfileHatch[];
  selectedHatchIndex: number;
  selectedHatchData: VesselProfileHatch;
  vesselProfileId: number;
  mirroredBays: {
    Fore: boolean;
    "40": boolean;
    After: boolean;
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

export const useVesselProfileStore = defineStore("vesselProfile", () => {
  // states
  const isLoading = ref(false);
  const vesselProfile = ref(initialVesselProfile);
  const selectedHatchData = ref(initialVesselProfile.vesselProfileHatches[0]);
  const vesselProfileHatches = ref(initialVesselProfile.vesselProfileHatches);
  const selectedHatchIndex = ref(0);
  const vesselProfileId = ref(0);
  const mirroredBays = ref({
    Fore: false,
    "40": false,
    After: false,
  });

  // getters
  const getIsLoading = () => {
    return isLoading.value;
  };
  const getSelectedHatchData = () => {
    return selectedHatchData.value;
  };
  const getVesselProfileHatches = () => {
    return vesselProfileHatches.value;
  };
  const getVesselProfile = () => {
    return vesselProfile.value;
  };
  const getSelectedVesselProfile = () => {
    return selectedHatchIndex;
  };

  // actions
  const fetchVesselProfile = async (id) => {
    if (id) vesselProfileId.value = id;



    return new Promise((resolve, body) => {
      setIsLoading(true)

      updateVesselProfile({
        vesselProfileId: id ?  id : vesselProfileId.value,
      } )
        .then(({ data }) => {

          if (data.isSuccessful) {
            // set vessel profile
          }

          resolve(data);
        })
        .catch(({ response }) => {

        })
        .finally(() => {
          setIsLoading(false)
        })
    });
  };

  const postVesselProfile = (payload) => {
    if (!isBaySelectionValid(selectedHatchData.value)) {
      return;
    }
    isLoading.value = true;

  };
  const setIsLoading = (newState: boolean) => {
    isLoading.value = newState;
  };
  const deleteVesselHatch = (payload) => {
    vesselProfile.value.vesselProfileHatches =
      vesselProfile.value.vesselProfileHatches.filter((h, index) => {
        return index !== selectedHatchIndex.value;
      });
    let reorderedProfileHatches = reorderShipLabels(
      vesselProfile.value.vesselProfileHatches
    );
    vesselProfile.value.vesselProfileHatches = reorderedProfileHatches;
    vesselProfileHatches.value = reorderedProfileHatches;
  };

  return {
    isLoading,
    vesselProfile,
    selectedHatchData,
    vesselProfileHatches,
    selectedHatchIndex,
    vesselProfileId,
    mirroredBays,
  };
});
