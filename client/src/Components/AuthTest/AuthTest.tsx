import { useAuth } from '../../context/AuthContext';

const UserProfile: React.FC = () => {
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
    </div>
  );
};

export default UserProfile;
