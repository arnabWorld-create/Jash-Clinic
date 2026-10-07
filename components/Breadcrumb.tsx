import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, graph } from "@/lib/schema";
export default function Breadcrumb({ items }: { items: [string, string | null][] }) {
  const ld = breadcrumb(items.map(([n, p]) => [n, p ?? items[items.length - 1][1] ?? "/"] as [string, string]));
  return (
    <div className="pad w">
      <JsonLd data={graph(ld)} />
      <nav className="bc" aria-label="Breadcrumb">{items.map(([n, p], i) => <span key={n}>{i > 0 && " / "}{p && i < items.length - 1 ? <Link href={p}>{n}</Link> : n}</span>)}</nav>
    </div>
  );
}
