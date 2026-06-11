import AdminOfasHome from "@/components/admin/AdminOfasHome";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminOfasHome>{children}</AdminOfasHome>;
}