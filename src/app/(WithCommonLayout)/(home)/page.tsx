export const dynamic = "force-dynamic";
import AllTask from "@/components/modules/Home/AllTask";
import { getCurrentUser } from "@/services/Auth";
import { getTaskByUser } from "@/services/Task";
import { Fragment } from "react";

export default async function HomePage() {
  const { data: taskData } = await getTaskByUser();

  const userData = await getCurrentUser();

  return (
    <Fragment>
      <AllTask tasks={taskData} user={userData} />
    </Fragment>
  );
}
