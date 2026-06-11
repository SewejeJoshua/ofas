import AdminOfasHome from "@/components/admin/AdminOfasHome";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminOfasHome>{children}</AdminOfasHome>;
}