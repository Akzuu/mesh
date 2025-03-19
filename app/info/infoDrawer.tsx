import React, { useMemo, useState } from "react";
import {
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { formatUnixTimeToDateTime } from "~/utils";
import { type GatewayStatistic, type Gateway } from "~/types";
import GatewayStatisticResponse from "../../data/single_gateway_stats.json";

type InfoDrawerProps = {
  isOpen: boolean;
  close: () => void;
  gateway: Gateway;
};

const InfoDrawer: React.FC<InfoDrawerProps> = ({ isOpen, close, gateway }) => {
  // META: Here we would query API to get the statistics...
  const statistics = useMemo<GatewayStatistic>(
    () => GatewayStatisticResponse.summary as GatewayStatistic,
    []
  );

  return (
    <Drawer anchor="right" open={isOpen}>
      <div className="flex w-auto justify-end sticky top-0 right-0">
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </div>
      <div className="flex flex-col px-10 gap-y-4">
        <Paper className="p-2 flex flex-col">
          <h1 className="font-semibold self-center">
            Gateway full information
          </h1>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">Gateway ID</TableCell>
                <TableCell>{gateway.gatewayId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">UUID</TableCell>
                <TableCell>{gateway.uuid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Network UUID</TableCell>
                <TableCell>{gateway.networkUuid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Description</TableCell>
                <TableCell>{gateway.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Model</TableCell>
                <TableCell>{gateway.model}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Version</TableCell>
                <TableCell>{gateway.version}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Status</TableCell>
                <TableCell>{gateway.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Sink node UUIDs</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    {gateway.sinkNodes.map((sinkNode) => (
                      <span key={sinkNode}>{sinkNode}</span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Latest message received</TableCell>
                <TableCell>
                  {formatUnixTimeToDateTime(
                    gateway.gatewayStatistics.lastMessageRxTime
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Paper className="p-2 flex flex-col">
          <h1 className="font-semibold self-center">Statistics summary</h1>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">Start time</TableCell>
                <TableCell>
                  {formatUnixTimeToDateTime(statistics.startTime)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Start status</TableCell>
                <TableCell>{statistics.startTimeStatus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">End time</TableCell>
                <TableCell>
                  {formatUnixTimeToDateTime(statistics.endTime)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">End status</TableCell>
                <TableCell>{statistics.endTimeStatus}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <TableContainer className=" flex flex-col pt-5">
            <h3 className="self-center">
              Approximate time in status (minutes)
            </h3>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Active</TableCell>
                  <TableCell>Inactive</TableCell>
                  <TableCell>Unstable</TableCell>
                  <TableCell>Offline</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={1}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {Math.round(statistics.timeInStatuses.active / 60)}
                  </TableCell>
                  <TableCell>
                    {Math.round(statistics.timeInStatuses.inactive / 60)}
                  </TableCell>
                  <TableCell>
                    {Math.round(statistics.timeInStatuses.unstable / 60)}
                  </TableCell>
                  <TableCell>
                    {Math.round(statistics.timeInStatuses.offline / 60)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={1}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Drawer>
  );
};

export default InfoDrawer;
