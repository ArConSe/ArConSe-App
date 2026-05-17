import type { ComponentType } from '../types';

export const PH_PEAK_SUN_HOURS = 5.0;
export const PH_GRID_EMISSION_FACTOR = 0.7082; // kg CO2 per kWh
export const PH_ELECTRICITY_RATE = 10; // ₱/kWh default

export const DEFAULT_PANEL_WATTS = 400;
export const DEFAULT_SYSTEM_EFFICIENCY = 0.80;
export const DEFAULT_COST_PER_WATT = 45; // ₱/W installed

export const GRID_SNAP = 20;

export const COMPONENT_DEFS: {
  type: ComponentType;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}[] = [
  { type: 'solar-panel', label: 'Solar Panel', icon: '☀️', color: 'text-yellow-700', bgColor: 'bg-yellow-50 border-yellow-300' },
  { type: 'solar-array', label: 'Solar Array', icon: '🔆', color: 'text-yellow-800', bgColor: 'bg-yellow-100 border-yellow-400' },
  { type: 'inverter', label: 'Inverter', icon: '⚡', color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-300' },
  { type: 'battery', label: 'Battery', icon: '🔋', color: 'text-green-700', bgColor: 'bg-green-50 border-green-300' },
  { type: 'charge-controller', label: 'Charge Controller', icon: '🔌', color: 'text-purple-700', bgColor: 'bg-purple-50 border-purple-300' },
  { type: 'junction-box', label: 'Junction Box', icon: '📦', color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-300' },
  { type: 'meter', label: 'Meter', icon: '📊', color: 'text-indigo-700', bgColor: 'bg-indigo-50 border-indigo-300' },
  { type: 'grid-connection', label: 'Grid Connection', icon: '🏭', color: 'text-red-700', bgColor: 'bg-red-50 border-red-300' },
  { type: 'combiner-box', label: 'Combiner Box', icon: '🔗', color: 'text-orange-700', bgColor: 'bg-orange-50 border-orange-300' },
  { type: 'load', label: 'Load / Appliance', icon: '🏠', color: 'text-teal-700', bgColor: 'bg-teal-50 border-teal-300' },
];

export function getComponentDef(type: ComponentType) {
  return COMPONENT_DEFS.find((c) => c.type === type) ?? COMPONENT_DEFS[0];
}
