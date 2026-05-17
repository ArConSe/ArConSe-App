
export type Tab = 'calculator' | 'layout' | 'report';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'calculator', label: 'Calculator', icon: '🧮' },
  { id: 'layout', label: 'Layout Designer', icon: '📐' },
  { id: 'report', label: 'Report & Export', icon: '📄' },
];

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export default function TabNav({ active, onChange }: Props) {
  return (
    <nav className="flex border-b border-gray-200 bg-white">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            active === t.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <span>{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}
