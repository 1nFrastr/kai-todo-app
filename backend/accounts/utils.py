from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext as _


def error_response(message, errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    """
    Create a standardized error response with localized message
    
    Args:
        message (str): Main error message (will be translated)
        errors (dict, optional): Field-specific errors
        status_code (int): HTTP status code
    
    Returns:
        Response: Standardized error response
    """
    response_data = {
        'success': False,
        'message': _(message) if isinstance(message, str) else str(message),
        'errors': errors or {}
    }
    return Response(response_data, status=status_code)


def success_response(data=None, message="Success", status_code=status.HTTP_200_OK):
    """
    Create a standardized success response with localized message
    
    Args:
        data (dict, optional): Response data
        message (str): Success message (will be translated)
        status_code (int): HTTP status code
    
    Returns:
        Response: Standardized success response
    """
    response_data = {
        'success': True,
        'message': _(message) if isinstance(message, str) else str(message),
        'data': data or {}
    }
    return Response(response_data, status=status_code)


def format_serializer_errors(serializer_errors):
    """
    Format DRF serializer errors into a readable format with localization
    
    Args:
        serializer_errors (dict): Serializer errors from is_valid()
    
    Returns:
        tuple: (main_message, errors_dict)
    """
    errors = {}
    messages = []
    
    for field, field_errors in serializer_errors.items():
        if field == 'non_field_errors':
            messages.extend([_(str(error)) for error in field_errors])
        else:
            errors[field] = field_errors
            # Create readable field names with localization
            field_name = {
                'username': _('Username'),
                'email': _('Email'),
                'password': _('Password'),
                'password_confirm': _('Password confirmation'),
                'first_name': _('First name'),
                'last_name': _('Last name'),
            }.get(field, _(field.replace('_', ' ').title()))
            
            field_messages = field_errors if isinstance(field_errors, list) else [field_errors]
            for msg in field_messages:
                messages.append(f"{field_name}: {_(str(msg))}")
    
    main_message = '; '.join(messages) if messages else _("Validation failed")
    return main_message, errors
