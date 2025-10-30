import React, { useEffect, useState } from 'react';
import {
  User, Package, Heart, MapPin, CreditCard, Bell, Lock, LogOut, Edit2, Save, X
} from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const token = localStorage.getItem('token'); // 👈 token from login

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();
        setUserData(data);
        setEditedData(data);
        if (data.image) setImage(`http://127.0.0.1:8000/storage/${data.image}`);
      } catch (error) {
        console.error('❌ Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Save profile info
  const handleSave = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      const data = await res.json();
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error('❌ Error saving data:', error);
    }
  };

  // Handle profile image click
  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  // Handle image file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);

      // Upload to backend
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('http://127.0.0.1:8000/api/profile-image', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        console.log('✅ Image uploaded:', data);

        // Update userData image
        setUserData({ ...userData, image: data.image });
      } catch (err) {
        console.error('❌ Upload error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <div className="flex flex-col items-center">
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-20 h-20 rounded-full mb-4 cursor-pointer"
                onClick={handleClick}
              />
            ) : (
              <User
                size={80}
                className="text-gray-400 mb-4 cursor-pointer"
                onClick={handleClick}
              />
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <h2 className="text-lg font-semibold">{userData.username || 'Guest User'}</h2>
          <p className="text-gray-500 text-sm">{userData.email || 'No email provided'}</p>
        </div>

        <ul className="w-full space-y-3">
          <li>
            <button
              className={`w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 ${
                activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> My Profile
            </button>
          </li>
          <li><button className="w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-gray-100"><Package size={18} /> My Orders</button></li>
          <li><button className="w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-gray-100"><Heart size={18} /> Wishlist</button></li>
          <li><button className="w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-gray-100"><MapPin size={18} /> Addresses</button></li>
          <li><button className="w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-gray-100"><CreditCard size={18} /> Payment Methods</button></li>
          <li><button className="w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-gray-100"><Bell size={18} /> Notifications</button></li>
          <li><button className="w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-gray-100"><Lock size={18} /> Security</button></li>
          <li><button className="w-full text-left py-2 px-4 rounded-lg text-red-500 flex items-center gap-3 hover:bg-gray-100"><LogOut size={18} /> Logout</button></li>
        </ul>
      </div>

      {/* Main Profile */}
      <div className="flex-1 bg-white shadow-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {isEditing ? <X size={16} /> : <Edit2 size={16} />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Username</label>
            <input type="text" name="username" value={editedData.username || ''} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
          </div>
          <div>
            <label className="text-gray-600">Full Name</label>
            <input type="text" name="fullname" value={editedData.fullname || ''} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
          </div>
          <div>
            <label className="text-gray-600">Email</label>
            <input type="email" name="email" value={editedData.email || ''} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
          </div>
          <div>
            <label className="text-gray-600">Date of Birth</label>
            <input type="date" name="dob" value={editedData.dob || ''} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
          </div>
          <div>
            <label className="text-gray-600">Role</label>
            <input type="text" name="role" value={editedData.role || ''} onChange={handleChange} disabled={!isEditing} className="w-full border rounded-lg p-2 mt-1" />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-6">
            <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <Save size={16} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
