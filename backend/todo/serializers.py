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


class TodoAdminSerializer(serializers.ModelSerializer):
    """
    Admin serializer for Todo model with extended fields for management view
    """
    creator_username = serializers.SerializerMethodField()
    creator_id = serializers.SerializerMethodField()
    
    class Meta:
        model = Todo
        fields = [
            'id', 'title', 'description', 'completed', 
            'creator_username', 'creator_id',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'creator_username', 'creator_id']
    
    def get_creator_username(self, obj):
        """Get the username of the creator"""
        if obj.user:
            return obj.user.username
        return 'Anonymous'
    
    def get_creator_id(self, obj):
        """Get the user ID of the creator"""
        if obj.user:
            return obj.user.id
        return None
