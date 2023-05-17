import React from "react";

import { HiUsers } from "react-icons/hi";
import { MdArticle } from "react-icons/md";
import DashboardLink from "../DashboardLink/DashboardLink";

export default function DashboardNav({ open }) {
  return (
    <ul className="w-full flex flex-col gap-2">
      <DashboardLink
        open={open}
        Icon={HiUsers}
        value={"Users"}
        to={"/dashboard/users"}
      />
      <DashboardLink open={open} Icon={MdArticle} value={"Articles"} />
    </ul>
  );
}
