import { getPartById } from '@/lib/api';
import PartDetailsClient from './PartDetailsClient';

export default async function PartDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const part = await getPartById(params.id);

  return <PartDetailsClient part={part} />;
}
