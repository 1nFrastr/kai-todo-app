from django.utils import translation
from django.utils.deprecation import MiddlewareMixin

class LanguageMiddleware(MiddlewareMixin):
    """
    Middleware to set language based on Accept-Language header from frontend
    """
    
    def process_request(self, request):
        # Get language from Accept-Language header sent by frontend
        language = request.META.get('HTTP_ACCEPT_LANGUAGE')
        
        if language:
            # Map frontend language codes to Django language codes
            language_map = {
                'en': 'en',
                'zh': 'zh-hans',
                'zh-CN': 'zh-hans',
                'zh-Hans': 'zh-hans',
            }
            
            # Extract primary language (ignore region/quality values)
            primary_lang = language.split(',')[0].split(';')[0].strip()
            django_lang = language_map.get(primary_lang, 'en')
            
            # Activate the language for this request
            translation.activate(django_lang)
            request.LANGUAGE_CODE = django_lang
        else:
            # Default to English
            translation.activate('en')
            request.LANGUAGE_CODE = 'en'
