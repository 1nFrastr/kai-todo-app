from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, TodoAdminListView

# Create router and register TodoViewSet
router = DefaultRouter()
router.register(r'todos', TodoViewSet, basename='todo')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/admin/todos/', TodoAdminListView.as_view(), name='todo-admin-list'),
]
