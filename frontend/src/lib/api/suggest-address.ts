const suggestAddress = async (zipCode: string) => {
  const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`, {
    method: 'GET',
  })
  return res.json()
}

export default suggestAddress
