export interface Address{
  id: number;
  street: string;
  ward?: string;
  district?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  buyerId?: string;
}

export function getDefaultAddress(): Address {
  return {
    id: 0,
    street: "Not available",
    ward: "",
    district: "",
    city: "",
    country: "",
    zipCode: "",
    buyerId: "",
  };
}
