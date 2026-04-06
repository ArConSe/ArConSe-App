import type { ProjectInfo } from '../../types';
import { SectionWrapper } from '../layout/SectionWrapper';
import { CurrencyInput } from '../shared/CurrencyInput';

interface Props {
  projectInfo: ProjectInfo;
  onUpdate: (info: Partial<ProjectInfo>) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 transition-colors';

export function ProjectOverview({ projectInfo, onUpdate }: Props) {
  return (
    <SectionWrapper id="project-overview" title="Project Overview" icon="📋">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Project Name">
          <input
            type="text"
            value={projectInfo.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className={inputClass}
            placeholder="e.g. Residential Home Build"
          />
        </Field>

        <Field label="Location">
          <input
            type="text"
            value={projectInfo.location}
            onChange={(e) => onUpdate({ location: e.target.value })}
            className={inputClass}
            placeholder="e.g. Quezon City, Metro Manila"
          />
        </Field>

        <Field label="Start Date">
          <input
            type="date"
            value={projectInfo.startDate}
            onChange={(e) => onUpdate({ startDate: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="Target End Date">
          <input
            type="date"
            value={projectInfo.targetEndDate}
            onChange={(e) => onUpdate({ targetEndDate: e.target.value })}
            className={inputClass}
          />
        </Field>

        <Field label="Starting Budget (₱)">
          <CurrencyInput
            value={projectInfo.startingBudget}
            onChange={(val) => onUpdate({ startingBudget: val })}
            placeholder="0"
          />
        </Field>

        <Field label="Notes">
          <textarea
            value={projectInfo.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            rows={1}
            className={`${inputClass} resize-none`}
            placeholder="General notes about the project..."
          />
        </Field>
      </div>
    </SectionWrapper>
  );
}
