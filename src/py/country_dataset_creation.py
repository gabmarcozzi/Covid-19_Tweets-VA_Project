from shapely.geometry import Point, Polygon
import pandas as pd

def str_to_float_list(lst):
    lista = []
    for l in lst:
        lista.append(float(l))
    return lista

col_list = ["coordinates", "created_at", "place", "retweet_count", "text", "user_friends_count"]
tweets = pd.read_csv("../../server/filesDir/covidTweetsDataset.csv", usecols = col_list)
countries = pd.read_json("../../server/filesDir/world_countries.json")

coor_list = []
created_at_list = []
place_list = []
retw_list = []
text_list = []
user_friends_count_list = []
id_country_list = []

for i in range(len(tweets)):

    tmp = tweets["coordinates"][i]

    if(isinstance(tmp, str) and isinstance(tweets["place"][i], str)):
        
            
        point = Point(str_to_float_list(tmp.split(',')))

        for f in countries.features:
            for poly in f["geometry"]["coordinates"]:

                if(f['geometry']['type'] == 'Polygon'):
                    if point.within(Polygon(poly)):
                        coor_list.append(tweets["coordinates"][i])
                        created_at_list.append(tweets["created_at"][i])
                        place_list.append(tweets["place"][i])
                        retw_list.append(tweets["retweet_count"][i])
                        text_list.append(tweets["text"][i])
                        user_friends_count_list.append(tweets["user_friends_count"][i])
                        id_country_list.append(f['id'])
                elif(f['geometry']['type'] == 'MultiPolygon'):
                    for p in poly:
                        if point.within(Polygon(p)):
                            id_country_list.append(f['id'])
                            coor_list.append(tweets["coordinates"][i])
                            created_at_list.append(tweets["created_at"][i])
                            place_list.append(tweets["place"][i])
                            retw_list.append(tweets["retweet_count"][i])
                            text_list.append(tweets["text"][i])
                            user_friends_count_list.append(tweets["user_friends_count"][i])

print("coorList: " + str(len(coor_list)))
print("created_at_list: " + str(len(created_at_list)))
print("place_list: " + str(len(place_list)))
print("retw_list: " + str(len(retw_list)))
print("text_list: " + str(len(text_list)))
print("user_friends_count_list: " + str(len(user_friends_count_list)))
print("id_country_list: " + str(len(id_country_list)))

final = []

for i in range(len(coor_list)):
    row = []
    row.append(coor_list[i])
    row.append(created_at_list[i])
    row.append(place_list[i])
    row.append(retw_list[i])
    row.append(text_list[i])
    row.append(user_friends_count_list[i])
    row.append(id_country_list[i])
    final.append(row)

dataset = pd.DataFrame(final, columns=["coordinates", "created_at", "place", "retweet_count", "text", "user_friends_count","country_id"])
dataset.to_csv("dataset.csv")
                            

    # point = Point(tuple(str_to_int_list(t[0].split(","))))
    # for f in countries.features:
    #     for poly in f["geometry"]["coordinates"]:
    #         if point.within(Polygon(tuple(str_to_int_list(poly)))):
    #             print(t[2] + " IN " + f["id"])

