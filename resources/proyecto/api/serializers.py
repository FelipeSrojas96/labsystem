from rest_framework import serializers
from .models import Sets, Card, Image, Market
from ast import literal_eval  # Safe parsing of stringified Python data


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sets
        fields = "__all__"


class MarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Market
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class CardSerializer(serializers.ModelSerializer):
    subtypes = serializers.JSONField()
    types = serializers.JSONField()
    market = MarketSerializer(many=True, read_only=True)  # Include related market data
    image = ImageSerializer(many=True, read_only=True)  # Include related market data

    class Meta:
        model = Card
        fields = "__all__"
