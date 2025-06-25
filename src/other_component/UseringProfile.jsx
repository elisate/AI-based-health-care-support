import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Camera, Save, Edit3 } from 'lucide-react';

export default function UseringProfile() {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const userId = userToken?.user?.user_id;
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/recommend/getuserById/${userId}`);
        const data = await res.json();
        if (data) {
          setValue('firstName', data.firstname || '');
          setValue('lastName', data.lastname || '');
          setValue('email', data.email || '');
          setValue('phone', data.phone || '');
          setValue('location', data.hospitalName || '');
          setAvatarPreview(data.profile_image || null);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, [userId, setValue]);

  const onSubmit = async (formData) => {
    setIsEditing(false);
    const form = new FormData();
    form.append('firstname', formData.firstName);
    form.append('lastname', formData.lastName);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('hospitalName', formData.location);
    if (avatarFile) form.append('profile_image', avatarFile);

    try {
      const res = await fetch(`http://127.0.0.1:8000/recommend/updateuserById/${userId}`, {
        method: 'PUT',
        body: form,
      });
      const result = await res.json();
      console.log('Profile updated:', result);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-500 text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-blue-100">Manage your account information and preferences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black mb-1">
                  {watch('firstName')} {watch('lastName')}
                </h2>
                <p className="text-gray-600">{watch('email')}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mb-6">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    {...register('firstName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{watch('firstName')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    {...register('lastName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{watch('lastName')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  <Mail className="w-4 h-4 inline mr-2" /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{watch('email')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  <Phone className="w-4 h-4 inline mr-2" /> Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{watch('phone')}</p>
                )}
              </div>

              <div className="md:col-span-2">
               
                {isEditing ? (
                  <input
                    type="text"
                    {...register('location')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700 py-2">{watch('location')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
