import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="bg-gray-900 ">
    <div className="flex min-h-screen flex-col items-center justify-between p-24  sx:flex sx:justify-center sx:items-center">
      <h1 className="text-green-400 border p-4">
        User successfully logged In, go to Home.
      </h1>
    </div>
    </div>
  );
};

export default Dashboard;