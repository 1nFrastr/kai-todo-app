import random
import string
from faker import Faker
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from accounts.models import UserProfile


class Command(BaseCommand):
    """Management command to create random users for testing"""
    
    help = 'Create random test users'
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=20,
            help='Number of users to create (default: 20)',
        )
        parser.add_argument(
            '--delete-existing',
            action='store_true',
            help='Delete existing test users before creating new ones',
        )
    
    def handle(self, *args, **options):
        count = options['count']
        delete_existing = options['delete_existing']
        
        fake = Faker(['en_US', 'zh_CN'])  # Support both English and Chinese names
        
        # Delete existing test users if requested
        if delete_existing:
            test_users = User.objects.filter(username__startswith='testuser_')
            deleted_count = test_users.count()
            test_users.delete()
            self.stdout.write(
                self.style.SUCCESS(f'Deleted {deleted_count} existing test users')
            )
        
        # Generate random users
        created_users = []
        existing_usernames = set(User.objects.values_list('username', flat=True))
        existing_emails = set(User.objects.values_list('email', flat=True))
        
        for i in range(count):
            # Generate unique username
            while True:
                username = f"testuser_{fake.user_name()}_{random.randint(1000, 9999)}"
                if username not in existing_usernames:
                    existing_usernames.add(username)
                    break
            
            # Generate unique email
            while True:
                email = fake.email()
                if email not in existing_emails:
                    existing_emails.add(email)
                    break
            
            # Generate user data
            first_name = fake.first_name()
            last_name = fake.last_name()
            
            # Create user
            user = User.objects.create_user(
                username=username,
                email=email,
                password='testpass123',  # Default password for all test users
                first_name=first_name,
                last_name=last_name,
                is_active=random.choice([True, True, True, False]),  # 75% active, 25% inactive
                is_staff=random.choice([True, False, False, False]),  # 25% staff
            )
            
            # Randomly assign superuser status to some staff users
            if user.is_staff and random.random() < 0.3:  # 30% of staff users become superusers
                user.is_superuser = True
                user.save()
            
            # Create user profile
            profile = UserProfile.objects.get_or_create(user=user)[0]
            profile.phone = fake.phone_number()
            profile.save()
            
            created_users.append(user)
            
            # Progress indicator
            if (i + 1) % 5 == 0:
                self.stdout.write(f'Created {i + 1}/{count} users...')
        
        # Summary
        self.stdout.write(
            self.style.SUCCESS(f'\nSuccessfully created {len(created_users)} test users!')
        )
        
        # Statistics
        active_count = sum(1 for user in created_users if user.is_active)
        staff_count = sum(1 for user in created_users if user.is_staff)
        superuser_count = sum(1 for user in created_users if user.is_superuser)
        
        self.stdout.write(f'  - Active users: {active_count}')
        self.stdout.write(f'  - Staff users: {staff_count}')
        self.stdout.write(f'  - Superusers: {superuser_count}')
        self.stdout.write(f'  - Default password for all test users: testpass123')
        
        # Sample usernames
        sample_usernames = [user.username for user in created_users[:5]]
        self.stdout.write(f'  - Sample usernames: {", ".join(sample_usernames)}')
