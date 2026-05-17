import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';
import type { CalculatorInputs, CalculatorResults, ProjectMeta } from '../../types';

interface Props {
  meta: ProjectMeta;
  inputs: CalculatorInputs;
  results: CalculatorResults;
  onMetaChange: (patch: Partial<ProjectMeta>) => void;
  onInputsChange: (patch: Partial<CalculatorInputs>) => void;
}

export default function CalculatorTab({ meta, inputs, results, onMetaChange, onInputsChange }: Props) {
  return (
    <div className="flex h-full overflow-hidden">
      <aside className="w-80 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-5">
        <InputPanel meta={meta} inputs={inputs} onMetaChange={onMetaChange} onInputsChange={onInputsChange} />
      </aside>
      <div className="flex-1 overflow-y-auto p-6">
        <ResultsPanel results={results} />
      </div>
    </div>
  );
}
