import AdminOfasHome from "@/components/admin/AdminOfasHome";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminOfasHome>{children}</AdminOfasHome>;
}