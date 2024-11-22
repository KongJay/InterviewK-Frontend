"use server";
import "./index.css";
import Title from "antd/es/typography/Title";
import { Divider, Flex, message } from "antd";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "@/app/components/QuestionBankList";
import QuestionList from "../components/QuestionList";

/**
 * 题库页
 * @constructor
 */
export default async function BankPage() {
  let questionBankList = [];
  const pageSize = 200;
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = res.data.records ?? [];
  } catch (e: any) {
    message.error("获取题库列表失败，" + e.message);
  }
  return (
    <div id="bankPage" className="max-width-content">
      <Title level={3}>题库大全</Title>

      <QuestionBankList questionBankList={questionBankList}></QuestionBankList>
    </div>
  );
}
