from import_export import resources
from .models import Restaurant

class RestaurantResource(resources.ModelResource):
    class Meta:
        model = Restaurant
        exclude = ['average_rating', 'is_registered', 'max_pax_reservations', 'capacity']