import { AddressDTO } from "@/types/DTOs/Ordering/AddressDTO.type";
import { Address } from "@/types/Models/Ordering/BuyerModel/Address.type";

export function addressToString(address: Address): string {
  return [
    address.street,
    address.ward,
    address.district,
    address.city,
    address.country,
    address.zipCode,
  ]
    .filter(Boolean) // Remove undefined or empty fields
    .join(", "); // Join with a comma and space
}
function mapAddressDTOToAddress(addressDTO: AddressDTO): Address {
  return {
    id: addressDTO.id,
    street: addressDTO.street,
    ward: addressDTO.ward,
    district: addressDTO.district,
    city: addressDTO.city,
    country: addressDTO.country,
    zipCode: addressDTO.zipCode,
  };
}

export function getAddressesFromList(addressList: any, id: number): Address {
  console.log("addressList", addressList);

  if (!addressList) {
    throw new Error("Address list is empty");
  }

  // Handle paginated format
  const data = Array.isArray(addressList) ? addressList : addressList.data;

  if (!Array.isArray(data)) {
    throw new Error("Invalid address list format");
  }

  const foundAddress = data.find((address) => address.id === id);

  if (!foundAddress) {
    throw new Error(`Address with id ${id} not found`);
  }

  return mapAddressDTOToAddress(foundAddress);
}
