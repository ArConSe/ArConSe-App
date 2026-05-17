import type { CalculatorInputs, ProjectMeta } from '../../types';
import { PH_PEAK_SUN_HOURS } from '../../constants/solar';

interface Props {
  meta: ProjectMeta;
  inputs: CalculatorInputs;
  onMetaChange: (patch: Partial<ProjectMeta>) => void;
  onInputsChange: (patch: Partial<CalculatorInputs>) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400';

export default function InputPanel({ meta, inputs, onMetaChange, onInputsChange }: Props) {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Project Info</h2>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Project Title">
            <input className={inputCls} value={meta.title} onChange={(e) => onMetaChange({ title: e.target.value })} />
          </Field>
          <Field label="Client Name">
            <input className={inputCls} value={meta.clientName} onChange={(e) => onMetaChange({ clientName: e.target.value })} />
          </Field>
          <Field label="Site Address">
            <input className={inputCls} value={meta.address} onChange={(e) => onMetaChange({ address: e.target.value })} />
          </Field>
          <Field label="Prepared By">
            <input className={inputCls} value={meta.preparedBy} onChange={(e) => onMetaChange({ preparedBy: e.target.value })} />
          </Field>
          <Field label="Date">
            <input type="date" className={inputCls} value={meta.date} onChange={(e) => onMetaChange({ date: e.target.value })} />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Energy Consumption</h2>
        <div className="grid grid-cols-1 gap-3">
          <Field label="Monthly Consumption (kWh/month)">
            <input
              type="number" min={0} className={inputCls}
              value={inputs.monthlyKwh}
              onChange={(e) => onInputsChange({ monthlyKwh: +e.target.value })}
            />
          </Field>
          <Field label={`Peak Sun Hours (hrs/day) — PH avg ${PH_PEAK_SUN_HOURS}`}>
            <input
              type="number" min={1} max={8} step={0.1} className={inputCls}
              value={inputs.peakSunHours}
              onChange={(e) => onInputsChange({ peakSunHours: +e.target.value })}
            />
          </Field>
          <Field label="Electricity Rate (₱/kWh)">
            <input
              type="number" min={1} step={0.5} className={inputCls}
              value={inputs.electricityRate}
              onChange={(e) => onInputsChange({ electricityRate: +e.target.value })}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">System Configuration</h2>
        <div className="grid grid-cols-1 gap-3">
          <Field label="System Type">
            <select
              className={inputCls}
              value={inputs.gridType}
              onChange={(e) => onInputsChange({ gridType: e.target.value as CalculatorInputs['gridType'] })}
            >
              <option value="grid-tie">Grid-Tie</option>
              <option value="off-grid">Off-Grid</option>
            </select>
          </Field>
          <Field label="Panel Wattage (W)">
            <input
              type="number" min={100} step={10} className={inputCls}
              value={inputs.panelWatts}
              onChange={(e) => onInputsChange({ panelWatts: +e.target.value })}
            />
          </Field>
          <Field label="System Efficiency (0–1)">
            <input
              type="number" min={0.5} max={1} step={0.01} className={inputCls}
              value={inputs.systemEfficiency}
              onChange={(e) => onInputsChange({ systemEfficiency: +e.target.value })}
            />
          </Field>
          {inputs.gridType === 'off-grid' && (
            <Field label="Battery Backup Hours">
              <input
                type="number" min={1} max={48} className={inputCls}
                value={inputs.batteryHours}
                onChange={(e) => onInputsChange({ batteryHours: +e.target.value })}
              />
            </Field>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Cost Parameters</h2>
        <Field label="Installed Cost per Watt (₱/W)">
          <input
            type="number" min={1} step={1} className={inputCls}
            value={inputs.costPerWatt}
            onChange={(e) => onInputsChange({ costPerWatt: +e.target.value })}
          />
        </Field>
      </section>
    </div>
  );
}
