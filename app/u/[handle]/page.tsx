type Params = { params: Promise<{ handle: string }> };

export default async function UserProfilePage({ params }: Params) {
  const { handle } = await params;
  return <div>User Profile: {handle}</div>;
}
