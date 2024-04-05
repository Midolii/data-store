"use client";
import { BilibiliVideoInfo } from "@/types/bilibili";
import axios from "axios";

const BVID_PERFIX = "BV1";
const BVID_LENGTH = 12;
export const sliceBvidFromStr = (keyWorkd: string) => {
  const index = keyWorkd.indexOf(BVID_PERFIX);
  if (index === -1) {
    return "";
  }
  return keyWorkd.slice(index, index + BVID_LENGTH);
};

export const getInfoWithBvid = async (inputValue: string) => {
  const bvid = sliceBvidFromStr(inputValue);
  if (!bvid) {
    return;
  }
  const { data } = await axios.post<BilibiliVideoInfo>("/api/bilibili", {
    bvid,
  });
  return data;
};
