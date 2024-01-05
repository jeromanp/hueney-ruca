import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Header from "components/Header";
import Footer from "components/Footer";

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
          <div className="md:w-1/2 mx-auto px-4 sm:px-6 sm:py-20 py-8">
            {!session ? (
              <Auth
                redirectTo="/"
                providers={["github", "google"]}
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#68850E",
                        brandAccent: "#68850E",
                      },
                    },
                  },
                }}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: "Email",
                      password_label: "Password",
                    },
                  },
                }}
                theme="white"
                socialLayout="horizontal"
              />
            ) : (
              <Account session={session} />
            )}
          </div>
      <Footer />
    </div>
  );
};

export default Login;