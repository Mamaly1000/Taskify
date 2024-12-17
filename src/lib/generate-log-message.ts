import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog): string => {
  const { action, entityTitle, entityType, userName } = log;
  let message = "Unknown Log";
  switch (action) {
    case ACTION.CREATE:
      message = `created ${entityType.toLowerCase()} "${entityTitle}"`;
      break;
    case ACTION.DELETE:
      message = `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
      break;
    case ACTION.UPDATE:
      message = `updated ${entityType.toLowerCase()} "${entityTitle}"`;
      break;
    default:
      message = `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
      break;
  }
  return " " + message;
};
