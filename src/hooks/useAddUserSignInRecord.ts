import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import { useEffect, useState } from "react";
import { addUserSignInsUsingPost } from "@/api/userController";
import { message } from "antd";

/**
 * Markdown 添加用户刷题记录钩子
 * @constructor
 */
const UseAddUserSignInRecord = () => {
  const [loading, setLoading] = useState<boolean>(false);
  //请求后端执行签到
  const doFetch = async () => {
    setLoading(true);
    try {
      await addUserSignInsUsingPost({});
    } catch (e: any) {
      message.error("获取刷题签到记录失败" + e.message);
    }finally {
      setLoading(false);
    }

  };
  //保证只会调用一次
  useEffect(() => {
    doFetch();
  }, []);
  return { loading };
};

export default UseAddUserSignInRecord;
