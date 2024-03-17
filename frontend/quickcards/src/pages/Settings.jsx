import React, { useState } from 'react';

function SettingsPage() {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [api, setAPI] = useState('stfi48fivH3485747dy');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
    const handleChangeEmail = () => {
      const newEmail = prompt('Enter new email:');
      if (newEmail) {
        setEmail(newEmail);
      }
    };

    const handleChangeAPI = () => {
      const newAPI = prompt('Enter new API Key:');
      if (newAPI) {
        setAPI(newAPI);
      }
    };
  
    const handleChangePassword = () => {
      // Implement change password functionality
      alert('Change Password functionality coming soon!');
    };
  
    const handleResetFlashcards = () => {
      // Implement reset flashcards functionality
      alert('Reset Flashcards functionality coming soon!');
    };
  
    const handleDeleteAccount = () => {
      setShowDeleteConfirmation(true);
    };
  
    const confirmDeleteAccount = () => {
      // Implement account deletion logic here
      alert('Account deleted successfully!');
    };
  
    return (
      <div className="flex flex-row xsm:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
        <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-4 border border-gray-400 flex flex-col items-center justify-center" style={{ margin: '20px' }}>
          <div style={{ textAlign: 'center', fontSize: '25px'}}>
            <p style={{ margin: '10px' }}>Name: {name}</p><br></br>
            <p style={{ margin: '10px' }}>Email: {email}</p><br></br>
            <p style={{ margin: '10px' }}>API Key: {api}</p><br></br>
          </div>
        </div>
        <div className="md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-4 border border-gray-400 flex flex-col items-center justify-center" style={{ margin: '20px' }}>
          <div className="flex flex-col items-center" style = {{ margin: '20px' }}>
            <button onClick={handleChangeEmail} style={{ color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '10px', border: 'none' }} class="bg-teal-500">Change Email</button>
            <button onClick={handleChangePassword} style={{ color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '10px', border: 'none' }} class="bg-teal-500">Change Password</button>
            <button onClick={handleChangeAPI} style={{ color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '10px', border: 'none' }} class="bg-teal-500">Change API</button>
            <button onClick={handleDeleteAccount} style={{ color: '#fff', padding: '10px 20px', borderRadius: '5px', margin: '10px', border: 'none' }} class="bg-teal-500">Delete Account</button>
          </div>
        </div>
  
        {showDeleteConfirmation && (
          <div className="confirmation-popup" style={{ fontSize: '2rem', textAlign: 'center'}}>
            <p>Are you sure you want to delete your account?</p>
            <button onClick={confirmDeleteAccount} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', border: 'none'}}>Yes</button>
            <button onClick={() => setShowDeleteConfirmation(false)} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', border: 'none' }}>No</button>
          </div>
        )}
      </div>
    );
  }
  
  export default SettingsPage;