import axios from "axios";
import { NextResponse } from "next/server";

type Body = {
  bvid?: string;
};

const VIDEO_INFO_URL = "https://api.bilibili.com/x/web-interface/view";

export async function POST(request: Request) {
  const { bvid = "" } = (await request.json()) as Body;
  const { data } = await axios.get(VIDEO_INFO_URL + `?bvid=${bvid}`);
  const {
    data: { title, desc, pic },
  } = data;
  return NextResponse.json({
    bvid,
    title,
    pic,
    desc,
  });
}
