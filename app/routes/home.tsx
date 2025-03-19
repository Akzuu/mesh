import GatewayGrid from "~/GatewayGrid/gatewayGrid";
import type { Route } from "./+types/home";
import { AppBar, Toolbar, Typography } from "@mui/material";
import SideSheetInfo from "~/info/infoDrawer";
import { useCallback, useMemo, useState } from "react";
import GatewayResponse from "../../data/gateway_listing_response.json";
import type { Gateway } from "~/types";
import type { GridRowId } from "@mui/x-data-grid";

export function meta({}: Route.MetaArgs) {
  return [{ title: "GV-9001" }, { name: "description", content: "Mesh" }];
}

export default function Home() {
  // META: Here we would query API to get the statistics...
  const [gateways, setGateways] = useState<Gateway[]>(
    () => GatewayResponse.results as Gateway[]
  );

  const [selectedGatewayUUID, setSelectedGatewayUUID] = useState<
    string | undefined
  >(undefined);

  const selectedGateway = useMemo(
    () => gateways.find((gw) => gw.uuid === selectedGatewayUUID),
    [selectedGatewayUUID]
  );

  const handleUpdatingGateway = useCallback(
    (rowId: GridRowId, update: { description: string }) => {
      setGateways(
        gateways.map((gw) => {
          if (gw.uuid === rowId) {
            return {
              ...gw,
              description: update.description,
            };
          }

          return gw;
        })
      );
    },
    []
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gateway Visualizer 9001
          </Typography>
        </Toolbar>
      </AppBar>
      <GatewayGrid
        gateways={gateways}
        onGatewayCellClick={setSelectedGatewayUUID}
        onGatewayEditStop={handleUpdatingGateway}
      />
      {selectedGateway ? (
        <SideSheetInfo
          gateway={selectedGateway}
          isOpen={selectedGateway !== undefined}
          close={() => setSelectedGatewayUUID(undefined)}
        />
      ) : null}
    </>
  );
}
