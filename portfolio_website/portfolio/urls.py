from django.urls import path

from . import views, demo_views

app_name = 'portfolio'

urlpatterns = [
    path('', views.index, name='index'),
    path('contact/submit/', views.contact_submit, name='contact_submit'),

    # --- Live project demos ---------------------------------------------
    # Demo 1: Django Blog
    path('demo/blog/', demo_views.blog_list, name='demo_blog'),
    path('demo/blog/<slug:slug>/', demo_views.blog_detail, name='demo_blog_detail'),

    # Demo 2: Todo REST API
    path('demo/todo/', demo_views.todo_app, name='demo_todo'),
    path('demo/todo/api/tasks/', demo_views.api_tasks, name='api_tasks'),
    path('demo/todo/api/tasks/<int:pk>/', demo_views.api_task_detail, name='api_task_detail'),

    # Demo 3: AI Study Website
    path('demo/study/', demo_views.study_app, name='demo_study'),
    path('demo/study/api/generate/', demo_views.api_study_generate, name='api_study_generate'),

    # Demo 4: Business Website
    path('demo/business/', demo_views.business_site, name='demo_business'),
]
