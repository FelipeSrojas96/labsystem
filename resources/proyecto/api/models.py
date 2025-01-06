from django.db import models


class Sets(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    series = models.CharField(max_length=255)
    printed_total = models.IntegerField()
    total = models.IntegerField()
    ptcgo_code = models.CharField(max_length=255)
    release_date = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)
    symbol_url = models.CharField(max_length=255)
    logo_url = models.CharField(max_length=255)

    class Meta:
        db_table = "set"  # Vincula este modelo con la tabla 'set' en la base de datos

    def __str__(self):
        return self.name
#comment

class Card(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    supertype = models.CharField(max_length=255)
    subtypes = models.CharField(max_length=255)
    types = models.CharField(max_length=255)
    set = models.ForeignKey(Sets, related_name="cards", on_delete=models.CASCADE)
    number = models.CharField(max_length=255)
    rarity = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "card"  # Vincula este modelo con la tabla 'set' en la base de datos


class Image(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    card = models.ForeignKey(Card, related_name="image", on_delete=models.CASCADE)
    url = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    class Meta:
        db_table = "image"  # Vincula este modelo con la tabla 'set' en la base de datos

    def __str__(self):
        return self.name


class Market(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    card = models.ForeignKey(Card, related_name="market", on_delete=models.CASCADE)
    url = models.CharField(max_length=255)
    updated_at = models.DateField()
    market = models.CharField(max_length=255)

    class Meta:
        db_table = "market"  # Vincula este modelo con la tabla 'set' en la base de datos

    def __str__(self):
        return self.name
