import React from "react";
import useAuth from "../../Auth/v1/store/useAuth";

interface PermissionCheckerProps {
  permissionName: string;
  permissionAction?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionChecker = ({
  permissionName,
  permissionAction,
  children,
  fallback,
}: PermissionCheckerProps) => {
  const { perms } = useAuth();

  const hasPermission = perms.some((permission) => {
    const matchesName = permission.name === permissionName;
    const matchesAction = permissionAction ? permission.action === permissionAction : true;
    return matchesName && matchesAction;
  });

  // Permission granted → render the protected content
  if (hasPermission) {
    return <>{children}</>;
  }

  // Permission denied → render custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
};

export default PermissionChecker;
