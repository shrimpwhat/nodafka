interface Version {
  min: number;
  max: number;
}

const SUPPORTED_VERSIONS: Record<number, Version> = {
  18: { min: 4, max: 4 },
};

export default SUPPORTED_VERSIONS;
