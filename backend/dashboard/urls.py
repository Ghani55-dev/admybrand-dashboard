from django.urls import path
from .views import MetricsAPIView, UserCampaignAPIView, EngagementAPIView, UserGrowthAPIView

urlpatterns = [
    path('metrics/', MetricsAPIView.as_view()),
    path('user-campaigns/', UserCampaignAPIView.as_view()),
    path('engagement/', EngagementAPIView.as_view(), name='engagement'),
     path('user-growth/', UserGrowthAPIView.as_view(), name='user-growth'),
]
