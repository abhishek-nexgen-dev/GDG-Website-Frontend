export const Event_Permissions = {
  CREATE_EVENT: "event:create",
  VIEW_EVENT: "event:view",
  UPDATE_EVENT: "event:update",
  DELETE_EVENT: "event:delete",
  ARCHIVE_EVENT: "event:archive",
  PUBLISH_EVENT: "event:publish",
};

/* ==========================================================================
   GALLERY PERMISSIONS
   ========================================================================== */

export const Gallery_Permissions = {
  CREATE_GALLERY: "gallery:create",
  VIEW_GALLERY: "gallery:view",
  UPDATE_GALLERY: "gallery:update",
  DELETE_GALLERY: "gallery:delete",
  UPLOAD_IMAGE: "gallery:image:upload",
  VIEW_IMAGE: "gallery:image:view",
  UPDATE_IMAGE: "gallery:image:update",
  DELETE_IMAGE: "gallery:image:delete",
};

/* ==========================================================================
   USER PERMISSIONS
   ========================================================================== */

export const User_Permissions = {
  CREATE_USERS: "user:create",
  VIEW_USERS: "user:view",
  UPDATE_USERS: "user:update",
  DELETE_USERS: "user:delete",
};

/* ==========================================================================
   ORGANIZATION MEMBER PERMISSIONS
   ========================================================================== */

export const Member_Permissions = {
  CREATE_MEMBER: "member:create",
  VIEW_MEMBER: "member:view",
  UPDATE_MEMBER: "member:update",
  DELETE_MEMBER: "member:delete",
};

/* ==========================================================================
   SYSTEM PERMISSIONS
   ========================================================================== */

export const Permission_Permissions = {
  CREATE_PERMISSION: "permission:create",
  VIEW_PERMISSION: "permission:view",
  UPDATE_PERMISSION: "permission:update",
  DELETE_PERMISSION: "permission:delete",
};

/* ==========================================================================
   EVENT ROLE PERMISSIONS
   (NOT Organization Permissions)
   ========================================================================== */

export const Judge_Permissions = {
  ADD_JUDGE: "judge:add",
  REMOVE_JUDGE: "judge:remove",
  UPDATE_JUDGE: "judge:update",
  VIEW_JUDGE: "judge:view",
};

export const Mentor_Permissions = {
  ADD_MENTOR: "mentor:add",
  REMOVE_MENTOR: "mentor:remove",
  UPDATE_MENTOR: "mentor:update",
  VIEW_MENTOR: "mentor:view",
};

export const Volunteer_Permissions = {
  ADD_VOLUNTEER: "volunteer:add",
  REMOVE_VOLUNTEER: "volunteer:remove",
  UPDATE_VOLUNTEER: "volunteer:update",
  VIEW_VOLUNTEER: "volunteer:view",
};
