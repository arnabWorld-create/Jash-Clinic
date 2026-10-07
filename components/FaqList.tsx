import JsonLd from "@/components/JsonLd";
import { faq, graph } from "@/lib/schema";
// FAQPage schema is generated from the SAME array that is rendered, so they can never differ.
export default function FaqList({ items, schema = true }: { items: [string, string][]; schema?: boolean }) {
  return (
    <div style={{ maxWidth: "48rem" }}>
      {schema && <JsonLd data={graph(faq(items.map(([q, a]) => ({ q, a }))))} />}
      {items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </div>
  );
}
