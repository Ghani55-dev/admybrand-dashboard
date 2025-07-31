from rest_framework import serializers
from .models import Engagement
from .models import UserGrowth
class EngagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Engagement
        fields = ['date', 'clicks']

class UserGrowthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGrowth
        fields = ['date', 'count']