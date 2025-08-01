import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { adminAPI } from '../../../services/authAPI';
import type { Group } from '../../../types/auth';
import './AdminGroups.scss';

const AdminGroups: React.FC = () => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.groups.list();
        // Ensure the response is always an array
        if (Array.isArray(response)) {
          setGroups(response);
        } else {
          console.error('Expected array from groups API but got:', response);
          setGroups([]);
        }
        setError(null);
      } catch (err: any) {
        console.error('Error fetching groups:', err);
        setError(err.response?.data?.message || t('admin.groups.loadError'));
        setGroups([]); // Ensure groups is always an array
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [t]);

  if (loading) {
    return (
      <div className="admin-groups loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-groups error">
        <div className="error-message">
          <h3>{t('common.error')}</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-groups">
      <div className="groups-header">
        <h1>{t('admin.groups.title')}</h1>
        <button className="add-group-btn">
          <span>➕</span>
          {t('admin.groups.addGroup')}
        </button>
      </div>

      {!Array.isArray(groups) || groups.length === 0 ? (
        <div className="empty-state">
          <p>{t('admin.groups.noGroups')}</p>
        </div>
      ) : (
        <div className="groups-list">
          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-info">
                <h3>{group.name}</h3>
                <p>{group.permissions.length} permissions</p>
              </div>
              <div className="group-actions">
                <button className="edit-btn" title={t('common.edit')}>
                  ✏️
                </button>
                <button className="delete-btn" title={t('common.delete')}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGroups;
