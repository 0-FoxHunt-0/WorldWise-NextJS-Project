import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { CitiesProvider } from "@/contexts/CitiesContext";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import styles from "../../../styles/AppLayout.module.css";
import { RedirectType } from "next/dist/client/components/redirect";

interface AppLayoutProps {
  children: ReactNode;
}

async function AppLayout({ children }: AppLayoutProps) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  
  const displayName = user?.username || user?.name;
  if (user) {
    return (
      <div className={styles.app}>
        <CitiesProvider session={session}>
          <Sidebar>{children}</Sidebar>
          <Map user={user} displayName={displayName} />
        </CitiesProvider>
        <Toaster />
      </div>
    );
  } else {
    redirect("/sign-in?access-denied=true", RedirectType.replace);
  }
}

export default AppLayout;
