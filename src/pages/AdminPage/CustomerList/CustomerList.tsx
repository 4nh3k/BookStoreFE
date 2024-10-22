import authApi from "@/apis/auth.api";
import CustomerImgPlaceholder from "@/assets/icon/user-profile-icon.jpg";
import CustomTable from "@/components/CustomTable";
import SearchInput from "@/components/SearchInput/SearchInput";
import { User } from "@/types/Models/Identity/User.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface Data {
  [key: string]: React.ReactNode | string; // Allow data to be React node or text
}

const CustomerList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [usersInPage, setUsersInPage] = useState<User[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const headers = [
    { label: "ID", prop: "id", className: "w-fit" },
    { label: "Profile Image", prop: "profileImageLink", isImage: true },
    { label: "Full Name", prop: "fullName" },
    { label: "Username", prop: "userName" },
    { label: "Email", prop: "email" },
    { label: "Address", prop: "address" },
    { label: "Country", prop: "country" },
    { label: "City", prop: "city" },
  ];

  const { data: usersData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["users", { pageIndex, pageSize }],
    queryFn: () => {
      return authApi.getCustomers(searchTerm, pageIndex - 1, pageSize);
    },
  });

  useEffect(() => {
    if (!isLoadingUser) {
      const data = usersData?.data.data;
      const totalItems = usersData?.data.totalItems ?? 0;
      setUsersInPage(data);
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
    }
  }, [usersData, usersInPage, isLoadingUser, searchTerm]);

  const onChangeSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const onSearchSubmit = () => {
    conditionalInvalidateSearchUserQuery();
    if (!isLoadingUser && usersData) {
      setUsersInPage(usersData.data.data);
      setPageIndex(1);
      const totalItems = usersData.data.totalItems;
      setTotalItems(totalItems);
      console.log("Page index: " + pageIndex);
      console.log("Total items: " + totalItems);
      console.log(usersData.data.data);
    }
  };

  const conditionalInvalidateSearchUserQuery = () => {
    queryClient.invalidateQueries(["users", { pageIndex, pageSize }]);
  };

  const handlePageChange = (e: number) => {
    const currentPage = e;
    console.log("Current page: " + currentPage);
    setPageIndex(currentPage);
  };

  const onRowClick = (item: Data, index: number) => {
    console.log("Row is clicked");
    navigate(`../admin-customer-account/${item.id}`);
  };

  return (
    <div className="bg-white flex flex-col mt-5 px-4 py-4 flex-start flex-shrink-0 min-h-screen gap-6 rounded-lg shadow-sm">
      <span className="text-[1.5rem] font-bold">User</span>
      <div className="flex justify-between items-center self-stretch">
        <SearchInput
          className={"min-w-64"}
          placeholder={"Search users"}
          enableDropdown={false}
          onChange={onChangeSearchTerm}
          onSubmit={onSearchSubmit}
          onDropdownChange={() => {}}
        ></SearchInput>
      </div>
      {isLoadingUser && (
        <div className="flex flex-col items-center">
          <ClipLoader
            color="#8FA8DE"
            className="items-center justify-center flex"
            size={100}
            aria-label="Loading Spinner"
          ></ClipLoader>
          <p className="text-primary">Loading...</p>
        </div>
      )}
      <div className="w-fit flex flex-col">
        {!isLoadingUser && usersData && (
          <Fade triggerOnce={true}>
            <CustomTable
              onRowClick={onRowClick}
              headers={headers}
              data={usersData.data.data.map((user) => {
                return {
                  id: user.id,
                  fullName: user.fullName || "-",
                  userName: user.userName,
                  email: user.email,
                  address: user.address || "-",
                  country: user.country || "-",
                  city: user.city || "-",
                  profileImageLink:
                    user.profileImageLink || CustomerImgPlaceholder,
                };
              })}
            />
          </Fade>
        )}
      </div>
      <Pagination
        className="m-auto"
        currentPage={pageIndex}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(totalItems / pageSize)}
      ></Pagination>
    </div>
  );
};

export default CustomerList;
