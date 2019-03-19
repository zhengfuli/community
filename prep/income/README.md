#FactFinder

Steps for downloading the income and demographic data to build our zip code analysis tool:

1. [American Community Survey (ACS) Download Center](https://factfinder.census.gov/faces/nav/jsf/pages/download_center.xhtml)  
(Screenshots in steps folder.)

2. Choose one of these (seems to be limit to one download set at a time.)  
S1901 - Income  
B02001 - Race  
S0101 - Age and Sex (optional)  

The income dataset (9K) contains over 100 types of income.  
A larger 19.5 MB dataset resides at aff_download/ACS_17_5YR_S1901_with_ann.csv  

3. If some of the zips in the dataset do not have a match, you can use the [ZCTA Crosswalk](https://www.census.gov/geo/reference/zctas.html) file to relate 41,160 zip codes to 33,120 census tabulation areas.  

Here's a quick way to search for income and demographics:  
https://zipwho.com  

Other Notes  

Census parameter names as json  
https://api.census.gov/data/2017/acs/acs5/variables.json  

API URL examples
https://api.census.gov/data/2017/acs/acsse/examples.html  

Detailed Training on Using API  
https://www.census.gov/content/dam/Census/programs-surveys/acs/guidance/training-presentations/20180614_API.pdf  