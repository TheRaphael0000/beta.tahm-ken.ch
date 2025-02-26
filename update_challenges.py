from pathlib import Path
from requests import get, auth
import json

game_path = "C:/Riot Games/League of Legends/"
certif_path = "./riotgames.pem"

def get_endpoint(game_folder):
    values = open(game_folder / Path("lockfile")).read().split(":")
    return (f"{values[4]}://127.0.0.1:{values[2]}", ("riot", values[3]))


def query(route):
    try:
        url, creds = get_endpoint(Path(game_path))
        basic = auth.HTTPBasicAuth(*creds)
        answer = get(url + route, auth=basic, verify=Path(certif_path))
        return json.loads(answer.content)
    except FileNotFoundError:
        print("Client not open")

challenges = query(f"/lol-challenges/v1/challenges/local-player")

to_keep = [
    "availableIds", "capstoneGroupId", "capstoneGroupName", "category", "childrenIds", "description", "descriptionShort", "gameModes", "hasLeaderboard", "id", "idListType", "isCapstone", "isReverseDirection", "name", "parentId", "parentName", "retireTimestamp", "source", "thresholds"
]

to_keep_id = [303400, 303500]

for challenge_k, challenge in list(challenges.items()):
    if challenge["id"] not in to_keep_id and challenge["parentId"] not in to_keep_id:
        del challenges[challenge_k]
        continue
    print(challenge["id"])
    for k, v in list(challenge.items()):
        if k not in to_keep:
            del challenge[k]

json.dump(challenges, open("src/data/challenges.json", "w"), indent=4)