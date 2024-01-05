import Layout from "../../../layouts/DashboardLayout";
import Header from "../../../components/dashboard/PageHeader";
import UserForm from "components/dashboard/form/UserForm";

export default function Create() {
  return (
    <Layout>
      <Header
        title="Create huésped"
        breadcrumbs={
          <>
            <li>/</li>
            <li className="text-primary">Create huésped</li>
          </>
        }
      ></Header>

      <div className="flex justify-center">
        <div className="col-span-5 xl:col-span-3 w-1/2">
          <div className="rounded-sm border border-stroke bg-white shadow-default">
            <div className="p-7">
              <UserForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
