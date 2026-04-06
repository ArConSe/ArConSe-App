interface Props {
  projectName: string;
}

export function AppHeader({ projectName }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-xl text-white text-lg">
            🏗️
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">Budget Your Build</h1>
            <p className="text-xs text-gray-500 leading-tight">Construction Cost Tracker</p>
          </div>
        </div>
        {projectName && (
          <div className="text-sm text-gray-600 font-medium truncate max-w-xs">
            {projectName}
          </div>
        )}
      </div>
    </header>
  );
}
