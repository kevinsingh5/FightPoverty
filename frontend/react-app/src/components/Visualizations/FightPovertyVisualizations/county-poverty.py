import json
import requests
import csv

def main():

    with open('county-poverty.tsv', 'w') as tsvfile:
        writer = csv.writer(tsvfile, delimiter='\t')

        url = "http://api.fightpoverty.online/api/county"
        pages = make_call(url, "1")["total_pages"]
        
        writer.writerow(["county", "percentage"])
        for p in range(1, pages+1):
            page = {"page":p}
            data = make_call(url, page)
            objects = data["objects"]
            for obj in objects:
                name = obj["name"].strip()
                percentage = obj["county_poverty_percentage"]
                if not name or not percentage:
                    continue
                percentage = percentage/100
                print(name, percentage)
                writer.writerow([name, "%.4f" % percentage])
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