import { MenuDataItem } from "@ant-design/pro-layout";
import { CrownOutlined } from "@ant-design/icons";
import ACCESS_EMUN from "@/access/accessEmun";
import exp from "constants";

// 菜单列表
const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    name: "面试鸭",
    path: "https://mianshiya.com",
    target: "_blank",
  },
  {
    path: "/admin",
    name: "管理",
    access:ACCESS_EMUN.ADMIN,
    icon: <CrownOutlined />,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access:ACCESS_EMUN.ADMIN
      },
    ],
  },
] as MenuDataItem[];

// 导出
export default menus;

export const findAllMenuItemByPath = (path:string):MenuDataItem | null =>{
    return findMenuItemByPath(menus,path);
};
export const findMenuItemByPath = (menus:MenuDataItem[],path:string):MenuDataItem | null =>{
    for(const menu of menus){
      if(menu.path === path){
        return menu;
      }
      if(menu.children){
        const matchedMenuItem = findMenuItemByPath(menu.children,path);
        if(matchedMenuItem){
          return matchedMenuItem;
        }
      }
    }
      return null;
}