import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "../../store/hooks/storeHooks";
import { adminApi } from "../../config/axios";
import { useDispatch } from "react-redux";
import {
  AdminNotifications as Notifications,
  addAdminNotifications,
} from "../../store/reducers/adminReducer";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useToast } from "@chakra-ui/react";

function AdminNotifications() {
  const { adminPassword, adminNotifications } = useAdmin();
  const dispatch = useDispatch();
  const toast = useToast();

  const { isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data: notifications } = await adminApi.get(
        `/notifications?adminPassword=${adminPassword}`
      );
      dispatch(addAdminNotifications(notifications));
      return null;
    },
  });
  const notifications: Notifications[] = useMemo(() => adminNotifications, []);
  const makeUserSeller = async (id: string) => {
    const { data } = await adminApi.post(
      `/make-user-seller?adminPassword=${adminPassword}`,
      {
        user: id,
      }
    );
    toast({
      title: data.message,
      isClosable: true,
      duration: 2000,
    });
    refetch();
  };
  const columns: ColumnDef<Notifications>[] = [
    {
      header: "Name",
      accessorFn: (row) => row.user.username,
    },
    {
      header: "Email",
      accessorFn: (row) => row.user.email,
    },
    {
      header: "Role",
      accessorFn: (row) => row.user.role,
    },
    {
      header: "Accepted",
      accessorKey: "isAccepted",
      accessorFn: (row) => (row.isAccepted ? true : false),
    },
    {
      header: "Readed",
      accessorKey: "isReaded",
    },
  ];
  const table = useReactTable({
    columns,
    data: notifications,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div className="w-full">
      <table className="min-w-full bg-slate-700 border border-gray-300 shadow-lg ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-indigo-400">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-4 border-b font-Chivo font-bold text-[22px]">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="gap-2 ">
          {table.getRowModel().rows.map((row) => (
            <>
              <tr
                key={row.id}
                className="hover:bg-slate-600 cursor-pointer transition">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-2 px-4  text-center font-Fira  text-[18px]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {!row.original.isAccepted && (
                <div className="flex  relative w- my-2 mx-4">
                  <button
                    className="bg-purple-500  rounded-md py-1 px-2 text-[18px] font-Fira"
                    onClick={() =>
                      makeUserSeller(String(row.original.user._id))
                    }>
                    Accept
                  </button>
                </div>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminNotifications;
