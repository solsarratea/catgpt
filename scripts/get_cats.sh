#!/bin/bash

cat_api_key="" #your API key

get_cat_urls0() {
  local limit=$1
  local breed=$2

  curl --request GET \
       --url "https://api.thecatapi.com/v1/images/search?limit=${limit}&mime_types=jpg&breed_ids=${breed}" \
       --header "x-api-key: ${cat_api_key}" \
       --silent | jq -r '.[].url'
}

urls=()

download_images() {
    local output_directory=$1

    mkdir -p "${output_directory}"

    local index=7
    for cat_url in "${urls[@]}"; do

        local filename="${index}"
        wget "${cat_url}" --directory-prefix="${output_directory}" -O "${output_directory}/${filename}.jpg"

        ((index++))
    done
}

get_cat_urls() {
    local limit=$1

    local api_url="https://api.thecatapi.com/v1/images/search?limit=$1&mime_types=jpg"


    local response=$(curl --request GET \
                          --url "${api_url}" \
                          --header "x-api-key: ${cat_api_key}" \
          )
    echo "Response: ${response}"


   # Use jq to parse the JSON string and append URLs to the array
   while IFS= read -r url; do
       urls+=("$url")
   done < <(echo "$response" | jq -r '.[] | .url')

   # Print the array
   for u in "${urls[@]}"; do
       echo "Url Array: $u"
   done

}

# Set the number of cats and the output directory
num_cats=23
output_dir="../public/cat/"

get_cat_urls "${num_cats}"

download_images "${output_dir}"
