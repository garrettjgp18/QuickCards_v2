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
      <div>
        <div style={{ textAlign: 'center'}}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Account Settings</h1>
        </div>
        <div style={{ textAlign: 'center', fontSize: '25px'}}>
          <p>Name: {name}</p><br></br>
          <p>Email: {email}</p><br></br>
          <p>API Key: {api}</p><br></br>
        </div>
        <br></br><br></br>
        <div style={{ fontSize: '2rem', textAlign: 'center'}}>
          <button onClick={handleChangeEmail} style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', border: 'none' }}>Change Email</button>
          <button onClick={handleChangePassword} style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', border: 'none' }}>Change Password</button>
          <button onClick={handleChangeAPI} style={{ backgroundColor: 'violet', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', border: 'none' }}>Change API</button>
          <button onClick={handleResetFlashcards} style={{ backgroundColor: '#ffc107', color: '#000', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', border: 'none' }}>Reset Flashcards</button>
          <button onClick={handleDeleteAccount} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', border: 'none' }}>Delete Account</button>
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