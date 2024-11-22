"use client";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "@/app/components/TagList";
import MdViewer from "@/app/components/MdViewer";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";
import "./index.css";

interface Props {
  question: API.QuestionBankVO;
}

/**
 * 题目卡片
 * @param props
 * @constructor
 */
const QuestionCard = (props: Props) => {
  const { question } = props;
  useAddUserSignInRecord();
  return (
    <div className="question-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {question.title}
        </Title>
        <TagList tagList={question.tagList}></TagList>
        <div style={{ marginBottom: 16 }}></div>
        <MdViewer value={question.content} />
      </Card>
      <Card title="推荐答案">
        <MdViewer value={question.answer}></MdViewer>
      </Card>
    </div>
  );
};

export default QuestionCard;
