import axiosInstance from "./baseApi";

export async function getVesselProfile() {
  const res = await axiosInstance.post("/system/vesselprofile/gethatchdesignupdate", {
    vesselProfileId: 1,
  });

  return res.data
}
