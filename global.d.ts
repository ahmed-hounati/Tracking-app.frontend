export {};

declare global {
  interface GlobalThis {
    stopLocationUpdates?: () => void;
  }
}
