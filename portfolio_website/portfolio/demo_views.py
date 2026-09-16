"""Views for the four live project demos linked from the Projects section.

These are real, working Django pages — not mockups — so a potential client can
click "Live Demo" and actually use the thing.
"""

import json

from django.db.models import Q
from django.http import JsonResponse, Http404
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods

from .models import DemoPost, DemoComment, DemoTask


# ---------------------------------------------------------------------------
# Demo 1 — Django Blog
# ---------------------------------------------------------------------------

def blog_list(request):
    """Blog index with working search and category filtering."""
    posts = DemoPost.objects.all()

    query = request.GET.get('q', '').strip()
    if query:
        posts = posts.filter(Q(title__icontains=query) | Q(excerpt__icontains=query))

    category = request.GET.get('category', '').strip()
    if category and category.lower() != 'all':
        posts = posts.filter(category__iexact=category)

    categories = (
        DemoPost.objects.values_list('category', flat=True).distinct().order_by('category')
    )

    return render(request, 'portfolio/demo/blog_list.html', {
        'posts': posts,
        'categories': categories,
        'query': query,
        'active_category': category or 'all',
    })


def blog_detail(request, slug):
    """Single post page with a working comment form."""
    post = get_object_or_404(DemoPost, slug=slug)

    if request.method == 'POST':
        author = (request.POST.get('author') or '').strip()
        body = (request.POST.get('body') or '').strip()
        if author and body:
            DemoComment.objects.create(post=post, author=author, body=body)

    post.views += 1
    post.save(update_fields=['views'])

    return render(request, 'portfolio/demo/blog_detail.html', {
        'post': post,
        'comments': post.comments.all(),
    })


# ---------------------------------------------------------------------------
# Demo 2 — Todo REST API (browsable UI + real JSON endpoints)
# ---------------------------------------------------------------------------

@ensure_csrf_cookie
def todo_app(request):
    """Interactive front end that talks to the JSON API below."""
    return render(request, 'portfolio/demo/todo_app.html')


@require_http_methods(['GET', 'POST'])
def api_tasks(request):
    """GET  /demo/todo/api/tasks/   -> list tasks (supports ?completed=&priority=)
    POST /demo/todo/api/tasks/   -> create a task
    """
    if request.method == 'GET':
        tasks = DemoTask.objects.all()

        completed = request.GET.get('completed')
        if completed in ('true', 'false'):
            tasks = tasks.filter(completed=(completed == 'true'))

        priority = request.GET.get('priority')
        if priority in ('low', 'medium', 'high'):
            tasks = tasks.filter(priority=priority)

        return JsonResponse({
            'count': tasks.count(),
            'results': [t.to_dict() for t in tasks],
        })

    # POST
    try:
        data = json.loads(request.body.decode('utf-8'))
    except (ValueError, UnicodeDecodeError):
        return JsonResponse({'error': 'Invalid JSON body.'}, status=400)

    title = (data.get('title') or '').strip()
    if not title:
        return JsonResponse({'errors': {'title': 'This field is required.'}}, status=400)

    priority = data.get('priority', 'medium')
    if priority not in ('low', 'medium', 'high'):
        priority = 'medium'

    task = DemoTask.objects.create(title=title, priority=priority)
    return JsonResponse(task.to_dict(), status=201)


@require_http_methods(['GET', 'PATCH', 'DELETE'])
def api_task_detail(request, pk):
    """GET / PATCH / DELETE a single task."""
    try:
        task = DemoTask.objects.get(pk=pk)
    except DemoTask.DoesNotExist:
        return JsonResponse({'detail': 'Not found.'}, status=404)

    if request.method == 'GET':
        return JsonResponse(task.to_dict())

    if request.method == 'DELETE':
        task.delete()
        return JsonResponse({}, status=204)

    # PATCH
    try:
        data = json.loads(request.body.decode('utf-8'))
    except (ValueError, UnicodeDecodeError):
        return JsonResponse({'error': 'Invalid JSON body.'}, status=400)

    if 'completed' in data:
        task.completed = bool(data['completed'])
    if 'title' in data and str(data['title']).strip():
        task.title = str(data['title']).strip()
    if data.get('priority') in ('low', 'medium', 'high'):
        task.priority = data['priority']
    task.save()

    return JsonResponse(task.to_dict())


# ---------------------------------------------------------------------------
# Demo 3 — AI Study Website
# ---------------------------------------------------------------------------

@ensure_csrf_cookie
def study_app(request):
    """Study tool: paste notes, get a generated summary and quiz.

    The generation is rule-based (no external AI service required), so the demo
    works offline and instantly for anyone who opens it.
    """
    return render(request, 'portfolio/demo/study_app.html')


@require_http_methods(['POST'])
def api_study_generate(request):
    """Turn pasted notes into a summary + quiz questions."""
    try:
        data = json.loads(request.body.decode('utf-8'))
    except (ValueError, UnicodeDecodeError):
        return JsonResponse({'error': 'Invalid JSON body.'}, status=400)

    text = (data.get('text') or '').strip()
    if len(text) < 40:
        return JsonResponse(
            {'error': 'Please paste at least a few sentences of notes.'}, status=400
        )

    # Split into sentences
    raw = text.replace('!', '.').replace('?', '.').replace('\n', '. ')
    sentences = [s.strip() for s in raw.split('.') if len(s.strip()) > 25]

    if not sentences:
        return JsonResponse({'error': 'Could not find complete sentences.'}, status=400)

    # Score sentences by keyword frequency to pick the most "important" ones
    stop = {
        'the', 'and', 'that', 'this', 'with', 'from', 'for', 'are', 'was', 'were',
        'has', 'have', 'had', 'but', 'not', 'you', 'can', 'its', 'his', 'her',
        'they', 'them', 'their', 'which', 'when', 'what', 'will', 'into', 'than',
        'then', 'also', 'such', 'these', 'those', 'been', 'being', 'more', 'most',
    }
    freq = {}
    for word in text.lower().replace(',', ' ').replace('.', ' ').split():
        w = ''.join(ch for ch in word if ch.isalnum())
        if len(w) > 3 and w not in stop:
            freq[w] = freq.get(w, 0) + 1

    def score(sentence):
        words = sentence.lower().split()
        return sum(freq.get(''.join(c for c in w if c.isalnum()), 0) for w in words) / (len(words) or 1)

    ranked = sorted(sentences, key=score, reverse=True)
    summary = ranked[: min(3, len(ranked))]

    key_terms = sorted(freq.items(), key=lambda kv: kv[1], reverse=True)[:6]

    # Build fill-in-the-blank quiz questions from the top sentences
    quiz = []
    for sentence in ranked[: min(4, len(ranked))]:
        words = sentence.split()
        target = None
        for w in words:
            clean = ''.join(c for c in w if c.isalnum()).lower()
            if len(clean) > 4 and clean not in stop and freq.get(clean, 0) >= 1:
                target = w
                break
        if not target:
            continue
        answer = ''.join(c for c in target if c.isalnum())
        quiz.append({
            'question': sentence.replace(target, '______', 1).strip() + '.',
            'answer': answer,
        })

    return JsonResponse({
        'summary': summary,
        'key_terms': [{'term': t, 'count': c} for t, c in key_terms],
        'quiz': quiz,
        'stats': {
            'words': len(text.split()),
            'sentences': len(sentences),
            'reading_minutes': max(1, round(len(text.split()) / 200)),
        },
    })


# ---------------------------------------------------------------------------
# Demo 4 — Business Website
# ---------------------------------------------------------------------------

def business_site(request):
    """A complete small-business marketing site rendered by Django."""
    return render(request, 'portfolio/demo/business.html')
