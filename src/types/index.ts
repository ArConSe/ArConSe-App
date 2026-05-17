export interface ProjectMeta {
  title: string;
  clientName: string;
  address: string;
  preparedBy: string;
  date: string;
}

export interface CalculatorInputs {
  monthlyKwh: number;
  peakSunHours: number;
  panelWatts: number;
  systemEfficiency: number;
  costPerWatt: number;
  gridType: 'grid-tie' | 'off-grid';
  batteryHours: number;
  electricityRate: number;
}

export interface CalculatorResults {
  systemKwp: number;
  panelCount: number;
  inverterKva: number;
  annualKwh: number;
  totalCost: number;
  monthlySavings: number;
  paybackYears: number;
  co2OffsetKg: number;
}

export type ComponentType =
  | 'solar-panel'
  | 'solar-array'
  | 'inverter'
  | 'battery'
  | 'charge-controller'
  | 'junction-box'
  | 'meter'
  | 'grid-connection'
  | 'combiner-box'
  | 'load';

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  x: number;
  y: number;
  label: string;
  count: number;
  notes: string;
}

export interface SolarProject {
  meta: ProjectMeta;
  inputs: CalculatorInputs;
  canvasItems: CanvasComponent[];
}
