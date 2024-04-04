"use client";
import { Button, Input } from "@nextui-org/react";
import { History, VideoInfoType } from "./components/History";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const placeholder = "复制视频分享链接到此处";
  const cardTitle = "查询记录";
  const size: "sm" | "md" | "lg" = "sm";
  const [itemList, setItemList] = useState<VideoInfoType[]>([]);
  const [value, setValue] = useState("");
  const [existItem, setExistItem] = useState<VideoInfoType>();
  const [searchItemBvid, setSearchItemBvid] = useState("");

  const onSearchBtnPress = async () => {
    const start = value.indexOf("BV1");
    if (start === -1) {
      return;
    }
    const bvid = value.slice(start, start + 12);
    const exist = itemList.find((i) => i.bvid === bvid);
    if (exist) {
      setExistItem(exist);
      setSearchItemBvid(exist.bvid);
      setTimeout(() => {
        setExistItem(undefined);
      }, 2000);
      return;
    }
    const { data } = await axios.post<VideoInfoType>(`/api/bilibili`, {
      bvid,
    });
    if (data && data.title) {
      setItemList([...itemList, data]);
      setSearchItemBvid(data.bvid);
      return;
    }
  };

  return (
    <main className="flex min-h-screen flex-col text-sm text-black-88">
      {/* 内容区域 */}
      <div className="overflow-auto pb-20 p-4 flex flex-col flex-1 items-end w-full">
        <History
          title={cardTitle}
          itemList={itemList}
          existItem={existItem}
          searchItemBvid={searchItemBvid}
        />
      </div>
      {/* 搜索框 */}
      <div className="fixed bottom-0 left-0 w-full bg-white px-4 h-14 shadow items-center flex">
        <div className="flex-1 relative h-full py-3">
          <Input
            size={size}
            placeholder={placeholder}
            isClearable
            value={value}
            onValueChange={setValue}
          />
        </div>
        <Button
          className="ml-4"
          size={size}
          color="primary"
          onPress={() => {
            onSearchBtnPress();
          }}
        >
          查询
        </Button>
      </div>
    </main>
  );
}
