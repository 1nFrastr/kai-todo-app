import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminAPI } from '../../../services/authAPI';
import type { AdminUser, PaginatedResponse } from '../../../types/auth';
import UserTable from '../../../components/UserTable';
import UserForm from '../../../components/UserForm';
import { useDebounce } from '../../../hooks';
import './AdminUsers.scss';

const AdminUsers: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [filterStaff, setFilterStaff] = useState<boolean | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  
  // Debounce search term with 500ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const [pagination, setPagination] = useState({
    count: 0,
    next: null as string | null,
    previous: null as string | null,
    page: 1,
    pageSize: 10,
  });

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('page_size', pagination.pageSize.toString());
      
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (filterActive !== null) params.append('is_active', filterActive.toString());
      if (filterStaff !== null) params.append('is_staff', filterStaff.toString());

      const response: PaginatedResponse<AdminUser> = await adminAPI.users.list(params.toString());
      setUsers(response.results || []); // Ensure users is always an array
      setPagination({
        ...pagination,
        count: response.count,
        next: response.next,
        previous: response.previous,
        page,
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || t('admin.users.loadError'));
      setUsers([]); // Reset users to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearchTerm, filterActive, filterStaff]);

  const handleUserDelete = async (userId: number) => {
    if (!confirm(t('admin.users.deleteConfirm'))) return;
    
    try {
      await adminAPI.users.delete(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err: any) {
      setError(err.response?.data?.message || t('admin.users.deleteError'));
    }
  };

  const handleStatusToggle = async (userId: number, field: 'is_active' | 'is_staff' | 'is_superuser', value: boolean) => {
    try {
      let updatedUser: AdminUser;
      
      switch (field) {
        case 'is_active':
          updatedUser = await adminAPI.users.setActive(userId, value);
          break;
        case 'is_staff':
          updatedUser = await adminAPI.users.setStaff(userId, value);
          break;
        case 'is_superuser':
          updatedUser = await adminAPI.users.setSuperuser(userId, value);
          break;
        default:
          return;
      }
      
      setUsers(users.map(user => user.id === userId ? updatedUser : user));
    } catch (err: any) {
      setError(err.response?.data?.message || t('admin.users.updateError'));
    }
  };

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowUserForm(false);
  };

  const handleUserSaved = (user: AdminUser) => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === user.id ? user : u));
    } else {
      setUsers([user, ...users]);
    }
    handleCloseForm();
  };

  return (
    <div className="admin-users">
      <div className="users-header">
        <h1>{t('admin.users.title')}</h1>
        <button
          onClick={() => setShowUserForm(true)}
          className="add-user-btn"
        >
          <span>➕</span>
          {t('admin.users.addUser')}
        </button>
      </div>

      <div className="users-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder={t('admin.users.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <select
            value={filterActive === null ? '' : filterActive.toString()}
            onChange={(e) => setFilterActive(e.target.value === '' ? null : e.target.value === 'true')}
            className="filter-select"
          >
            <option value="">{t('admin.users.allUsers')}</option>
            <option value="true">{t('admin.users.activeUsers')}</option>
            <option value="false">{t('admin.users.inactiveUsers')}</option>
          </select>

          <select
            value={filterStaff === null ? '' : filterStaff.toString()}
            onChange={(e) => setFilterStaff(e.target.value === '' ? null : e.target.value === 'true')}
            className="filter-select"
          >
            <option value="">{t('admin.users.allRoles')}</option>
            <option value="true">{t('admin.users.staffUsers')}</option>
            <option value="false">{t('admin.users.regularUsers')}</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>✖</button>
        </div>
      )}

      <UserTable
        users={users}
        loading={loading}
        onEdit={handleEditUser}
        onDelete={handleUserDelete}
        onStatusToggle={handleStatusToggle}
      />

      <div className="pagination">
        <div className="pagination-info">
          {t('admin.users.showing', {
            start: ((pagination.page - 1) * pagination.pageSize + 1),
            end: Math.min(pagination.page * pagination.pageSize, pagination.count),
            total: pagination.count
          })}
        </div>
        
        <div className="pagination-controls">
          <button
            onClick={() => fetchUsers(pagination.page - 1)}
            disabled={!pagination.previous}
            className="pagination-btn"
          >
            {t('common.previous')}
          </button>
          
          <span className="page-info">
            {t('admin.users.page')} {pagination.page}
          </span>
          
          <button
            onClick={() => fetchUsers(pagination.page + 1)}
            disabled={!pagination.next}
            className="pagination-btn"
          >
            {t('common.next')}
          </button>
        </div>
      </div>

      {showUserForm && (
        <UserForm
          user={selectedUser}
          onSave={handleUserSaved}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminUsers;
