"use client";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/app/components/TagList";
import { TablePaginationConfig } from "antd";

interface Props {
  //默认值用于展示服务端渲染的数据
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
}

/**
 * 题目表格组件
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const { defaultQuestionList, defaultTotal } = props;
  const actionRef = useRef<ActionType>();
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  //用于判断是否是第一次访问
  const [init,setInit] = useState<boolean>(true);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <TagList tagList={tagList}></TagList>;
      },
    },
  ];


  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
        }}
        dataSource = {questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total) => `总共 ${total}条`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          if(init){
            setInit(false);
            if(defaultQuestionList && defaultTotal){
              return;
            }
          }
          const sortField = Object.keys(sort)?.[0] || 'createTime';
          const sortOrder = sort?.[sortField] || 'descend';

          const { data, code } = await listQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);
          //更新结果
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          //更新状态
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;