import { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { getProfileInfoId } from "helpers/dbHelpers";
import Preload from "components/dashboard/PreloadSmall";

export default function Layout({ children }) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      if (session !== null) {
        const user = await getProfileInfoId(session?.user?.id);
        setUser(user);
        if (user.role > 1) {
          setLoading(false);
        } else {
          router.push("/");
        }
      } else {
        router.push("/");
      }
    }

    if (session) {
      getProfile();
    } else {
      setTimeout(() => {
        getProfile();
      }, 2000);
    }
  }, [session]);

  const closeSidebar = () => setSidebarStatus(false);
  const openSidebar = () => setSidebarStatus(true);

  return (
    <div className="relative z-1 bg-whiten font-satoshi text-base font-normal text-body">
      {/* <Preload />, loading, para que un usuario role 1 no llegue a ver nada */}
      {loading ? (
        <Preload loading={loading} />
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar
            sidebarStatus={sidebarStatus}
            actionCloseSidebar={closeSidebar}
          />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header actionOpenSidebar={openSidebar} user={user} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <div>{children}</div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
