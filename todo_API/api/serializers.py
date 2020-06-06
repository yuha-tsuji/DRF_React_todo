from rest_framework import serializers
from .models import TodoModel

class TodoSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = TodoModel
        fields = ('id', 'title', 'content', 'created_at', 'updated_at')