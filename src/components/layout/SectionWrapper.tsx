import type { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  icon?: string;
  children: ReactNode;
  accent?: 'yellow' | 'blue' | 'green' | 'default';
}

const accentMap = {
  yellow: 'border-l-yellow-400',
  blue: 'border-l-blue-500',
  green: 'border-l-green-500',
  default: 'border-l-gray-300',
};

export function SectionWrapper({ id, title, icon, children, accent = 'default' }: Props) {
  return (
    <section id={id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className={`border-l-4 rounded-t-2xl px-6 py-4 ${accentMap[accent]}`}>
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h2>
      </div>
      <div className="px-6 pb-6 pt-4">{children}</div>
    </section>
  );
}
