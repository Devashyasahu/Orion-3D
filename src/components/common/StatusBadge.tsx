import type { ProductStatus } from '../../data/catalogue';
import { getStatusMeta } from '../../data/catalogue';

interface StatusBadgeProps {
  status: ProductStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = getStatusMeta(status);

  return (
    <span className={`status-badge status-badge--${status}`} aria-label={`Status: ${meta.label}`}>
      {meta.label}
    </span>
  );
}
