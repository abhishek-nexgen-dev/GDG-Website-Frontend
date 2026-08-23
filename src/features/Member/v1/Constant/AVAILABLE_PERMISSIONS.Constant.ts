import type { Permission } from "../../../Auth/v1/types/Auth.type";

const AVAILABLE_PERMISSIONS_CONSTANT: Permission[] = [
  // Members
  {
    name: "member:create",
    action: "create",
    resource: "Member",
    description: "Create organization members",
  },
  {
    name: "member:view",
    action: "read",
    resource: "Member",
    description: "View organization members",
  },
  {
    name: "member:update",
    action: "update",
    resource: "Member",
    description: "Update organization members",
  },
  {
    name: "member:delete",
    action: "delete",
    resource: "Member",
    description: "Delete organization members",
  },

  // Events
  {
    name: "event:create",
    action: "create",
    resource: "Event",
    description: "Create events",
  },
  {
    name: "event:view",
    action: "read",
    resource: "Event",
    description: "View events",
  },
  {
    name: "event:update",
    action: "update",
    resource: "Event",
    description: "Update events",
  },
  {
    name: "event:delete",
    action: "delete",
    resource: "Event",
    description: "Delete events",
  },
  {
    name: "event:archive",
    action: "update",
    resource: "Event",
    description: "Archive events",
  },
  {
    name: "event:publish",
    action: "update",
    resource: "Event",
    description: "Publish events",
  },

  // Galleries
  {
    name: "gallery:create",
    action: "create",
    resource: "Gallery",
    description: "Create galleries",
  },
  {
    name: "gallery:view",
    action: "read",
    resource: "Gallery",
    description: "View galleries",
  },
  {
    name: "gallery:update",
    action: "update",
    resource: "Gallery",
    description: "Update galleries",
  },
  {
    name: "gallery:delete",
    action: "delete",
    resource: "Gallery",
    description: "Delete galleries",
  },

  // Gallery Images
  {
    name: "gallery:image:upload",
    action: "create",
    resource: "GalleryImage",
    description: "Upload gallery images",
  },
  {
    name: "gallery:image:view",
    action: "read",
    resource: "GalleryImage",
    description: "View gallery images",
  },
  {
    name: "gallery:image:update",
    action: "update",
    resource: "GalleryImage",
    description: "Update gallery images",
  },
  {
    name: "gallery:image:delete",
    action: "delete",
    resource: "GalleryImage",
    description: "Delete gallery images",
  },

  // Users
  {
    name: "user:create",
    action: "create",
    resource: "User",
    description: "Create users",
  },
  {
    name: "user:view",
    action: "read",
    resource: "User",
    description: "View users",
  },
  {
    name: "user:update",
    action: "update",
    resource: "User",
    description: "Update users",
  },
  {
    name: "user:delete",
    action: "delete",
    resource: "User",
    description: "Delete users",
  },

  // Permissions
  {
    name: "permission:create",
    action: "create",
    resource: "Permission",
    description: "Create permissions",
  },
  {
    name: "permission:view",
    action: "read",
    resource: "Permission",
    description: "View permissions",
  },
  {
    name: "permission:update",
    action: "update",
    resource: "Permission",
    description: "Update permissions",
  },
  {
    name: "permission:delete",
    action: "delete",
    resource: "Permission",
    description: "Delete permissions",
  },
 
];

export default AVAILABLE_PERMISSIONS_CONSTANT