from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from faker import Faker
import random
from .models import Engagement
from .serializers import EngagementSerializer
from .models import UserGrowth
from .serializers import UserGrowthSerializer
fake = Faker()

class MetricsAPIView(APIView):
    def get(self, request):
        return Response({
            "revenue": round(random.uniform(10000, 100000), 2),
            "users": random.randint(1000, 10000),
            "conversions": random.randint(100, 5000),
            "growth_percent": round(random.uniform(1, 15), 2),
            "chart_data": [
                {"date": fake.date_this_month().isoformat(), "value": random.randint(1000, 9000)}
                for _ in range(10)
            ],
            "pie_data": [
                {"label": "Organic", "value": random.randint(20, 50)},
                {"label": "Paid", "value": random.randint(10, 30)},
                {"label": "Referral", "value": random.randint(10, 25)},
            ]
        })

class UserCampaignAPIView(APIView):
    def get(self, request):
        data = []
        for _ in range(25):
            data.append({
                "name": fake.name(),
                "email": fake.email(),
                "campaign": fake.word().title(),
                "conversions": random.randint(10, 100),
            })
        return Response(data)



class EngagementAPIView(APIView):
    def get(self, request):
        data = Engagement.objects.order_by('date')
        serializer = EngagementSerializer(data, many=True)
        return Response(serializer.data)



class UserGrowthAPIView(APIView):
    def get(self, request):
        data = UserGrowth.objects.order_by('date')
        serializer = UserGrowthSerializer(data, many=True)
        return Response(serializer.data)
