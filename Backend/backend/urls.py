from django.urls import path, include
from rest_framework.routers import DefaultRouter
from challenges.views import ChallengeViewSet  # ✅ Ensure this line is correct

router = DefaultRouter()
router.register(r'challenges', ChallengeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
