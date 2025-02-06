import { useAuth } from '../../context/AuthContext';
import { EditableUser } from '../../types/allTypes';

interface EditUserFormProps {
  profileActive: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: EditableUser & { repeatPassword?: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDefaultImageSelect: (img: string) => void;
}

export default function EditUserForm({
  profileActive,
  handleSubmit,
  formData,
  handleChange,
  handleFileChange,
  handleDefaultImageSelect,
}: EditUserFormProps) {

  const { user } = useAuth();

  const defaultProfileImages = [
    'Prof1.jpg',
    'Prof6.jpg',
    'Prof4.jpg',
    'Prof8.jpg'
  ];

  return (
    <div className={`personal-info ${profileActive == 'profile' ? '' : 'hidden'}`}>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-5 ">
        <input
          type="text"
          name="name"
          placeholder={user?.name || "Name"}
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:focus:ring-[#38436C]"
          required
        />
        <input
          type="email"
          name="email"
          placeholder={user?.email || "Email"}
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:focus:ring-[#38436C]"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:focus:ring-[#38436C]"
        />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat Password"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:focus:ring-[#38436C]"
        />
        <div className="flex gap-2 mt-2">
          {defaultProfileImages.map((img) => (
            <img
              key={img}
              src={`/asserts/images/profilePictures/${img}`}
              alt={img}
              className={`w-10 h-10 rounded-full cursor-pointer ${
                formData.profileImage === `/asserts/images/profilePictures/${img}`
                  ? 'border-2 border-blue-500'
                  : ''
              }`}
              onClick={() => handleDefaultImageSelect(img)}
            />
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-[#38436C] text-white py-3 rounded-lg hover:bg-[#2d345a] transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  )
}