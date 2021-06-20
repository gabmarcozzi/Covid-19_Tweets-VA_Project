from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="dio")
location = geolocator.reverse("4.894881 ,52.384427")
print(location.raw['address']['country'])