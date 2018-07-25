#!/bin/bash

for filename in ./images/counties/{..?,.[!.],}*; do
    echo "https://s3.us-east-2.amazonaws.com/fightpoverty.online/$filename" >> county_images.txt
done

for filename in ./images/cities/{..?,.[!.],}*; do
    echo "https://s3.us-east-2.amazonaws.com/fightpoverty.online/$filename" >> city_images.txt
done

for filename in ./images/charities/{..?,.[!.],}*; do
    echo "https://s3.us-east-2.amazonaws.com/fightpoverty.online/$filename" >> charity_images.txt
done

#    ./MyProgram.exe "$filename" "Logs/$(basename "$filename" .txt)_Log$i.txt"
