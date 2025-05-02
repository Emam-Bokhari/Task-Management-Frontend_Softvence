import TaskDetails from "@/components/modules/Home/AllTask/TaskDetails";
import CommonBanner from "@/components/modules/Home/CommonBanner";
import { getCurrentUser } from "@/services/Auth";
import { getTaskById } from "@/services/Task";
import { TTask } from "@/types";
import { Fragment } from "react";

export default async function TaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userData = await getCurrentUser();
  const { id } = await params;
  const { data: task }: { data: TTask } = await getTaskById(id);

  return (
    <Fragment>
      <CommonBanner user={userData} />
      <TaskDetails task={task} />
    </Fragment>
  );
}
