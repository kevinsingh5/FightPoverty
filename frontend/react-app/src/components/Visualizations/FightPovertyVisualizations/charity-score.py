import json
import requests
import csv

def main():

    with open('charity-score.tsv', 'w') as tsvfile:
        writer = csv.writer(tsvfile, delimiter='\t')

        url = "http://api.fightpoverty.online/api/charity"
        pages = make_call(url, "1")["total_pages"]
        
        writer.writerow(["charity", "cn_score", "fp_score"])
        for p in range(1, pages+1):
            page = {"page":p}
            data = make_call(url, page)
            objects = data["objects"]
            for obj in objects:
                name = obj["name"].strip().encode("utf-8")
                cn_score = obj["charity_navigator_score"]
                fp_score = obj["fight_poverty_score"]
                if not name or not cn_score or not fp_score:
                    continue
                print(name, cn_score, fp_score)
                writer.writerow([name, cn_score, fp_score])
        #writer.close()

    return



def make_call(url, page):
    headers = {'Content-Type': 'application/json'}
    try:
        response = requests.get(url, params=page, headers=headers)
        #assert response.status_code == 200
        if response.status_code != 200:
            print("WARNING: Response code from %s is not 200" % url)
    except Exception as e:
        print("ERROR: Couldn't establish connection to URL %s - %s" % (url, e))

    data = response.json()
    return data    


if __name__ == "__main__":
    main()