import TaskDetails from "@/components/modules/Home/AllTask/TaskDetails";
import CommonBanner from "@/components/modules/Home/CommonBanner";
import { getCurrentUser } from "@/services/Auth";
import { Fragment } from "react";

export default async function TaskDetailsPage() {
  const userData = await getCurrentUser();
  return (
    <Fragment>
      <CommonBanner user={userData} />
      <TaskDetails />
    </Fragment>
  );
}
