import {useCallback, useEffect} from "react";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";
import {findAllMenuItemByPath, findMenuItemByPath} from "../../config/menu";
import AccessEmun from "@/access/accessEmun";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";

/**
 * 统一权限校验拦截器
* @param children
* @constructor
*/
const AccessLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) => {
    const pathname = usePathname();
    const loginUser = useSelector((state:RootState) => state.loginUser);
    const menu = findAllMenuItemByPath(pathname);
    const needAccess = menu?.access ?? AccessEmun.NOT_LOGIN;
    const canAccess = checkAccess(loginUser,needAccess);
    if(!canAccess){
        <Forbidden></Forbidden>
    }
    return children;
};
export default AccessLayout;