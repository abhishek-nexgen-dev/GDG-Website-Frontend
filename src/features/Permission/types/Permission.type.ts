export interface PermissionItem {
  _id?: string;
  name: string;
  action: "create" | "read" | "update" | "delete" | string;
  resource: string;
  description?: string;
  level?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MemberPermissionsResponse {
  success: boolean;
  message: string;
  data: PermissionItem[];
}

export interface AssignPermissionPayload {
  memberId: string;
  permission?: Array<{
    name: string;
    action?: string;
    resource?: string;
    description?: string;
    level?: number;
  }>;
  permissions?: any[];
}

export interface AssignPermissionResponse {
  success: boolean;
  message: string;
  data: any;
}
