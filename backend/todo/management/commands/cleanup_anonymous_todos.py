from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from todo.models import Todo


class Command(BaseCommand):
    """
    Django management command to clean up anonymous todos older than 10 minutes
    Usage: python manage.py cleanup_anonymous_todos
    """
    help = 'Delete anonymous todos (user=null) older than 10 minutes'

    def add_arguments(self, parser):
        parser.add_argument(
            '--minutes',
            type=int,
            default=10,
            help='Number of minutes after which anonymous todos should be deleted (default: 10)',
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be deleted without actually deleting',
        )

    def handle(self, *args, **options):
        minutes = options['minutes']
        dry_run = options['dry_run']
        
        # Calculate the cutoff time
        cutoff_time = timezone.now() - timedelta(minutes=minutes)
        
        # Find anonymous todos older than the cutoff time
        old_anonymous_todos = Todo.objects.filter(
            user__isnull=True,
            created_at__lt=cutoff_time
        )
        
        count = old_anonymous_todos.count()
        
        if count == 0:
            self.stdout.write(
                self.style.SUCCESS(f'No anonymous todos older than {minutes} minutes found.')
            )
            return
        
        if dry_run:
            self.stdout.write(
                self.style.WARNING(f'DRY RUN: Would delete {count} anonymous todos older than {minutes} minutes:')
            )
            for todo in old_anonymous_todos:
                self.stdout.write(f'  - "{todo.title}" (created: {todo.created_at})')
        else:
            # Actually delete the todos
            deleted_count, _ = old_anonymous_todos.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Successfully deleted {deleted_count} anonymous todos older than {minutes} minutes.')
            )
