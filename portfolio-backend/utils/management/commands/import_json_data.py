"""
Management command to import all JSON data from portfolio frontend.
Run: python manage.py import_json_data
"""
from django.core.management.base import BaseCommand
import json
from pathlib import Path
from django.utils.text import slugify
from django.utils.dateparse import parse_date
from datetime import date

from apps.blog.models import BlogPost
from apps.projects.models import Project
from apps.testimonials.models import Testimonial
from apps.skills.models import Skill
from apps.messages.models import ContactMessage
from apps.profile.models import Profile
from apps.seo.models import SEOSettings


class Command(BaseCommand):
    help = 'Import all JSON data from portfolio frontend data/ directory'

    def add_arguments(self, parser):
        parser.add_argument(
            '--data-dir',
            type=str,
            default='../data',
            help='Path to data directory (relative to project root)'
        )

    def handle(self, *args, **options):
        data_dir = Path(options['data_dir'])
        if not data_dir.exists():
            self.stdout.write(self.style.ERROR(f'Data directory not found: {data_dir}'))
            self.stdout.write(self.style.WARNING('Trying absolute path: data/'))
            data_dir = Path('data')
            if not data_dir.exists():
                self.stdout.write(self.style.ERROR('Data directory not found. Please provide correct path.'))
                return

        self.import_blog(data_dir)
        self.import_projects(data_dir)
        self.import_testimonials(data_dir)
        self.import_skills(data_dir)
        self.import_messages(data_dir)
        self.import_profile(data_dir)
        self.import_seo(data_dir)

        self.stdout.write(self.style.SUCCESS('✅ All data imported successfully!'))

    def import_blog(self, data_dir):
        blog_file = data_dir / 'blog.json'
        if not blog_file.exists():
            self.stdout.write(self.style.WARNING('blog.json not found, skipping...'))
            return

        data = json.loads(blog_file.read_text())
        count = 0
        for item in data:
            post_id = item.get('id') or f"post-{slugify(item['title'])}"
            slug = item.get('slug') or slugify(item.get('title', ''))
            post_date = parse_date(item.get('date')) or date.today()
            
            post, created = BlogPost.objects.update_or_create(
                id=post_id,
                defaults={
                    'title': item.get('title', ''),
                    'slug': slug,
                    'category': item.get('category', 'General'),
                    'excerpt': item.get('excerpt', ''),
                    'content': item.get('content', ''),
                    'date': post_date,
                    'read_time': item.get('readTime', item.get('read_time', 5)),
                    'status': 'published' if item.get('status') == 'published' else 'draft',
                }
            )
            count += 1
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'  {action}: {post.title}')

        self.stdout.write(self.style.SUCCESS(f'✅ Imported {count} blog posts'))

    def import_projects(self, data_dir):
        projects_file = data_dir / 'projects.json'
        if not projects_file.exists():
            self.stdout.write(self.style.WARNING('projects.json not found, skipping...'))
            return

        data = json.loads(projects_file.read_text())
        count = 0
        for item in data:
            project_id = item.get('id') or f"project-{slugify(item.get('title', ''))}"
            
            project, created = Project.objects.update_or_create(
                id=project_id,
                defaults={
                    'title': item.get('title', ''),
                    'description': item.get('description', ''),
                    'image': item.get('image', ''),
                    'tags': item.get('tags', []),
                    'link': item.get('link', ''),
                    'github': item.get('github', ''),
                }
            )
            count += 1
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'  {action}: {project.title}')

        self.stdout.write(self.style.SUCCESS(f'✅ Imported {count} projects'))

    def import_testimonials(self, data_dir):
        testimonials_file = data_dir / 'testimonials.json'
        if not testimonials_file.exists():
            self.stdout.write(self.style.WARNING('testimonials.json not found, skipping...'))
            return

        data = json.loads(testimonials_file.read_text())
        count = 0
        for item in data:
            testimonial_id = item.get('id') or f"testimonial-{slugify(item.get('name', ''))}"
            
            testimonial, created = Testimonial.objects.update_or_create(
                id=testimonial_id,
                defaults={
                    'name': item.get('name', ''),
                    'role': item.get('role', ''),
                    'company': item.get('company', ''),
                    'photo': item.get('photo', ''),
                    'text': item.get('text', ''),
                    'rating': item.get('rating', 5),
                }
            )
            count += 1
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'  {action}: {testimonial.name}')

        self.stdout.write(self.style.SUCCESS(f'✅ Imported {count} testimonials'))

    def import_skills(self, data_dir):
        skills_file = data_dir / 'skills.json'
        if not skills_file.exists():
            self.stdout.write(self.style.WARNING('skills.json not found, skipping...'))
            return

        data = json.loads(skills_file.read_text())
        count = 0
        for item in data:
            skill_id = item.get('id') or f"skill-{slugify(item.get('name', ''))}"
            
            skill, created = Skill.objects.update_or_create(
                id=skill_id,
                defaults={
                    'name': item.get('name', ''),
                    'percent': item.get('percent', 0),
                    'category': item.get('category', ''),
                }
            )
            count += 1
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'  {action}: {skill.name} ({skill.percent}%)')

        self.stdout.write(self.style.SUCCESS(f'✅ Imported {count} skills'))

    def import_messages(self, data_dir):
        messages_file = data_dir / 'messages.json'
        if not messages_file.exists():
            self.stdout.write(self.style.WARNING('messages.json not found, skipping...'))
            return

        data = json.loads(messages_file.read_text())
        count = 0
        for item in data:
            message_id = item.get('id') or f"message-{item.get('created_at', '')}"
            
            message, created = ContactMessage.objects.update_or_create(
                id=message_id,
                defaults={
                    'name': item.get('name', ''),
                    'email': item.get('email', ''),
                    'subject': item.get('subject', ''),
                    'message': item.get('message', ''),
                    'read': item.get('read', False),
                }
            )
            count += 1
            action = 'Created' if created else 'Updated'
            self.stdout.write(f'  {action}: {message.name}')

        self.stdout.write(self.style.SUCCESS(f'✅ Imported {count} messages'))

    def import_profile(self, data_dir):
        profile_file = data_dir / 'profile.json'
        if not profile_file.exists():
            self.stdout.write(self.style.WARNING('profile.json not found, skipping...'))
            return

        data = json.loads(profile_file.read_text())
        profile, created = Profile.objects.update_or_create(
            id='profile',
            defaults={
                'name': data.get('name', ''),
                'title': data.get('title', ''),
                'about': data.get('about', ''),
                'phone': data.get('phone', ''),
                'email': data.get('email', ''),
                'avatar': data.get('avatar', ''),
                'location': data.get('location', ''),
                'social': data.get('social', {}),
            }
        )
        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'✅ {action} profile: {profile.name}'))

    def import_seo(self, data_dir):
        seo_file = data_dir / 'seo.json'
        if not seo_file.exists():
            self.stdout.write(self.style.WARNING('seo.json not found, skipping...'))
            return

        data = json.loads(seo_file.read_text())
        seo, created = SEOSettings.objects.update_or_create(
            id='seo',
            defaults={
                'title': data.get('title', ''),
                'description': data.get('description', ''),
                'og_image': data.get('og_image', ''),
                'twitter_image': data.get('twitter_image', ''),
                'ga_measurement_id': data.get('ga_measurement_id', ''),
                'meta_keywords': data.get('meta_keywords', []),
            }
        )
        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'✅ {action} SEO settings'))

