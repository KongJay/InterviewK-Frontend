"use client";
import "./index.css";
import { Avatar, Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";
import CalendarChart from "@/app/user/center/components/CalendarChart";

/**
 * 用户中心页面
 * @constructor
 */
export default function UserCenterPage() {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const user = loginUser;
  const [activeTabKey, setActiveTabKey] = useState<string>("record");
  return (
    <div id="userCenterPage" className="max-width-content">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card style={{ textAlign: "center" }}>
            <Avatar src={user.userAvatar} size={72}></Avatar>
            <div style={{ marginBottom: 16 }}></div>
            <Card.Meta
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  {user.userName}
                </Title>
              }
              description={
                <Paragraph type="secondary">{user.userProfile}</Paragraph>
              }
            ></Card.Meta>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "other",
                label: "其他",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          >
            {activeTabKey === "record" && (
              <>
                <CalendarChart></CalendarChart>
              </>
            )}
            {activeTabKey === "other" && <>bbb</>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
