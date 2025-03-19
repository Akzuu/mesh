export type GatewayStatus = "ACTIVE" | "INACTIVE" | "UNSTABLE" | "OFFLINE";

export type Gateway = {
  uuid: string;
  modificationTime: number;
  description: string;
  gatewayId: string;
  networkUuid: string;
  sinkNodes: string[];
  model: string;
  version: string;
  status: GatewayStatus;
  gatewayStatistics: {
    lastMessageRxTime: number;
  };
};

export type GatewayStatistic = {
  startTime: number;
  endTime: number;
  startTimeStatus: GatewayStatus;
  endTimeStatus: GatewayStatus;
  timeInStatuses: {
    active: number;
    inactive: number;
    unstable: number;
    offline: number;
  };
  statusTransitionCounts: {
    activeToInactive: number;
    activeToUnstable: number;
    inactiveToOffline: number;
    inactiveToActive: number;
    unstableToActive: number;
    unstableToOffline: number;
    offlineToActive: number;
  };
};
