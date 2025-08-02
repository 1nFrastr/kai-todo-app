from django.utils.translation import gettext as _
from rest_framework import status
from rest_framework.response import Response

class LocalizedResponse:
    """
    Utility class for creating localized API responses
    """
    
    @staticmethod
    def error(message_key: str, status_code: int = status.HTTP_400_BAD_REQUEST, **kwargs):
        """
        Create an error response with localized message
        """
        return Response({
            'error': True,
            'message': _(message_key) if isinstance(message_key, str) else str(message_key),
            'status_code': status_code,
            **kwargs
        }, status=status_code)
    
    @staticmethod
    def success(data=None, message_key: str = None, status_code: int = status.HTTP_200_OK):
        """
        Create a success response with optional localized message
        """
        response_data = {
            'error': False,
            'status_code': status_code,
        }
        
        if data is not None:
            response_data['data'] = data
            
        if message_key:
            response_data['message'] = _(message_key)
            
        return Response(response_data, status=status_code)
