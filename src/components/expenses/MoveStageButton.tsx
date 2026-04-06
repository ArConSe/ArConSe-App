import type { ExpenseStage } from '../../types';

interface Props {
  direction: 'advance' | 'revert';
  stage: ExpenseStage;
  onClick: () => void;
}

function getLabel(direction: 'advance' | 'revert', stage: ExpenseStage): string {
  if (direction === 'advance') {
    if (stage === 'upcoming') return 'Move to Ongoing →';
    if (stage === 'ongoing') return 'Mark Completed ✓';
  } else {
    if (stage === 'ongoing') return '← Back to Upcoming';
    if (stage === 'completed') return '← Back to Ongoing';
  }
  return '';
}

export function MoveStageButton({ direction, stage, onClick }: Props) {
  const label = getLabel(direction, stage);
  const isAdvance = direction === 'advance';

  return (
    <button
      onClick={onClick}
      title={label}
      className={`text-xs px-2 py-1 rounded-md font-medium transition-colors whitespace-nowrap ${
        isAdvance
          ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}
