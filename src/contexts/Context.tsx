import { createContext } from "react";

export const PositionContext = createContext<Position>({
  latitude: null,
  longitude: null,
});
