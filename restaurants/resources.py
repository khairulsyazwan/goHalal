from import_export import resources
from .models import Restaurant

class RestaurantResource(resources.ModelResource):

    # imported_names = set()

    # def after_import_row(self, row, row_result, row_number=None, **kwargs):
    #     self.imported_names.add(row.get("id"))

    # def skip_row(self, instance, original):
    #     return instance.id in self.imported_names

    class Meta:
        model = Restaurant
        exclude = ['average_rating', 'is_registered', 'max_pax_reservations', 'capacity']