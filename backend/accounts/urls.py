from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Authentication URLs
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/profile/', views.ProfileView.as_view(), name='profile'),
    path('auth/change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    
    # Admin URLs
    path('admin/users/', views.AdminUserListView.as_view(), name='admin_user_list'),
    path('admin/users/<int:pk>/', views.AdminUserDetailView.as_view(), name='admin_user_detail'),
    path('admin/users/<int:user_id>/set-active/', views.set_user_active, name='set_user_active'),
    path('admin/users/<int:user_id>/set-staff/', views.set_user_staff, name='set_user_staff'),
    path('admin/users/<int:user_id>/set-superuser/', views.set_user_superuser, name='set_user_superuser'),
    
    # Groups management
    path('admin/groups/', views.GroupListView.as_view(), name='group_list'),
    path('admin/groups/<int:pk>/', views.GroupDetailView.as_view(), name='group_detail'),
    
    # Dashboard
    path('admin/dashboard/stats/', views.dashboard_stats, name='dashboard_stats'),
]
