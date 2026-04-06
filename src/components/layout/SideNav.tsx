import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { id: 'project-overview', label: 'Project Overview', icon: '📋' },
  { id: 'budget-summary', label: 'Budget Summary', icon: '💰' },
  { id: 'spending-by-category', label: 'By Category', icon: '📊' },
  { id: 'upcoming', label: 'Upcoming', icon: '🟡' },
  { id: 'ongoing', label: 'Ongoing', icon: '🔵' },
  { id: 'completed', label: 'Completed', icon: '✅' },
  { id: 'progress-log', label: 'Progress Log', icon: '📈' },
  { id: 'how-to-use', label: 'How to Use', icon: '⚙️' },
];

export function SideNav() {
  const [activeId, setActiveId] = useState<string>('project-overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <nav className="hidden lg:flex flex-col w-52 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pr-2">
      <ul className="space-y-0.5">
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                activeId === id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-base">{icon}</span>
              <span className="truncate">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
