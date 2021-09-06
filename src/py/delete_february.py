import pandas as pd

col_list = ["coordinates", "created_at", "place", "retweet_count", "text", "user_friends_count", "country_id"]
tweets = pd.read_csv("../../server/filesDir/covidTweetsDataset.csv", usecols = col_list)

coor_list = []
created_at_list = []
place_list = []
retw_list = []
text_list = []
user_friends_count_list = []
id_country_list = []

count = 0
for i in range(len(tweets)):
    if(tweets["created_at"][i][4:7] != "Feb"):
        coor_list.append(tweets["coordinates"][i])
        created_at_list.append(tweets["created_at"][i])
        place_list.append(tweets["place"][i])
        retw_list.append(tweets["retweet_count"][i])
        text_list.append(tweets["text"][i])
        user_friends_count_list.append(tweets["user_friends_count"][i])
        id_country_list.append(tweets["country_id"][i])

    else:
        count = count + 1

print(count)

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