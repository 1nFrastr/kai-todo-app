from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Todo
from .serializers import TodoSerializer, TodoAdminSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Todo CRUD operations with additional custom actions
    Supports anonymous users (user=null) and authenticated users
    """
    serializer_class = TodoSerializer
    permission_classes = [AllowAny]  # Allow anonymous access

    def get_queryset(self):
        """
        Filter todos based on authentication status:
        - Anonymous users see only anonymous todos (user=null)
        - Authenticated users see only their own todos
        """
        if self.request.user.is_authenticated:
            return Todo.objects.filter(user=self.request.user)
        else:
            return Todo.objects.filter(user__isnull=True)

    def perform_create(self, serializer):
        """
        Set user field based on authentication status:
        - Anonymous users: user=null
        - Authenticated users: user=current_user
        """
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save(user=None)

    @action(detail=True, methods=['patch'])
    def toggle_completed(self, request, pk=None):
        """Toggle the completion status of a todo item"""
        todo = self.get_object()
        todo.completed = not todo.completed
        todo.save()
        serializer = self.get_serializer(todo)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def completed(self, request):
        """Get all completed todo items for current user/anonymous"""
        completed_todos = self.get_queryset().filter(completed=True)
        serializer = self.get_serializer(completed_todos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Get all pending (not completed) todo items for current user/anonymous"""
        pending_todos = self.get_queryset().filter(completed=False)
        serializer = self.get_serializer(pending_todos, many=True)
        return Response(serializer.data)


class TodoAdminListView(generics.ListAPIView):
    """
    Admin view for Todo management - read-only access with search and filtering
    Supports different permission levels based on user role
    """
    serializer_class = TodoAdminSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return todos based on user permissions:
        - Superuser/Staff: can see all todos
        - Regular users: can only see their own todos
        """
        queryset = Todo.objects.all()
        
        # Regular users can only see their own todos
        if not (self.request.user.is_superuser or self.request.user.is_staff):
            queryset = queryset.filter(user=self.request.user)
        
        # Apply search filter
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(title__icontains=search)
        
        # Apply status filter
        status_filter = self.request.query_params.get('status', None)
        if status_filter == 'completed':
            queryset = queryset.filter(completed=True)
        elif status_filter == 'pending':
            queryset = queryset.filter(completed=False)
        
        # Apply ordering
        ordering = self.request.query_params.get('ordering', '-created_at')
        if ordering in ['created_at', '-created_at', 'updated_at', '-updated_at', 'title', '-title']:
            queryset = queryset.order_by(ordering)
        else:
            queryset = queryset.order_by('-created_at')
        
        return queryset
