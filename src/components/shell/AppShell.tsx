import { useState } from 'react';
import TabNav, { type Tab } from './TabNav';
import CalculatorTab from '../calculator/CalculatorTab';
import LayoutTab from '../layout/LayoutTab';
import ReportTab from '../report/ReportTab';
import { useSolarProject } from '../../hooks/useSolarProject';
import { calculate } from '../../utils/solarCalculations';

export default function AppShell() {
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const { project, updateMeta, updateInputs, setCanvasItems, resetProject } = useSolarProject();
  const results = calculate(project.inputs);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="text-2xl">☀️</span>
          <div>
            <h1 className="text-lg font-bold leading-tight">Solar Tool</h1>
            <p className="text-blue-200 text-xs">PV System Sizing, Layout & Report</p>
          </div>
        </div>
        <button
          onClick={() => { if (confirm('Reset all project data?')) resetProject(); }}
          className="text-blue-200 hover:text-white text-xs border border-blue-400 hover:border-white rounded px-3 py-1 transition-colors"
        >
          New Project
        </button>
      </header>

      <TabNav active={activeTab} onChange={setActiveTab} />

      <main className="flex-1 overflow-hidden">
        {activeTab === 'calculator' && (
          <CalculatorTab
            meta={project.meta}
            inputs={project.inputs}
            results={results}
            onMetaChange={updateMeta}
            onInputsChange={updateInputs}
          />
        )}
        {activeTab === 'layout' && (
          <LayoutTab
            items={project.canvasItems}
            setItems={setCanvasItems}
          />
        )}
        {activeTab === 'report' && (
          <ReportTab
            meta={project.meta}
            inputs={project.inputs}
            results={results}
            canvasItems={project.canvasItems}
          />
        )}
      </main>
    </div>
  );
}
