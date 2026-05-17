import type { ProjectMeta } from '../../types';

interface Props {
  meta: ProjectMeta;
}

export default function ReportCover({ meta }: Props) {
  return (
    <div className="bg-blue-700 text-white rounded-lg p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">☀️</span>
        <div>
          <p className="text-blue-200 text-sm uppercase tracking-widest">Solar PV System Proposal</p>
          <h1 className="text-2xl font-bold">{meta.title || 'Untitled Project'}</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-blue-300 text-xs uppercase tracking-wide">Prepared For</p>
          <p className="font-semibold">{meta.clientName || '—'}</p>
        </div>
        <div>
          <p className="text-blue-300 text-xs uppercase tracking-wide">Site Address</p>
          <p className="font-semibold">{meta.address || '—'}</p>
        </div>
        <div>
          <p className="text-blue-300 text-xs uppercase tracking-wide">Prepared By</p>
          <p className="font-semibold">{meta.preparedBy || '—'}</p>
        </div>
        <div>
          <p className="text-blue-300 text-xs uppercase tracking-wide">Date</p>
          <p className="font-semibold">{meta.date || '—'}</p>
        </div>
      </div>
    </div>
  );
}
