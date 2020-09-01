//we have roles out of the permission system
//we just map roles by permissions
//this mapping could save in variable or local storage
export const PermissionMapping: { [key: string]: string[] } = {
  //some one who has one of the roles
  //"permission1":["role1","role2"]
  "admin": ["Administrator"],
  "contentManager": ["ContentManager"],
}
