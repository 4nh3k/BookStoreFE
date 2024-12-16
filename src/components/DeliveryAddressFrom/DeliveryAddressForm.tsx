import { Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react";
import { AddressDTO } from "../../types/DTOs/Ordering/AddressDTO.type";
import { addressApi } from "@/apis/address.api";
import { useQuery } from "@tanstack/react-query";
import { getUIDFromLS } from "@/utils/auth";
import { useState } from "react";
import AdminDropdown from "../AdminComponents/Input/AdminDropdown";
import { getDefaultAddress } from "@/types/Models/Ordering/BuyerModel/Address.type";

interface DeliveryAddressFormProps {
  address: AddressDTO;
  setAddress: React.Dispatch<React.SetStateAction<AddressDTO>>;
}

export function DeliveryAddressForm({
  address,
  setAddress,
}: DeliveryAddressFormProps) {
  const userId = getUIDFromLS() ?? "";
  const { data: addressData, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["address", userId],
    queryFn: async () => {
      return await addressApi.getAddressByBuyer(userId, 0, 1000);
    },
  });

  const [addressId, setAddressId] = useState<number | undefined>(undefined);

  return (
    <form className="w-full px-4 py-4 space-y-8 bg-white rounded border border-gray-200 flex-col justify-start items-start inline-flex content-border">
      <span className="heading-5">Delivery Address</span>
      <div className="w-full">
        {addressData?.data.data.length > 0 ? (
          <div className="flex w-full flex-wrap items-stretch justify-between gap-8">
            <AdminDropdown
              title={"Save address"}
              items={[
                ...(addressData?.data?.data?.map((address) => ({
                  key: address.id ?? 0,
                  value: [
                    address.street,
                    address.ward ? `Ward ${address.ward}` : null,
                    address.district ? `District ${address.district}` : null,
                    address.city ? `${address.city} City` : null,
                  ]
                    .filter(Boolean) // Remove any null or undefined values
                    .join(", "),
                })) || []),
              ]}
              name={"saveAddress"}
              value={addressId}
              onChange={function (e: any, key: number | undefined): void {
                if (key !== 0) {
                  console.log(key);
                  setAddressId(key);
                  setAddress(addressData?.data.data.find((a) => a.id === key));

                } else {
                  setAddressId(0);
                  setAddress(getDefaultAddress());
                }
              }}
            />
          </div>
        ) : (
          <span className="text-sm">
            No address available, please try creating a new one in the user settings.
          </span>
        )}
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="First Name*" />
          </div>
          <TextInput placeholder="Enter your first name" type="text" />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="Last Name*" />
          </div>
          <TextInput placeholder="Enter your last name" type="text" />
        </div>
      </div>
      <div className="w-full">
        <div className="mb-2 block">
          <Label className="font-medium" value="Phone Number*" />
        </div>
        <TextInput placeholder="Enter your phone number" type="text" />
      </div>
      {/* <div className="w-full">
        <div className="mb-2 block">
          <Label className="font-medium" value="Your Address*" />
        </div>
        <Textarea
          id="street"
          placeholder="Write your address here..."
          name="street"
          onChange={handleTextAreaChange}
          value={address.street}
          required
          rows={4}
        />
      </div>
      <div className="flex w-full space-x-3">
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="Country*" />
          </div>
          <Select
            id="countries"
            name="country"
            onChange={handleSelectChange}
            required
          >
            <option>United States</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </Select>
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label className="font-medium" value="City*" />
          </div>
          <Select
            id="cities"
            name="city"
            onChange={handleSelectChange}
            required
          >
            <option>HCM</option>
            <option>QN</option>
            <option>HN</option>
          </Select>
        </div>
      </div> */}
      {/* <div className="flex items-center gap-2">
        <Checkbox id="accept" defaultChecked />
        <Label htmlFor="accept" className="flex">
          Save the data in the address list
        </Label>
      </div> */}
    </form>
  );
}
