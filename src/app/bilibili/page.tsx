"use client";

import HistoryItem from "@/components/bilibili/HistoryItem";
import { BilibiliVideoInfo } from "@/types/bilibili";
import { getInfoWithBvid } from "@/utils/client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const BILIBILI_INFOLIST = "BILIBILI_INFOLIST";

const Bilibili = () => {
  const [inputValue, setInputValue] = useState("");
  const [infoList, setInfoList] = useState<BilibiliVideoInfo[]>([]);
  const saveInfoList = (data: BilibiliVideoInfo[]) => {
    setInfoList(data);
    localStorage.setItem(BILIBILI_INFOLIST, JSON.stringify(data || []));
  };
  const search = async () => {
    const res = await getInfoWithBvid(inputValue);
    if (res) {
      const index = infoList.map((i) => i.bvid).indexOf(res.bvid);
      if (index === -1) {
        // 如果列表中不存在就新增
        saveInfoList([...infoList, res]);
        return;
      }
      // 如果列表中存在则提到顶部
      const exist = infoList.splice(index, 1);
      saveInfoList([...exist, ...infoList]);
    }
  };
  const deleteItem = (item: BilibiliVideoInfo) => {
    const index = infoList.map((i) => i.bvid).indexOf(item.bvid);
    if (index !== -1) {
      infoList.splice(index, 1);
      saveInfoList([...infoList]);
    }
  };
  useEffect(() => {
    try {
      setInfoList(JSON.parse(localStorage.getItem(BILIBILI_INFOLIST) || "[]"));
    } catch {
      setInfoList([]);
    }
  }, []);
  return (
    <main className="flex flex-col text-sm text-black-88">
      <div className="pb-16 pt-4 px-4">
        <Card>
          <CardHeader className="gap-x-2">
            <span>历史记录</span>
            {infoList.length ? (
              <span className="text-xs text-black-45">所有内容保存在本地</span>
            ) : null}
          </CardHeader>
          <Divider />
          <CardBody className="gap-y-2">
            {!infoList.length ? (
              <div className="h-28 w-full flex items-center justify-center text-lg font-bold">
                暂无记录
              </div>
            ) : (
              infoList.map((i) => {
                return (
                  <HistoryItem key={i.bvid} item={i} onDelete={deleteItem} />
                );
              })
            )}
          </CardBody>
        </Card>
      </div>
      <div className="fixed bottom-0 left-0  w-full bg-white flex items-center h-14 px-2 gap-x-2 shadow">
        <Input
          placeholder="可以输入带bvid的链接进行查找"
          value={inputValue}
          onValueChange={setInputValue}
          isClearable
        />
        <Button color="primary" onPress={search}>
          查找
        </Button>
      </div>
    </main>
  );
};

export default Bilibili;
