import ACCESS_EMUN from "@/access/accessEmun";

/**
 * 检查权限
 * @param loginUser
 * @param needAccess
 * @return 有无权限
 */
const checkAccess = (
  loginUser: API.LoginUserVO,
  needAccess = ACCESS_EMUN.NOT_LOGIN,
) => {
    const loginUserAccess = loginUser?.userRole ?? ACCESS_EMUN.NOT_LOGIN;
    if(needAccess === ACCESS_EMUN.NOT_LOGIN){
        return true;
    }
    //如果需要登录才能访问
    if(needAccess === ACCESS_EMUN.USER){
        if(loginUserAccess === ACCESS_EMUN.NOT_LOGIN){
            return false;
        }
        return true;
    }
    //如果需要管理员权限才能访问
    if(needAccess === ACCESS_EMUN.ADMIN){
        if(loginUserAccess !== ACCESS_EMUN.USER){
            return false;
        }
        return true;
    }
};
export default checkAccess;