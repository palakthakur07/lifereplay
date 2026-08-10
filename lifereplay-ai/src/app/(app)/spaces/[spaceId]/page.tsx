import { notFound } from "next/navigation";
import { SpaceDetailView } from "@/features/spaces/components/space-detail-view";
import { getSpaceById } from "@/features/spaces/data/mock-spaces";

export default async function SpaceDetailPage({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await params;

  if (!getSpaceById(spaceId)) {
    notFound();
  }

  return <SpaceDetailView spaceId={spaceId} />;
}
