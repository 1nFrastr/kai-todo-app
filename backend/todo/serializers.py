from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    """
    Serializer for Todo model with all fields included
    """
    created_by = serializers.SerializerMethodField()
    
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'created_at', 'updated_at', 'created_by']
        read_only_fields = ['id', 'created_at', 'updated_at', 'created_by']
    
    def get_created_by(self, obj):
        """
        Get the username of the creator, return 'Anonymous' if no user
        """
        if obj.user:
            return obj.user.username
        return 'Anonymous'
