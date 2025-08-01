import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { authAPI } from '../../../services/authAPI';
import type { DashboardStats } from '../../../types/auth';
import './AdminDashboard.scss';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await authAPI.getDashboardStats();
        setStats(response);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || t('admin.dashboardStats.loadError'));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [t]);

  if (loading) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard error">
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
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>{t('admin.dashboardStats.title')}</h1>
        <p>{t('admin.dashboardStats.subtitle')}</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats?.total_users || 0}</h3>
            <p>{t('admin.dashboardStats.totalUsers')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats?.active_users || 0}</h3>
            <p>{t('admin.dashboardStats.activeUsers')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛠️</div>
          <div className="stat-content">
            <h3>{stats?.staff_users || 0}</h3>
            <p>{t('admin.dashboardStats.staffUsers')}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👑</div>
          <div className="stat-content">
            <h3>{stats?.superusers || 0}</h3>
            <p>{t('admin.dashboardStats.superusers')}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>{t('admin.dashboardStats.recentActivity')}</h2>
          <div className="activity-stats">
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <div className="activity-info">
                <h4>{stats?.recent_registrations || 0}</h4>
                <p>{t('admin.dashboardStats.recentRegistrations')}</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🔐</span>
              <div className="activity-info">
                <h4>{stats?.recent_logins || 0}</h4>
                <p>{t('admin.dashboardStats.recentLogins')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>{t('admin.dashboardStats.quickActions')}</h2>
          <div className="quick-actions">
            <a href="/admin/users" className="action-button">
              <span className="action-icon">👥</span>
              <span>{t('admin.dashboardStats.manageUsers')}</span>
            </a>
            <a href="/admin/groups" className="action-button">
              <span className="action-icon">🔐</span>
              <span>{t('admin.dashboardStats.manageGroups')}</span>
            </a>
            <a href="/admin/profile" className="action-button">
              <span className="action-icon">👤</span>
              <span>{t('admin.dashboardStats.editProfile')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
