import { useLocalStorage } from './useLocalStorage';
import type { SolarProject, CanvasComponent } from '../types';
import { PH_PEAK_SUN_HOURS, PH_ELECTRICITY_RATE, DEFAULT_PANEL_WATTS, DEFAULT_SYSTEM_EFFICIENCY, DEFAULT_COST_PER_WATT } from '../constants/solar';

const INITIAL_PROJECT: SolarProject = {
  meta: {
    title: 'Solar PV System Proposal',
    clientName: '',
    address: '',
    preparedBy: '',
    date: new Date().toISOString().slice(0, 10),
  },
  inputs: {
    monthlyKwh: 300,
    peakSunHours: PH_PEAK_SUN_HOURS,
    panelWatts: DEFAULT_PANEL_WATTS,
    systemEfficiency: DEFAULT_SYSTEM_EFFICIENCY,
    costPerWatt: DEFAULT_COST_PER_WATT,
    gridType: 'grid-tie',
    batteryHours: 4,
    electricityRate: PH_ELECTRICITY_RATE,
  },
  canvasItems: [],
};

export function useSolarProject() {
  const [project, setProject] = useLocalStorage<SolarProject>('solar_tool_v1', INITIAL_PROJECT);

  function updateMeta(patch: Partial<SolarProject['meta']>) {
    setProject((p) => ({ ...p, meta: { ...p.meta, ...patch } }));
  }

  function updateInputs(patch: Partial<SolarProject['inputs']>) {
    setProject((p) => ({ ...p, inputs: { ...p.inputs, ...patch } }));
  }

  function setCanvasItems(items: CanvasComponent[]) {
    setProject((p) => ({ ...p, canvasItems: items }));
  }

  function resetProject() {
    setProject(INITIAL_PROJECT);
  }

  return { project, updateMeta, updateInputs, setCanvasItems, resetProject };
}
