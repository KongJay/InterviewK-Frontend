"use server";
import "./index.css";
import Title from "antd/es/typography/Title";
import { Avatar, Button, Card } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import QuestionList from "../../components/QuestionList";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";

/**
 * 题库详情页
 * @constructor
 */
export default async function BankPage({ params }) {
  const { questionBankId } = params;
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
  let firstQuestionId;
  if (bank.questionPage?.records && bank.questionPage.records.length > 0) {
    firstQuestionId = bank.questionPage.records[0].id;
  }
  return (
    <div id="bankPage" className="max-width-content">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title level={3} style={{ marginBottom: 0 }}>
              {bank.title}
            </Title>
          }
          description={
            <>
              <Paragraph type="secondary">{bank.description}</Paragraph>
              <Button
                type="primary"
                shape="round"
                href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                target="_blank"
                disabled={!firstQuestionId}
              >
                开始刷题
              </Button>
            </>
          }
        />
      </Card>
      <div style={{ marginBottom: 16 }}></div>
      <QuestionList
        questionBankId={questionBankId}
        questionList={bank.questionPage?.records ?? []}
        cardTitle={`题库列表 ${total ?? 0}`}
      ></QuestionList>
    </div>
  );
}
