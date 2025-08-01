from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

# Create router and register TodoViewSet
router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
