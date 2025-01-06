from .models import Sets, Card
from .serializers import SetSerializer, CardSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class SetListView(APIView):
    """
    Retorna todos los sets
    """

    def get(self, request):
        try:
            sets = Sets.objects.all()
            serializer = SetSerializer(sets, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SetCardsView(APIView):
    """
    Retorna todas las cartas de un set
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
    Trae la carta de id junto a su informacion de mercado e imagen.
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
