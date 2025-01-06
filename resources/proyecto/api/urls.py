from django.urls import path
from .views import SetListView, SetCardsView, CardDetailView

urlpatterns = [
    path("sets/", SetListView.as_view(), name="sets-list"),
    path("sets/<str:id>/cards/", SetCardsView.as_view(), name="set-cards"),
    path("cards/<str:id>/", CardDetailView.as_view(), name="card-detail"),
]
