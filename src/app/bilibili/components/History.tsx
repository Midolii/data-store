"use client";

import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  ScrollShadow,
  Image,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export type VideoInfoType = {
  title: string;
  pic: string;
  desc: string;
  bvid: string;
};

interface HistoryProps {
  title: string;
  itemList: VideoInfoType[];
  existItem?: VideoInfoType;
  searchItemBvid?: string;
}

export const History: React.FC<HistoryProps> = (props) => {
  const { title, itemList, existItem, searchItemBvid } = props;
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [currentItem, setCurrentItem] = useState<
    VideoInfoType & { currentItemHeight?: number }
  >();
  const content = useRef<HTMLDivElement>(null);
  const imageRefs: HTMLDivElement[] = [];
  const handleItem = (item: VideoInfoType, index: number) => {
    const currentItemHeight = Math.ceil(
      imageRefs[index].getClientRects()[0].height
    );
    setCurrentItem({
      ...item,
      currentItemHeight,
    });
  };
  useEffect(() => {
    if (content.current) {
      setImageWidth(content.current.getClientRects()[0].width);
      setImageHeight((content.current.getClientRects()[0].width / 1920) * 1080);
    }
  }, [content]);
  useEffect(() => {
    const exist = itemList.find((i) => i.bvid === searchItemBvid);
    if (exist) {
      setCurrentItem(exist);
    }
  }, [searchItemBvid, itemList]);
  return (
    <div className="flex-1 flex flex-col w-full h-full justify-end gap-y-4">
      <div
        className={`w-full grid duration-300 min-h-0 ${
          currentItem ? "opacity-100" : "opacity-0"
        }`}
        style={{
          gridTemplateColumns: currentItem ? "1fr" : "0",
        }}
      >
        <Card>
          <CardHeader>{currentItem?.title}</CardHeader>
          <Divider />
          <CardBody className="whitespace-pre-line">
            {currentItem?.desc}
          </CardBody>
          <Divider />
        </Card>
      </div>
      <Card>
        <CardHeader>{title}</CardHeader>
        <Divider />
        <CardBody>
          <ScrollShadow
            size={16}
            className="duration-300"
            style={{
              maxHeight: currentItem ? "300px" : "calc(100vh - 12rem)",
            }}
          >
            <div ref={content} className="flex flex-col min-h-20">
              {!itemList.length && (
                <div className="flex-1 w-full flex items-center justify-center font-semibold text-black-45">
                  暂无数据
                </div>
              )}
              {itemList.map((i, index) => {
                return (
                  <div
                    ref={(r) => {
                      if (r) {
                        imageRefs[index] = r;
                      }
                    }}
                    className="p-2"
                    key={JSON.stringify(i)}
                  >
                    <Image
                      className={`duration-300 outline outline-offset-2 ${
                        existItem?.title === i.title
                          ? "outline-2 outline-blue-500"
                          : "outline-transparent"
                      }`}
                      width={imageWidth}
                      height={imageHeight}
                      alt={i.title}
                      src={i.pic}
                      onClick={() => {
                        handleItem(i, index);
                      }}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                );
              })}
            </div>
          </ScrollShadow>
        </CardBody>
      </Card>
    </div>
  );
};
