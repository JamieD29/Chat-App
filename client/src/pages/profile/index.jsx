import { userAppStore } from "../../store";

const Profile = () => {
  const { userInfo } = userAppStore;
  return (
    <>
      <div>Profile</div>
      <div>Email: {userInfo.email}</div>
    </>
  );
};
//1:50:00
export default Profile;
