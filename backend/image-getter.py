import requests
import json
# from google_images_download import google_images_download
import google_images_download.google_images_download.google_images_download as google_images_download

def main():
    #county_url = 'http://api.fightpoverty.online/api/county'
    #charity_url = 'http://api.fightpoverty.online/api/charity'

    # filters = [dict(name='name', op='like', val='%y%')]
    # params = dict(q=json.dumps(dict(filters=filters)))

    # get_cities()
    # get_counties()
    get_charities()

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


def get_cities():
    city_url = 'http://api.fightpoverty.online/api/city'
    cities = []
    image_directory = "cities"

    pages = make_call(city_url, "1")["total_pages"]
    print(pages)

    for p in range(pages):
        page = {"page":p}
        data = make_call(city_url, page)
        objects = data["objects"]
        for obj in objects:
            city_state = obj["name"] # + " " + obj["state"]
            print(city_state)
            cities.append(city_state)

    get_images(cities, image_directory)


def get_counties():
    url = 'http://api.fightpoverty.online/api/county'
    counties = []
    image_directory = "counties"

    pages = make_call(url, "1")["total_pages"]
    print(pages)

    for p in range(pages):
        page = {"page":p}
        data = make_call(url, page)
        objects = data["objects"]
        for obj in objects:
            county_state = obj["name"] # + " " + obj["state"]
            print(county_state)
            counties.append(county_state)

    get_images(counties, image_directory)


def get_charities():
    url = 'http://api.fightpoverty.online/api/charity'
    charities = []
    image_directory = "charities"

    pages = make_call(url, "1")["total_pages"]
    print(pages)

    for p in range(1,3):
        page = {"page":p}
        data = make_call(url, page)
        objects = data["objects"]
        for obj in objects:
            charity = obj["name"]
            print(charity)
            charities.append(charity)

    get_images(charities, image_directory)



def get_images(keywords, image_directory):
    image_response = google_images_download.googleimagesdownload()
    arguments = {"keywords":", ".join(keywords), "limit":1, "format":"jpg", "aspect_ratio":"square", "image_directory":image_directory,
        "size":">640*480", "output_directory":"images", "no_numbering":True}
    #paths = image_response.download(arguments)      #passing arguments to download function
    image_response.download(arguments)

if __name__ == "__main__":
    main()
