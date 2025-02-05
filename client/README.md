### Use the `useAuth` Hook in Your Component

To retrieve the current user's information, you can use the `useAuth` hook in your components. This hook provides access to the authentication status (`isAuthenticated`), as well as the user details, including `name`, `email`, and `role`.

The backend decodes the token stored in the cookies, retrieves the user's data based on the `id` from the token, and returns the full user details. This information can be directly used in your frontend components.

**Example (UserProfile.tsx):**

```tsx
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
    </div>
  );
};

export default UserProfile;
```

### How It Works:

1. **Authentication Check**: The `useAuth` hook sends a request to the `/api/check-auth` endpoint on the backend, which checks the token stored in the cookies. If the token is valid, the backend decodes it and retrieves the user's data based on the `id` included in the token.

2. **User Data Retrieval**: The backend sends back the user's data (e.g., `name`, `email`, `role`) associated with the `id` from the token.

3. **Frontend Usage**: The frontend receives the user's information and makes it available in the component. You can directly access `user?.name`, `user?.email`, and `user?.role` to display personalized details.

4. **Automatic Updates**: If the token is invalid or expired, the `isAuthenticated` flag will be set to `false`, and the user data will be cleared.

---

With this approach, you can easily display personalized information for the authenticated user in your React components, all while securely managing authentication via the token stored in the cookies.