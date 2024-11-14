"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import React from "react";
import Link from "next/link";
import {userLoginUsingPost, userRegisterUsingPost} from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";

import { setLoginUser } from "@/stores/loginUser";
import { ProForm } from "@ant-design/pro-form/lib";
import { useRouter } from "next/navigation";

type LoginType = "phone" | "account";

/**
 * 用户注册页面
 * @constructor
 */
const UserRegisterPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功，请登录");
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e:any) {

      message.error("注册失败" + e.message);
    }
  };
  return (
    <ProConfigProvider hashed={false}>
      <div id="userRegisterPage">
        <LoginForm
          form={form}
          logo="https://github.githubassets.com/favicons/favicon.png"
          title="Java面试-用户注册"
          subTitle="程序员面试刷题网站"
          onFinish={doSubmit}
          submitter={{
            searchConfig:{
              submitText:"注册"
            }
          }}
        >
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
            }}
            placeholder={"请输入用户账号"}
            rules={[
              {
                required: true,
                message: "请输入用户账号！",
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"请输入密码"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
          <ProFormText.Password
              name="checkPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={"请输入确认密码"}
              rules={[
                {
                  required: true,
                  message: "请输入确认密码！",
                },
              ]}
          />
          <div
            style={{
              marginBlockEnd: 24,
              textAlign: "end",
            }}
          >
            已有帐号去登录
            <Link href={"/user/login"}>去登录</Link>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
export default UserRegisterPage;