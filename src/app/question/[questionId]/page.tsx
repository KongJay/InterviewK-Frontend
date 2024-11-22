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
 * 题目详情页
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;


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

  return (
    <div id="questionPage">
      <QuestionCard question={question}></QuestionCard>
    </div>
  );
}
