import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import UserModal from './UserModal';

const UsersTable = () => {
  const { users, currentUser, deleteUser, isAdmin } = useAuth();
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create', // 'create' | 'edit'
    user: null
  });

  const handleCreateUser = () => {
    setModalState({
      isOpen: true,
      mode: 'create',
      user: null
    });
  };

  const handleEditUser = (user) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      user
    });
  };

  const handleDeleteUser = (user) => {
    if (user.id === currentUser.id) {
      alert('No puedes eliminarte a ti mismo');
      return;
    }

    const confirmMessage = `¿Estás seguro de que quieres eliminar a ${user.firstName} ${user.lastName}?`;
    if (window.confirm(confirmMessage)) {
      deleteUser(user.id);
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'create',
      user: null
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: 0, color: '#1f2937' }}>Usuarios Registrados</h2>
            <p className="user-count">
              Total: {users.length} usuario{users.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <button 
            onClick={handleCreateUser}
            className="btn btn-primary"
          >
            ➕ Agregar Usuario
          </button>
        </div>

        {users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <p>No hay usuarios registrados aún.</p>
            <p>¡Crea el primer usuario!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Email</th>
                  <th>Edad</th>
                  <th>Fecha de Registro</th>
                  <th>Última Actualización</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          backgroundColor: '#667eea',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}>
                          {user.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600' }}>
                            {user.firstName} {user.lastName}
                          </div>
                          {user.id === currentUser.id && (
                            <span style={{ 
                              fontSize: '12px', 
                              color: '#667eea', 
                              fontWeight: '500' 
                            }}>
                              (Tú)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span style={{ 
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {user.age || 'N/A'} años
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{formatDate(user.updatedAt)}</td>
                    <td>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: user.id === users[0]?.id ? '#dbeafe' : '#f3f4f6',
                        color: user.id === users[0]?.id ? '#1e40af' : '#6b7280'
                      }}>
                        {user.id === users[0]?.id ? 'Admin' : 'Usuario'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEditUser(user)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '14px' }}
                          title="Editar usuario"
                        >
                          ✏️
                        </button>
                        
                        {user.id !== currentUser.id && (
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="btn btn-danger"
                            style={{ padding: '6px 12px', fontSize: '14px' }}
                            title="Eliminar usuario"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <UserModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        user={modalState.user}
        mode={modalState.mode}
      />
    </div>
  );
};

export default UsersTable;
