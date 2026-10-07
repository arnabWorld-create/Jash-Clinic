export default function Sec({ children, cls = "" }: { children: React.ReactNode; cls?: string }) {
  return <section className={`sec ${cls}`}><div className="w">{children}</div></section>;
}
