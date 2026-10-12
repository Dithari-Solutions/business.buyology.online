type IconName = "quality" | "sourcing" | "terms" | "delivery" | "warranty";

const paths: Record<IconName, React.ReactNode> = {
  quality: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M1 20h22M9 10l2 2 4-4" /></>,
  sourcing: <><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" /><path d="m3 7 9 5 9-5M12 12v10M7.5 4.5l9 5" /></>,
  terms: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5M8 16h3m3 0 2 2 3-4" /></>,
  delivery: <><path d="M1 5h13v12H1V5ZM14 9h4l4 4v4h-8" /><circle cx="5" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
  warranty: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
};

export default function BenefitIcon({ name }: { name: IconName }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
