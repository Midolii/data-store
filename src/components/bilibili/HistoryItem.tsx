import { BilibiliVideoInfo } from "@/types/bilibili";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import classNames from "classnames";
import { HTMLAttributes } from "react";

interface HistoryItemProps {
  item: BilibiliVideoInfo;
  onPress?: (item: BilibiliVideoInfo) => void;
  onDelete?: (item: BilibiliVideoInfo) => void;
}

const HistoryItem: React.FC<
  HistoryItemProps & HTMLAttributes<HTMLDivElement>
> = ({ item, className, onPress, onDelete }) => {
  return (
    <Popover placement="bottom" backdrop="opaque">
      <PopoverTrigger>
        <Button
          className={classNames(
            "flex items-center gap-x-2 h-14 rounded overflow-hidden bg-zinc-100 px-1",
            className
          )}
          onPress={() => {
            if (onPress) {
              onPress(item);
            }
          }}
        >
          <Image
            className="shrink-0 h-12 w-[4.5rem] object-cover"
            radius="sm"
            alt={item.title}
            src={item.pic}
            height={48}
            width={72}
          />
          <span className="flex-1 text-ellipsis min-w-0 whitespace-nowrap overflow-hidden mr-4">
            {item.title || "-"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 mb-6">
        <Card className="w-[calc(100vw-4rem)]">
          <CardHeader>
            <p className="font-semibold text-lg whitespace-pre-line">
              {item.title}
            </p>
          </CardHeader>
          <Divider />
          <CardBody className="gap-y-4">
            <Image
              className="shrink-0"
              radius="sm"
              alt={item.title}
              src={item.pic}
              height={200}
            />
            <div className="whitespace-pre-line">
              <p className="w-full text-center">【{item.bvid}】</p>
              <p className="font-semibold mt-2">视频简介：</p>
              <p>{item.desc}</p>
            </div>
            <Button
              size="sm"
              color="danger"
              onPress={() => {
                if (onDelete) {
                  onDelete(item);
                }
                return;
              }}
            >
              删除记录
            </Button>
          </CardBody>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default HistoryItem;
