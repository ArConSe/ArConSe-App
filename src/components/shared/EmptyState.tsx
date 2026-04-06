interface Props {
  message: string;
  colSpan?: number;
}

export function EmptyState({ message, colSpan = 6 }: Props) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-gray-400 italic">
        {message}
      </td>
    </tr>
  );
}
