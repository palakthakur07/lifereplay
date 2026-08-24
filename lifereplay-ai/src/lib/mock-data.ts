import { MOCK_SPACES } from "@/features/spaces/data/mock-spaces";
import type { ActivityItem } from "@/types";

const bySpace = (id: string) => MOCK_SPACES.find((s) => s.id === id)!;

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "act-1",
    spaceId: "adobe-hackathon",
    spaceName: bySpace("adobe-hackathon").name,
    spaceIcon: bySpace("adobe-hackathon").icon,
    action: "Added 3 files",
    detail: "pitch-deck-v4.pdf and 2 others",
    timestamp: "2026-08-01T18:05:00Z",
  },
  {
    id: "act-2",
    spaceId: "semester-5",
    spaceName: bySpace("semester-5").name,
    spaceIcon: bySpace("semester-5").icon,
    action: "Created a note",
    detail: "Midterm review — key formulas",
    timestamp: "2026-07-31T10:20:00Z",
  },
  {
    id: "act-3",
    spaceId: "machine-learning",
    spaceName: bySpace("machine-learning").name,
    spaceIcon: bySpace("machine-learning").icon,
    action: "Tagged 5 items",
    detail: "Marked as \"transformers\"",
    timestamp: "2026-07-30T21:15:00Z",
  },
  {
    id: "act-4",
    spaceId: "career",
    spaceName: bySpace("career").name,
    spaceIcon: bySpace("career").icon,
    action: "Updated a file",
    detail: "resume-2026-senior.pdf",
    timestamp: "2026-07-28T09:00:00Z",
  },
  {
    id: "act-5",
    spaceId: "personal",
    spaceName: bySpace("personal").name,
    spaceIcon: bySpace("personal").icon,
    action: "Added 12 photos",
    detail: "Weekend trip to the coast",
    timestamp: "2026-07-25T14:40:00Z",
  },
  {
    id: "act-6",
    spaceId: "travel",
    spaceName: bySpace("travel").name,
    spaceIcon: bySpace("travel").icon,
    action: "Created a Space",
    detail: "Started planning September trip",
    timestamp: "2026-07-20T08:30:00Z",
  },
];

// Fixed reference point rather than Date.now(), so relative-time strings are
// identical on the server-rendered HTML and the client hydration pass.
const DEMO_NOW = new Date("2026-08-02T12:00:00Z").getTime();

export function timeAgo(iso: string): string {
  const diffMs = DEMO_NOW - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}
