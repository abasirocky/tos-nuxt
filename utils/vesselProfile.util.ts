import _ from 'lodash'

export function isBaySelectionValid(selectedHatchData) {
  if (
    selectedHatchData.hasBay40 &&
    ((selectedHatchData.hasBayFore && !selectedHatchData.hasBayAfter) ||
      (!selectedHatchData.hasBayFore && selectedHatchData.hasBayAfter))
  ) {
        useNuxtApp().$toast(
        "Invalid bay selection: fix bay selection before selecting another hatch"
      );
    return false;
  }

  if (
    selectedHatchData.hasBayAfter &&
    !selectedHatchData.hasBay40 &&
    !selectedHatchData.hasBayFore
  ) {
    if (
      selectedHatchData.hasBay40 &&
      ((selectedHatchData.hasBayFore && !selectedHatchData.hasBayAfter) ||
        (!selectedHatchData.hasBayFore && selectedHatchData.hasBayAfter))
    ) {
      useNuxtApp().$toast(
        "Invalid bay selection: fix bay selection before selecting another hatch"
      );
      return false;
    }

    if (
      selectedHatchData.hasBayAfter &&
      !selectedHatchData.hasBay40 &&
      !selectedHatchData.hasBayFore
    ) {
      useNuxtApp().$toast(
        "Invalid bay selection: fix bay selection before selecting another hatch"
      );
      return false;
    }

    return false;
  }
  return true;
}


export const reorderShipLabels = (vesselProfileHatches) => {
    let clonedVesselProfileHatches = _.cloneDeep(vesselProfileHatches);
    let start = 0;
  
    return clonedVesselProfileHatches.map(function (h, index) {
      if (h.hasBayFore) {
        h.bayFore = start + 1;
      } else {
        h.bayFore = 0;
      }
  
      if (h.hasBay40) {
        h.bay40 = start + 2;
      } else {
        h.bay40 = 0;
      }
  
      if (h.hasBayAfter) {
        h.bayAfter = start + 3;
      } else {
        h.bayAfter = 0;
      }
  
      if (!h.hasBayAfter && !h.hasBay40 && h.hasBayFore) {
        start += 2;
      } else {
        start += 4;
      }
      return h;
    });
  };