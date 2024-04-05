"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";

const Bilibili = () => {
  return (
    <main className="flex flex-col text-sm text-black-88">
      <div className="pb-16 pt-4 px-4">
        <Card>
          <CardHeader>历史记录</CardHeader>
          <Divider />
          <CardBody></CardBody>
        </Card>
      </div>
      <div className="fixed bottom-0 left-0  w-full bg-white flex items-center h-14 px-2 gap-x-2 shadow">
        <Input />
        <Button color="primary">查找</Button>
      </div>
    </main>
  );
};

export default Bilibili;
