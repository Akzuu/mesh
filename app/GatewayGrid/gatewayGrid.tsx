import React, { useMemo } from "react";
import { DataGrid, type GridColDef, type GridRowId } from "@mui/x-data-grid";
import { formatUnixTimeToDateTime } from "~/utils";
import type { Gateway } from "~/types";

const columns: GridColDef[] = [
  {
    field: "gatewayId",
    headerName: "Gateway ID",
    flex: 1,
    cellClassName: "cursor-pointer",
  },
  {
    field: "model",
    headerName: "Model",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
  },
  {
    field: "version",
    headerName: "Version",
  },
  {
    field: "lastMessageRxTime",
    headerName: "Last message",
    flex: 1,
    sortingOrder: [],
  },
] as const;

type GatewayGridProps = {
  onGatewayCellClick: (gatewayUUID: string) => void;
  onGatewayEditStop: (
    rowId: GridRowId,
    update: { description: string }
  ) => void;
  gateways: Gateway[];
};

const GatewayGrid: React.FC<GatewayGridProps> = ({
  onGatewayCellClick,
  onGatewayEditStop,
  gateways,
}) => {
  const rows = useMemo(
    () =>
      gateways.map((gw) => ({
        id: gw.uuid,
        uuid: gw.uuid,
        modificationTime: formatUnixTimeToDateTime(gw.modificationTime),
        description: gw.description,
        gatewayId: gw.gatewayId,
        networkUuid: gw.networkUuid,
        sinkNodes: gw.sinkNodes,
        model: gw.model,
        version: gw.version,
        status: gw.status,
        lastMessageRxTime: formatUnixTimeToDateTime(
          gw.gatewayStatistics.lastMessageRxTime
        ),
      })),
    []
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowSelection={false}
      onCellClick={(cell) => {
        if (cell.field === "gatewayId") {
          onGatewayCellClick(cell.row.uuid);
        }
      }}
      initialState={{
        sorting: {
          sortModel: [{ field: "lastMessageRxTime", sort: "desc" }],
        },
      }}
      processRowUpdate={(newRow, _oldRow, { rowId }) => {
        onGatewayEditStop(rowId, { description: newRow.description });
        return newRow;
      }}
    />
  );
};

export default GatewayGrid;
