export interface APIVersion {
  min: number;
  max: number;
}

export const SUPPORTED_VERSIONS: Record<number, APIVersion> = {
  18: { min: 4, max: 4 },
};
