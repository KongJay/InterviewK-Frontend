"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import AccessLayout from "@/access/AccessLayout";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUser";
import ACCESS_EMUN from "@/access/accessEmun";

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {

    } else {
      /* setTimeout(() =>{
         const testUser = {
           userName:"测试登录",
           id:1,
           userAvatar: "http://www.code-nav.com/logo.png",
           userRole:ACCESS_EMUN.ADMIN
         };
         dispatch(setLoginUser(testUser));
       },3000)
     }
   }, []);
   useEffect(() => {
    doInitLoginUser;
   }, []);
   return children;*/
    }
    ;
    export default function RootLayout({
                                         children,
                                       }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
          <html lang="zh">
          <body>
          <AntdRegistry>
            <Provider store={store}>
              <InitLayout>
                <BasicLayout>
                  <AccessLayout>{children}</AccessLayout>
                </BasicLayout>
              </InitLayout>
            </Provider>
          </AntdRegistry>
          </body>
          </html>
      );
    }
  }