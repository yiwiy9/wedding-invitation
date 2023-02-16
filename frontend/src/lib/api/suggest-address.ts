type AddressResponse = {
  results:
    | {
        address1: string
        address2: string
        address3: string
      }[]
    | null
}

const suggestAddress = async (zipCode: string) => {
  const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`, {
    method: 'GET',
  })
  const addressResponse = (await res.json()) as AddressResponse
  if (addressResponse.results) {
    const result = addressResponse.results[0]
    return result.address1 + result.address2 + result.address3
  }
  throw new Error()
}

export default suggestAddress
