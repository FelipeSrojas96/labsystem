from .models import Sets, Card, Image, Market
from .serializers import (
    SetSerializer,
    CardSerializer,
    ImageSerializer,
    MarketSerializer,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class SetListView(APIView):
    def get(self, request):
        try:
            # Fetch all sets
            print("Request Headers:", dict(request.headers))
            sets = Sets.objects.all()

            # Serialize the data
            serializer = SetSerializer(sets, many=True)

            # Print serialized data for debugging

            # Return serialized data as response
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print("Error:", str(e))
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SetCardsView(APIView):
    """
    Devuelve todas las cartas asociadas a un set específico.
    """

    def get(self, request, id):
        # Filtra las cartas con set_id = id
        cards = Card.objects.filter(set_id=id)

        if not cards.exists():
            return Response(
                {"error": "No cards found for the given set ID"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Serializa los datos de las cartas
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CardDetailView(APIView):
    """
    Retrieve a card by its ID and include its market data.
    """

    def get(self, request, id):
        try:
            # Retrieve the card by its ID
            card = Card.objects.get(id=id)
        except Card.DoesNotExist:
            return Response(
                {"error": "Card not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Serialize the card data, including market information
        serializer = CardSerializer(card)
        return Response(serializer.data, status=status.HTTP_200_OK)
