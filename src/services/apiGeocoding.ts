export async function getAddress({ latitude, longitude }: GetAddressArgs): Promise<GetAddressSuccessResponse> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`
  );
  if (!res.ok) throw await res.json();

  const data = await res.json();
  return data;
}

export interface GetAddressArgs {
  latitude: number;
  longitude: number;
}

export interface GetAddressSuccessResponse {
  city: string;
  countryName: string;
  locality: string;
  postcode: string;
}

export interface GetAddressBadResponse {
  status: number;
  description: string;
}
