import { useAuth } from '../../context/AuthContext';

interface EditUserFormProps {
  profileActive: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
    profilePicture: File | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EditUserForm({
  profileActive, 
  handleSubmit, 
  formData, 
  handleChange, 
  handleFileChange
} : EditUserFormProps
) {

  const { user } = useAuth();
  return (
    <div className={`personal-info ${profileActive? '': 'hidden'}`}>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5 ">
        <input
          type="text"
          name="name"
          placeholder={`${user.name}`}
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder={`${user.email}`}
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  )
}