import { useVesselProfileStore } from "~/stores/VesselProfile.store";
import axiosInstance from "./baseApi";

export async function getVesselProfile() {
  const res = await axiosInstance.post("/system/vesselprofile/gethatchdesignupdate", {
    vesselProfileId: 1,
  });

  return res.data
}


export async function updateVesselProfile(newVesselProfileData) {
  const res = await axiosInstance.post("/system/vesselprofile/updatehatchdesign", newVesselProfileData)

  return res.data
}