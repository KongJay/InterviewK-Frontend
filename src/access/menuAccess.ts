
import menus from "../../config/menu";
import CheckAccess from "@/access/checkAccess";

/**
 * 获取有权限、可访问的菜单
 * @param loginUser
 * @param menuItems
 */
const getAccessibleMenus = (loginUser:API.LoginUserVO,menuItems=menus) =>{
        return menuItems.filter((item) =>{
            if(!CheckAccess(loginUser,item.access)){
                return false;
            }
            if(item.children){
                item.children = getAccessibleMenus(loginUser,item.children);
            }
            return true;
    })
}
export default getAccessibleMenus;