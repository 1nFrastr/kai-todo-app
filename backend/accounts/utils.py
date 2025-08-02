from rest_framework.response import Response
from rest_framework import status


def error_response(message, errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    """
    Create a standardized error response
    
    Args:
        message (str): Main error message
        errors (dict, optional): Field-specific errors
        status_code (int): HTTP status code
    
    Returns:
        Response: Standardized error response
    """
    response_data = {
        'success': False,
        'message': message,
        'errors': errors or {}
    }
    return Response(response_data, status=status_code)


def success_response(data=None, message="Success", status_code=status.HTTP_200_OK):
    """
    Create a standardized success response
    
    Args:
        data (dict, optional): Response data
        message (str): Success message
        status_code (int): HTTP status code
    
    Returns:
        Response: Standardized success response
    """
    response_data = {
        'success': True,
        'message': message,
        'data': data or {}
    }
    return Response(response_data, status=status_code)


def format_serializer_errors(serializer_errors):
    """
    Format DRF serializer errors into a readable format
    
    Args:
        serializer_errors (dict): Serializer errors from is_valid()
    
    Returns:
        tuple: (main_message, errors_dict)
    """
    errors = {}
    messages = []
    
    for field, field_errors in serializer_errors.items():
        if field == 'non_field_errors':
            messages.extend(field_errors)
        else:
            errors[field] = field_errors
            # Create readable field names
            field_name = {
                'username': 'Username',
                'email': 'Email',
                'password': 'Password',
                'password_confirm': 'Password confirmation',
                'first_name': 'First name',
                'last_name': 'Last name',
            }.get(field, field.replace('_', ' ').title())
            
            field_messages = field_errors if isinstance(field_errors, list) else [field_errors]
            for msg in field_messages:
                messages.append(f"{field_name}: {msg}")
    
    main_message = '; '.join(messages) if messages else "Validation failed"
    return main_message, errors
