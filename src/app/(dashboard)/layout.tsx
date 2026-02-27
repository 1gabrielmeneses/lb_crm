import { Sidebar } from "@/components/Sidebar";
import { AuthProvider } from "@/components/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
