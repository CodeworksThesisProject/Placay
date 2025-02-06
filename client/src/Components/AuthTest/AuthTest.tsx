import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <div>You are not authenticated</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>      
      <p>Profile pic {user?.profileImage}</p>
      <img src="asserts/images/profilePictures/Prof4.jpg" alt="Profile" className="h-20 w-20 rounded-full"/>
    </div>
  );
};

export default UserProfile;
