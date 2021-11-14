export type Theme = 'Dark' | 'Bright';
export type OptionType = {
  value: string;
  label: string;
};
export type CompileResult = {
  cpuTime: string;
  memory: string;
  output: string;
  statusCode: number;
};
