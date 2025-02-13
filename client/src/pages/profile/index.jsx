import { useAppStore } from "../../store";

const Profile = () => {
  const { userInfo } = useAppStore();
  return (
    <>
      <div>Profile</div>
      <div>Email: {userInfo.id}</div>
    </>
  );
};

export default Profile;
