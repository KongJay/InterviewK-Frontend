"use server";
import "./index.css";
import Title from "antd/es/typography/Title";
import { Avatar, Button, Card, Flex, Menu } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionList from "@/app/components/QuestionList";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import QuestionCard from "@/app/components/QuestionCard";
import Link from "next/link";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;
  let bank = undefined;
  try {
    const res = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = res.data;
  } catch (e: any) {
    /*message.error("获取题库列表失败，" + e.message);*/
  }
  if (!bank) {
    return <div>获取题库详情失败，请刷新重试</div>;
  }
  const total = bank.questionPage.total;

  let question = undefined;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e: any) {
    /*message.error("获取题目详情失败，请刷新重试" + e.message);*/
  }
  if (!question) {
    return <div>获取题目详情失败，请刷新重试</div>;
  }
  const questionMenuItemList = (bank.questionPage.records || []).map((q) => {
    return {
      label: (
        <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>
      ),
      key: q.id,
    };
  });
  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: " 24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[question.id]}></Menu>
        </Sider>
        <Content>
          <QuestionCard question={question}></QuestionCard>
        </Content>
      </Flex>
    </div>
  );
}
