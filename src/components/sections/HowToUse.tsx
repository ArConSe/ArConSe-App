import { SectionWrapper } from '../layout/SectionWrapper';

const STEPS = [
  {
    step: 1,
    title: 'Set up your project',
    desc: 'Fill in the Project Overview section with your project name, location, dates, and starting budget.',
  },
  {
    step: 2,
    title: 'Add upcoming expenses',
    desc: 'Log everything you plan to spend in the Upcoming section. Include descriptions, categories, and estimated costs.',
  },
  {
    step: 3,
    title: 'Move items to Ongoing',
    desc: 'When work begins, click "Move to Ongoing →" on an expense. Fill in actual spending as you go.',
  },
  {
    step: 4,
    title: 'Move items to Completed',
    desc: 'Once fully paid, click "Mark Completed ✓" to log the final cost and completion date.',
  },
  {
    step: 5,
    title: 'Update the Budget Summary',
    desc: 'All totals and summaries update automatically as you add and move expenses.',
  },
  {
    step: 6,
    title: 'Check Spending by Category',
    desc: 'See which areas (Materials, Labor, Permits, etc.) are using the most budget.',
  },
  {
    step: 7,
    title: 'Log progress updates',
    desc: 'Use the Progress Log to record periodic updates, spending, and notes over time.',
  },
];

const CATEGORIES = [
  { name: 'Materials', desc: 'Concrete, steel, lumber, tiles, paint, etc.' },
  { name: 'Labor', desc: 'Contractor fees, worker wages, skilled trades' },
  { name: 'Equipment', desc: 'Rentals, machinery, scaffolding, tools' },
  { name: 'Permits', desc: 'Building permits, inspections, certifications' },
  { name: 'Services', desc: 'Architecture, engineering, surveying, design' },
  { name: 'Miscellaneous', desc: 'Unexpected costs, contingency, minor purchases' },
];

export function HowToUse() {
  return (
    <SectionWrapper id="how-to-use" title="How to Use This Tracker" icon="⚙️">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Steps</h3>
          <ol className="space-y-3">
            {STEPS.map(({ step, title, desc }) => (
              <li key={step} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                  {step}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Category Reference</h3>
          <div className="space-y-2">
            {CATEGORIES.map(({ name, desc }) => (
              <div key={name} className="flex gap-2 p-2 rounded-lg bg-gray-50">
                <span className="text-sm font-medium text-gray-900 w-28 shrink-0">{name}</span>
                <span className="text-sm text-gray-500">{desc}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">💡 Tips</p>
            <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
              <li>Your data is saved automatically in your browser.</li>
              <li>You can move expenses back to a previous stage if needed.</li>
              <li>All totals and status badges update instantly.</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
