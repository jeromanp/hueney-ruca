import Layout from "../../../layouts/DashboardLayout";
import Header from "../../../components/dashboard/PageHeader";
import UserForm from "components/dashboard/form/UserForm";
import { supabase } from "utils/supabase";

export default function Edit({ user }) {
  return (
    <Layout>
      <Header
        title="Editar huésped"
        breadcrumbs={
          <>
            <li>/</li>
            <li className="text-primary">Editar huésped</li>
          </>
        }
      ></Header>

      <div className="flex justify-center">
        <div className="col-span-5 xl:col-span-3 w-1/2">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="p-7">
              <UserForm user={user} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;

  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: user[0],
    },
  };
}
