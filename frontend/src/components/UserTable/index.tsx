import React from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminUser } from '../../types/auth';
import './UserTable.scss';

interface UserTableProps {
  users: AdminUser[];
  loading: boolean;
  onEdit: (user: AdminUser) => void;
  onDelete: (userId: number) => void;
  onStatusToggle: (userId: number, field: 'is_active' | 'is_staff' | 'is_superuser', value: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onEdit,
  onDelete,
  onStatusToggle,
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="user-table-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  // Handle case where users is undefined or null
  if (!users || users.length === 0) {
    return (
      <div className="user-table-empty">
        <p>{t('admin.users.noUsers')}</p>
      </div>
    );
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>{t('admin.users.table.id')}</th>
            <th>{t('admin.users.table.username')}</th>
            <th>{t('admin.users.table.email')}</th>
            <th>{t('admin.users.table.name')}</th>
            <th>{t('admin.users.table.status')}</th>
            <th>{t('admin.users.table.role')}</th>
            <th>{t('admin.users.table.joined')}</th>
            <th>{t('admin.users.table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={!user.is_active ? 'inactive' : ''}>
              <td>{user.id}</td>
              <td className="username-cell">
                <span className="username">{user.username}</span>
                {user.is_superuser && <span className="badge superuser">👑</span>}
                {user.is_staff && !user.is_superuser && <span className="badge staff">🛠️</span>}
              </td>
              <td>{user.email}</td>
              <td>{`${user.first_name} ${user.last_name}`.trim() || '-'}</td>
              <td>
                <button
                  onClick={() => onStatusToggle(user.id, 'is_active', !user.is_active)}
                  className={`status-toggle ${user.is_active ? 'active' : 'inactive'}`}
                >
                  {user.is_active ? t('admin.users.active') : t('admin.users.inactive')}
                </button>
              </td>
              <td>
                <div className="role-controls">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={user.is_staff}
                      onChange={(e) => onStatusToggle(user.id, 'is_staff', e.target.checked)}
                    />
                    {t('admin.users.staff')}
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={user.is_superuser}
                      onChange={(e) => onStatusToggle(user.id, 'is_superuser', e.target.checked)}
                    />
                    {t('admin.users.superuser')}
                  </label>
                </div>
              </td>
              <td>{new Date(user.date_joined).toLocaleDateString()}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(user)}
                    className="edit-btn"
                    title={t('common.edit')}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="delete-btn"
                    title={t('common.delete')}
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
