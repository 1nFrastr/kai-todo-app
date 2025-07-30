from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Todo CRUD operations with additional custom actions
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

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
        """Get all completed todo items"""
        completed_todos = Todo.objects.filter(completed=True)
        serializer = self.get_serializer(completed_todos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def pending(self, request):
        """Get all pending (not completed) todo items"""
        pending_todos = Todo.objects.filter(completed=False)
        serializer = self.get_serializer(pending_todos, many=True)
        return Response(serializer.data)
