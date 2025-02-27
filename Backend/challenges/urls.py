from django.urls import path

def get_challenge_views():
    from .views import ChallengeListCreateView
    return ChallengeListCreateView

urlpatterns = [
    path('list/', get_challenge_views().as_view(), name='challenge-list'),
]
