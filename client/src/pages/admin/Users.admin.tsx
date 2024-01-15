import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../config/axios";
import { useAdmin } from "../../store/hooks/storeHooks";
import { useDispatch } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  AdminNotifications,
  addUsers,
} from "../../store/reducers/adminReducer";
import { useState } from "react";

export default function AdminUsers() {
  const toast = useToast();
  const { adminPassword } = useAdmin();
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const {
    data: allUsers,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await adminApi.get(
        `/allUsers?adminPassword=${adminPassword}`
      );
      dispatch(addUsers(data));
      return data;
    },
  });
  const columns: ColumnDef<AdminNotifications["user"]>[] = [
    {
      header: "Name",
      accessorFn: (row) => row.username,
    },
    {
      header: "Email",
      accessorFn: (row) => row.email,
    },
    {
      header: "Role",
      accessorFn: (row) => row.role,
    },
    {
      header: "Id",
      accessorFn: (row) => row._id,
    },
  ];
  const table = useReactTable({
    columns,
    data: allUsers,
    getCoreRowModel: getCoreRowModel(),
  });
  const deletedUsersList = (id: string) => {
    const isAlreadyExist = selectedUsers.includes(id);
    if (isAlreadyExist) {
      const users = selectedUsers.filter((user) => user !== id);
      setSelectedUsers(users);
      return;
    }
    setSelectedUsers((prev) => [...prev, id]);
  };
  const deleteUsers = async () => {
    if (selectedUsers.length < 1) return;
    const { data } = await adminApi.post(
      `/deleteUsers?adminPassword=${adminPassword}`,
      { users: selectedUsers }
    );
    toast({
      title: data.message,
      isClosable: true,
      status: "success",
    });
    refetch();
  };
  if (isLoading) return <h3>Loading...</h3>;
  if (isRefetching) return <h3>Loading...</h3>;
  return (
    <TableContainer padding={"0 5px"}>
      <Table size="">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              <Th color={"white"} fontSize={"17px"} textAlign={"center"}>
                Select
              </Th>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  color={"white"}
                  fontSize={"17px"}
                  textAlign={"center"}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <>
              {/* {row.original._id} */}
              <Tr
                key={row.id}
                className="hover:bg-slate-600 cursor-pointer transition"
                id={row.id}>
                <Td>
                  <input
                    type="checkbox"
                    onChange={() => {
                      deletedUsersList(row.original._id);
                    }}
                    className="ml-4 form-checkbox h-5 w-5 text-indigo-600 "
                    name={row.id}
                  />
                </Td>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    fontSize={"16px"}
                    key={cell.id}
                    className="py-2 px-4  text-center font-Fira">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
      <button
        className=" bg-pink-700 hover:bg-pink-600 transition duration-300  font-Lato font-[600] text-[22px] rounded-sm py-1 my-2 w-full"
        onClick={deleteUsers}>
        Delete Selected Users
      </button>
    </TableContainer>
  );
}
